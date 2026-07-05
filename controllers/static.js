function handleHomePage(req, res){
    const {id, error, status} = req.query;
    // console.log(req.user);
    res.status(error ? 400 : 200).render('home', {
        id, error, status,
        user: req.user,
    });
}

function handleSignupPage(req, res){
    res.render('signup', {
        user: req.user,
    });
}

function handleLoginPage(req, res){
    res.render('login', {
        user: req.user,
    });
}

module.exports = {
    handleHomePage,
    handleSignupPage,
    handleLoginPage,
}