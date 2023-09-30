const Blogs = require('../model/blogs');

exports.myBlogsPage = async (req, res) => {
    const userName = req.session.userName
    const record = await Blogs.find({ userName: { $in: [req.session.userName] } })
    res.render('myBlogs.ejs', { userName, record })
}

exports.addBlogsForm = (req, res) => {
    res.render('addBlogs.ejs')
}

exports.CatchAddBlogsFormData = (req, res) => {
    const { title, userName, description } = req.body
    const record = new Blogs({
        title: title,
        description: description,
        userName: userName
    })
    record.save()
    res.redirect('/myBlogs')
}

exports.deleteBloge = async (req, res) => {
    const id = req.params.id
    await Blogs.findByIdAndDelete(id)
    res.redirect('/myBlogs')
}

exports.allBlogsPage = async (req, res) => {
    const userName = req.session.userName
    const record = await Blogs.find()
    res.render('allBlogs.ejs', { userName, record })
}