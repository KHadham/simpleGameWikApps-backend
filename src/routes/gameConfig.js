const app = require('express')
const Routes = app.Router()
const multer = require('multer')
const path = require('path')
const ControlConfig = require('../controllers/gameConfig')
const auth = require('../helpers/auth')

Routes
    //.get('/',ControlConfig.CgetAllPlayer)
    .all    ('/*',          auth.authInfo)
    .get    ('/',           ControlConfig.CgetAllGconfig  )
    .get    ('/:iduser',    ControlConfig.CgetByidLeaderboard )
    .post   ('/',           ControlConfig.CpostLeaderboard )
    .post   ('/login',      ControlConfig.login)
    .patch  ('/edit/:iduser', ControlConfig.CeditPlayer)
    .patch  ('/logout/:iduser', ControlConfig.logout)

module.exports = Routes