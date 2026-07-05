const userObj = require('../models/user');
const {v4: uuidv4} = require('uuid');
const sessionMap = require('../services/auth');

async function handleUserSignup(req, res) {
    const { name, email, password } = req.body;
    try{
        await userObj.create({
            name,
            email,
            password
        });
        res.redirect('/');
    }
    catch(e){
        return res.status(400).render("signup", {
            status: "Email already exists.",
        });
    }
}

async function handleUserLogin(req, res) {
    const { email, password } = req.body;

    const user =  await userObj.findOne({email, password});
    if(!user){
        return res.render('login', {status: "invalid credential", user});
    }

    const sessionID = uuidv4();
    sessionMap.setUser(sessionID, user);
    res.cookie('uid', sessionID);

    // console.log(user);

    res.redirect(`/?status=Login Success`);
}

function handleLogout(req, res) {
    const uid = req.cookies.uid;

    if(uid){
        sessionMap.removeUser(uid);
    }

    res.clearCookie("uid");
    res.redirect("/");
}

module.exports = {
    handleUserSignup,
    handleUserLogin,
    handleLogout
}