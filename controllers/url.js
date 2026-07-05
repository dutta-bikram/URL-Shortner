const {generateId} = require('../services/shortid');
const URLobj = require('../models/url');


async function handleGenerateNewShortURL(req, res) {
    const body = req.body;

    if(!body.url?.trim()) return res.redirect(`/?error=noURL`);
    const sID = generateId();
    
    console.log(req.user._id);

    await URLobj.create({
        shortID: sID,
        redirectURL: body.url,
        visitHistory: [],
        createdBy: req.user._id,
    })
    res.redirect(`/?id=${sID}`);
}

async function handleDeleteURLs(req,res){

    console.log(req.body);
    const {ids} = req.body;

    if(!ids || ids.length===0){
        return res.status(400).json({
            error:"No URLs selected."
        });
    }

    await URLobj.deleteMany({
        shortID:{
            $in: ids
        },
        createdBy:req.user._id
    });

    return res.json({
        success:true
    });
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

    // Check ownership
    if(result.createdBy.toString() !== req.user._id.toString()) {
        return res.status(403).json({
            error: "Unauthorized access"
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

async function handleProfilePage(req, res) {
    const urls = await URLobj.find({
        createdBy: req.user._id,
    });

    res.render("profile", {
        user: req.user,
        urls,
    });
}


module.exports = {
    handleGenerateNewShortURL,
    handleDeleteURLs,
    handleGetAnalytics,
    handleProfilePage
}