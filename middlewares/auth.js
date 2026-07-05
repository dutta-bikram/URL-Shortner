const { getUser } = require('../services/auth');

async function restrictToLoggedinUserOnly(req, res, next) {
    const userUid = req.cookies.uid;
    res.locals.baseURL = `${req.protocol}://${req.get('host')}/`;

    if(!userUid) return res.redirect('/login');

    const user = getUser(userUid);
    if(!user) return res.redirect('/login');

    req.user = user;
    next();
}

async function checkAuth(req, res, next) {
    const userUid = req.cookies.uid;
    res.locals.baseURL = `${req.protocol}://${req.get('host')}/`;
    if(userUid){
        const user = getUser(userUid);
        req.user = user;
    }
    else req.user = null;
    next();
}



module.exports = {
    restrictToLoggedinUserOnly,
    checkAuth,
}