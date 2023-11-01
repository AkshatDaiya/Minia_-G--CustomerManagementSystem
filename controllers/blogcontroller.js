const Blogs = require('../model/blogs');

exports.myBlogsPage = async (req, res) => {
    try {
        const userName = req.session.userName
        const record = await Blogs.find({ userName: { $in: [req.session.userName] } })
        res.render('myBlogs.ejs', { userName, record })
    } catch (error) {
        console.log(error.message)
    }

}

exports.addBlogsForm = (req, res) => {
    try {
        res.render('addBlogs.ejs')
    } catch (error) {
        console.log(error.message)
    }
}

exports.CatchAddBlogsFormData = (req, res) => {
    try {
        const { title, userName, description } = req.body
        const record = new Blogs({
            title: title,
            description: description,
            userName: userName
        })
        record.save()
        res.redirect('/myBlogs')
    } catch (error) {
        console.log(error.message)
    }

}

exports.deleteBloge = async (req, res) => {
    try {
        const id = req.params.id
        await Blogs.findByIdAndDelete(id)
        res.redirect('/myBlogs')
    } catch (error) {
        console.log(error.message)
    }

}

exports.allBlogsPage = async (req, res) => {
    try {
        const userName = req.session.userName
        const record = await Blogs.find()
        res.render('allBlogs.ejs', { userName, record })
    } catch (error) {
        console.log(error.message)
    }

}