const {generateId} = require('../services/shortid');
const URLobj = require('../models/url');


async function handleGenerateNewShortURL(req, res) {
    const body = req.body;

    if(!body.url?.trim()) return res.redirect(`/?error=noURL`);
    const sID = generateId();
    
    await URLobj.create({
        shortID: sID,
        redirectURL: body.url,
        visitHistory: [],
    })
    res.redirect(`/?id=${sID}`);
}

async function handleRedirectingToOriginalURL(req, res) {
    const shortId = req.params.shortId;

    const entry = await URLobj.findOneAndUpdate(
        { 
            shortID: shortId
        },
        {
            $push:{
                visitHistory: {}
            }
        }
    );

    if(!entry) {
        return res.status(404).send("Short URL not found");
    }

    res.redirect(entry.redirectURL);
}

async function handleGetAnalytics(req, res) {
    const shortId = req.params.shortId;
    const result = await URLobj.findOne({
        shortID: shortId
    });

    if(!result) {
        return res.status(404).json({
            error: "Short URL not found"
        });
    }
    
    return res.json(
        {
            totalClicks: result.visitHistory.length,
            timeZone: 'UTC + 5.5',
            analytics: result.visitHistory.map(v=>({
                time: v.timestamp.toLocaleString('en-IN', {
                    timeZone: "asia/kolkata"
                })
            }))
        }
    )
}




module.exports = {
    handleGenerateNewShortURL,
    handleRedirectingToOriginalURL,
    handleGetAnalytics
}