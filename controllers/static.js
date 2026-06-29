function handleHomePage(req, res){
    const {id, error} = req.query;

    res.status(id ? 200 : 400).render('home', {id, error});
}

module.exports = {
    handleHomePage,
}