const app = require('express')
const Routes = app.Router()
const multer = require('multer')
const path = require('path')
const ControlerPlayer = require('../controllers/player')
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
    //.get('/',ControlerPlayer.CgetAllPlayer)
    .all    ('/*',          auth.authInfo)
    .get    ('/',           ControlerPlayer.CgetAllPlayer, auth.accessToken )
    .get    ('/:iduser',    ControlerPlayer.CgetByidPlayer,auth.accessToken)
    .post   ('/',           ControlerPlayer.CregisterPlayer,upload.single('foto') )
    .post   ('/login',      ControlerPlayer.login)
    .patch  ('/edit/:iduser', ControlerPlayer.CeditPlayer)
    .patch  ('/logout/:iduser', ControlerPlayer.logout)

module.exports = Routes