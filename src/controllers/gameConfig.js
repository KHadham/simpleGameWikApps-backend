const gameConfigModel = require('../models/gameConfig')
const miscHelpers = require('../helpers/miscHelpers')
const cloudinary = require('cloudinary')
const jwt = require('jsonwebtoken')

module.exports = {
////// GET ALL Leaderboard ///////////////////////////////////////
CgetAllGconfig: (req, res) => {
    gameConfigModel.MgetAllConfig()
        .then((resultData) => {
            miscHelpers.response(res, resultData)
        })
        .catch((error) => {
            console.log(error)
        })
    },
/////// GET 1 Leaderboard /////////////////////////////////////////////
    CgetByidLeaderboard: (req, res) => {
        const iduser = req.params.iduser

        gameConfigModel.MgetByidLeaderboard(iduser)
        .then((resultData) => {
            const result = resultData
            miscHelpers.response(res, result, 200)
        })
        .catch((err) => {
            console.log(err)
            
        })
    },
///////  POST Leaderboard //////////////////////////////////////////////
    CpostLeaderboard: (req, res) => {

        const data = {
            id_player: req.body.id_player,
            score: req.body.score
        }
    
        gameConfigModel.MpostLeaderboard(data)
        .then(()=> {
            miscHelpers.response(res, data, 200)
        })
        .catch((err) => {
            console.log(err)
        })
    },
/////// EDIT / PATCH Leaderboard //////////////////////////////////////////////
CeditPlayer: (req, res) => {
    console.log( req.body.username,req.body.email,req.params.iduser)
    let idnya = req.params.iduser

    const data = {
        username  : req.body.username,
        email     : req.body.email,
        // foto   : 'https://localhost:5000/' + req.file.path,
    }
    
    gameConfigModel.MeditPlayer(data,idnya)
            .then((resultRegister) => {
                miscHelpers.response(res, resultRegister, 200,idnya)
        })
        .catch((error) => {
            console.log(error)
        })
    },
//////// LOGIN POST /////////////////////////////////////////
    login: (req, res) => {
        const username = req.body.username
        const password = req.body.password

        gameConfigModel.MloginPlayer(username)
            .then((result) => {
                const dataUser = result[0]
                const usePassword = miscHelpers.setPassword(password, dataUser.salt).passwordHash

                if (usePassword === dataUser.password) {
                    dataUser.token = jwt.sign({
                        id_player   : dataUser.id_player,
                        email       : dataUser.fullname,
                        foto        : dataUser.foto,
                    }, process.env.SECRET_KEY, { expiresIn: '1h' })

                    const token = dataUser.token
                    delete dataUser.salt
                    delete dataUser.password

                    gameConfigModel.updateToken(username, token)
                        .then((resultToken) => {
                            return miscHelpers.response(res, dataUser, 200)
                        })
                        .catch((error) => {
                            console.log(error)
                        })
                    return miscHelpers.response(res, dataUser, 200)
                } else {
                    return miscHelpers.response(res, null, 403, 'Wrong Password!')
                }
            })
            .catch((error) => {
                console.log(error)
            })
    },
/////////////////////////////////////////////////
    logout: (req, res) => {
        const iduser = req.params.iduser

        gameConfigModel.MlogoutPlayer(iduser)
            .then(() => {
                miscHelpers.response(res, 'anda sudah logout', 200)
            })
            .catch((error) => {
                console.log(error)
            })
    },
}