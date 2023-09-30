function subscription(req, res, next) {
    if (req.session.role === 'Pvt') {
        next()
    }else{
        res.render('subscriptionMessage.ejs')
    }
}

module.exports = subscription