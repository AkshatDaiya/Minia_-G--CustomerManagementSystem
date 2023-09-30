const Router = require('express').Router()
const RegC = require('../controllers/regcontroller');
const BlogC = require('../controllers/blogcontroller');
const validation = require('../helpers/validation');
const upload = require('../helpers/multer');
const subscription = require('../helpers/subscription');


Router.get('/', RegC.loginPage)
Router.post('/', RegC.loginDataCatch)
Router.get('/sign-up', RegC.SignUpPage)
Router.post('/sign-up', RegC.SignUpDataMatching)
Router.get('/emailactivation/:id', RegC.emailactivation)
Router.get('/logOut', RegC.dashboardPageLogOut)
Router.get('/profiles', RegC.profiles)
Router.get('/profileUpdate',validation, RegC.profileUpdate)
Router.post('/profileUpdate',upload.single('Image'), RegC.profileDataCatch)
Router.get('/contactDetails/:id',subscription,RegC.contactDetails)
Router.get('/forgot',RegC.forgotPass)
Router.post('/forgot',RegC.catchForgotPassValue)
Router.get('/forgotChangePassForm/:id',RegC.forgotChangePassForm)
Router.post('/forgotChangePassForm/:id',RegC.catchForgotChangePassFormValue)

Router.get('/myBlogs',BlogC.myBlogsPage)
Router.get('/addBlogs',BlogC.addBlogsForm)
Router.post('/addBlogs',BlogC.CatchAddBlogsFormData)
Router.get('/deleteBlog/:id',BlogC.deleteBloge)
Router.get('/allBlogs',BlogC.allBlogsPage)

module.exports = Router
