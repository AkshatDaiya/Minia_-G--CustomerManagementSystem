const Reg = require('../model/reg');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');

exports.loginPage = (req, res) => {
    try {
        res.render('login.ejs', { message: '' })
    } catch (error) {
        console.log(error.message);
    }

}

exports.loginDataCatch = async (req, res) => {
    try {
        const { form_email, form_password } = req.body
        const record = await Reg.findOne({ email: form_email })
        if (record !== null) {
            const passCheck = await bcrypt.compare(form_password, record.pass)
            if (passCheck) {
                req.session.userName = form_email
                req.session.userId = record.id
                req.session.role = record.role
                req.session.inAuth = true
                if (record.status === 'active') {
                    if (record.email === 'cmsproject87@gmail.com') {
                        res.redirect('admin/dashboard')
                    } else {
                        res.redirect('/allBlogs')
                    }
                } else {
                    res.render('login.ejs', { message: 'Please validate your email first....' })
                }
            } else {
                res.render('login.ejs', { message: 'WRONG CREDENTIALS..' })
            }
        } else {
            res.render('login.ejs', { message: 'WRONG CREDENTIALS..' })
        }
    } catch (error) {
        console.log(error.message);
    }
}

exports.SignUpPage = (req, res) => {
    try {
        res.render('sign-up.ejs', { message: '' })
    } catch (error) {
        console.log(error.message);
    }
}

exports.SignUpDataMatching = async (req, res) => {
    try {
        const { name, email, pass } = req.body
        const convertedPass = await bcrypt.hash(pass, 10)
        const userCheck = await Reg.findOne({ email: email })
        if (userCheck === null) {
            const record = new Reg({
                name: name,
                email: email,
                pass: convertedPass
            })
            record.save()
            const transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 587,
                secure: false,
                auth: {
                    // TODO: replace `user` and `pass` values from <https://forwardemail.net>
                    user: 'santoshdaiya811@gmail.com',
                    pass: 'tygjiwxhkkzpgmnf'
                }
            });
            console.log('connected to gmail SMTP server');

            const info = await transporter.sendMail({
                from: 'santoshdaiya811@gmail.com', // sender address
                to: record.email, // list of receivers
                subject: "Varification Mail From Minia", // Subject line
                text: "Please click the link below to verfiy your account....", // plain text body
                html: `<a href=http://localhost:5000/emailactivation/${record.id}>Click Here TO Active</a>`, // html body
            });
            console.log('mail sent....');
            res.render('sign-up.ejs', { message: 'Varification link has been sent to your registered email id....' })
        } else {
            res.render('sign-up.ejs', { message: 'This email id is already in use...' })
        }
    } catch (error) {
        console.log(error.message);
    }
}

exports.emailactivation = async (req, res) => {
    try {
        const id = req.params.id
        await Reg.findByIdAndUpdate(id, { status: 'active' })
        res.render('emailVarifyMessage.ejs')
    } catch (error) {
        console.log(error.message);
    }

}

exports.dashboardPage = (req, res) => {
    try {
        const userName = req.session.userName
        res.render('admin/dashboard.ejs', { userName, message: '' })
    } catch (error) {
        console.log(error.message);
    }

}

exports.dashboardPageLogOut = (req, res) => {
    try {
        req.session.destroy()
        res.redirect('/')
    } catch (error) {
        console.log(error.message);
    }

}

exports.adminUsers = async (req, res) => {
    try {
        const record = await Reg.find()
        const userName = req.session.userName
        res.render('admin/users.ejs', { userName, record })
    } catch (error) {
        console.log(error.message);
    }

}

exports.profiles = async (req, res) => {
    try {
        const userName = req.session.userName
        const record = await Reg.find({ img: { $nin: ['default.png'] } })
        res.render('profiles.ejs', { userName, record })
    } catch (error) {
        console.log(error.message);
    }

}

exports.profileUpdate = async (req, res) => {
    try {
        const userName = req.session.userName
        const record = await Reg.findOne({ email: userName })
        res.render('profileUpdate.ejs', { userName, record })
    } catch (error) {
        console.log(error.message);
    }

}

exports.profileDataCatch = async (req, res) => {
    try {
        const { fName, lName, Gender, desc, add, num } = req.body
        const id = req.session.userId
        if (req.file) {
            const filename = req.file.filename
            await Reg.findByIdAndUpdate(id, {
                firstName: fName,
                lastName: lName,
                gender: Gender,
                desc: desc,
                img: filename,
                address: add,
                number: num
            })
        } else {
            await Reg.findByIdAndUpdate(id, {
                firstName: fName,
                lastName: lName,
                gender: Gender,
                desc: desc,
                address: add,
                number: num
            })
        }
        res.redirect('/profileUpdate')

    } catch (error) {
        console.log(error.message);
    }

}

exports.statusUpdate = async (req, res) => {
    try {
        const id = req.params.id
        const record = await Reg.findById(id)
        let newStatus = null
        if (record.status === 'suspended') {
            newStatus = 'active'
        } else {
            newStatus = 'suspended'
        }
        await Reg.findByIdAndUpdate(id, { status: newStatus })
        res.redirect('/admin/users')
    } catch (error) {
        console.log(error.message);
    }

}

exports.contactDetails = async (req, res) => {
    try {
        const userName = req.session.userName
        const id = req.params.id
        const record = await Reg.findById(id)
        res.render('contactDetails.ejs', { userName, record })
    } catch (error) {
        console.log(error.message);
    }

}

exports.forgotPass = (req, res) => {
    try {
        res.render('forgotForm.ejs', { message: '' })

    } catch (error) {
        console.log(error.message);
    }
}

exports.catchForgotPassValue = async (req, res) => {
    try {
        const { email } = req.body
        const record = await Reg.findOne({ email: email })
        if (record == null) {
            res.render('forgotForm.ejs', { message: 'Email not Found!!' })
        } else {
            const transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 587,
                secure: false,
                auth: {
                    // TODO: replace `user` and `pass` values from <https://forwardemail.net>
                    user: 'santoshdaiya811@gmail.com',
                    pass: 'tygjiwxhkkzpgmnf'
                }
            });
            console.log('connected to gmail SMTP server');

            const info = await transporter.sendMail({
                from: 'santoshdaiya811@gmail.com', // sender address
                to: email, // list of receivers
                subject: "Password Change link from Minia.com", // Subject line
                text: "Please click the link below to generate new Password....", // plain text body
                html: `<a href=http://localhost:5000/forgotChangePassForm/${record.id}>Click Here TO Generate New Password</a>`, // html body
            });
            console.log('mail sent....');
            res.render('forgotForm.ejs', { message: 'Password Change link has been sent to your registered email id....' })
        }
    } catch (error) {
        console.log(error.message);
    }

}

exports.forgotChangePassForm = (req, res) => {
    try {
        const id = req.params.id
        res.render('forgotChangePassForm.ejs', { message: '' })
    } catch (error) {
        console.log(error.message);
    }

}

exports.catchForgotChangePassFormValue = async (req, res) => {
    try {
        const id = req.params.id
        const { npass, cpass } = req.body
        if (npass === cpass) {
            const convertedPass = await bcrypt.hash(npass, 10)
            await Reg.findByIdAndUpdate(id, { pass: convertedPass })
            res.render('forgotMessage.ejs')
        } else {
            res.render('forgotChangePassForm.ejs', { message: 'Password Not Matched' })
        }
    } catch (error) {
        console.log(error.message);
    }

}

exports.getNewPass = async (req, res) => {
    try {
        const { newPass } = req.body
        const convertPass = await bcrypt.hash(newPass, 10)
        const record = await Reg.findOne({ email: "cmsproject87@gmail.com" })
        const id = record.id
        await Reg.findByIdAndUpdate(id, {
            pass: convertPass
        })
        const userName = req.session.userName
        res.render('admin/dashboard.ejs', { userName, message: 'Password Update Successfully.' })
    } catch (error) {
        console.log(error.message);
    }
}