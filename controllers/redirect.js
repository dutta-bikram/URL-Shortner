const URLobj = require('../models/url');

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

module.exports = {
    handleRedirectingToOriginalURL,
}
