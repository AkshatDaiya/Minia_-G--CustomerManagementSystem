function adminCheck(req,res,next){
    if(req.session.userName==='admin@gmail.com'){
        next()
    }else{
        res.render('adminCheckError.ejs')
    }
}

module.exports = adminCheck