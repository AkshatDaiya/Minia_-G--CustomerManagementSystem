function validation(req, res, next) {
    if (req.session.inAuth) {
        next()
    } else {
        res.redirect('/')
    }
}

module.exports = validation