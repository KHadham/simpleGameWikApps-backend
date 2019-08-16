const app = require('express')
const Routes = app.Router()
const multer = require('multer')
const path = require('path')
const ControlLead = require('../controllers/leaderboard')
const auth = require('../helpers/auth')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString() + file.originalname);
    }
})
const upload = multer({ storage: storage })

Routes
    //.get('/',ControlLead.CgetAllPlayer)
    .all    ('/*',          auth.authInfo)
    .get    ('/',           ControlLead.CgetAllLeaderboard  )
    .get    ('/score',      ControlLead.CgetAllscore  )
    .get    ('/:iduser',    ControlLead.CgetByidLeaderboard )
    .post   ('/',           ControlLead.CpostLeaderboard )
    .post   ('/login',      ControlLead.login)
    .patch  ('/edit/:iduser', ControlLead.CeditPlayer)
    .patch  ('/logout/:iduser', ControlLead.logout)

module.exports = Routes