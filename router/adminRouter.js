const adminRouter = require('express').Router()
const RegC = require('../controllers/regcontroller');
const validation = require('../helpers/validation');
const adminCheck = require('../helpers/adminCheck');

adminRouter.get('/dashboard', validation, adminCheck, RegC.dashboardPage)

adminRouter.get('/users', validation, adminCheck, RegC.adminUsers)

adminRouter.get('/statusUpdate/:id', validation, adminCheck, RegC.statusUpdate)

module.exports = adminRouter