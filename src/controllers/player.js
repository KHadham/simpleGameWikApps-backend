const PlayerModel = require('../models/player')
const miscHelpers = require('../helpers/miscHelpers')
const cloudinary = require('cloudinary')
const jwt = require('jsonwebtoken')

module.exports = {
////// GET ALL PLAYER ///////////////////////////////////////
    CgetAllPlayer: (req, res) => {
        PlayerModel.MgetAllPlayer()
            .then((resultData) => {
                const result = resultData
                resultData.map((item) => {
                    delete item.salt
                    delete item.password
                })
                miscHelpers.response(res, result)
            })
            .catch((error) => {
                console.log(error)
            })
        },
/////// GET 1 PLAYER /////////////////////////////////////////////
    CgetByidPlayer: (req, res) => {
        const iduser = req.params.iduser

        PlayerModel.MgetByidPlayer(iduser)
            .then((resultUser) => {
                const result = resultUser[0]
                delete result.salt
                delete result.password
                miscHelpers.response(res, result, 200)
            })
            .catch((error) => {
                console.log(error)
            })
    },
/////// REGISTER / POST PLAYER //////////////////////////////////////////////
    CregisterPlayer: (req, res) => {
        console.log(req.body)
        const salt = miscHelpers.generateSalt(18)
        const passwordHash = miscHelpers.setPassword(req.body.password, salt)

        const data = {
            username  : req.body.username,
            email     : req.body.email,
            password  : passwordHash.passwordHash,
            salt      : passwordHash.salt,
            token     : 'Test',
            foto      : 'https://localhost:5000/' + req.file.path,
        }
        
        PlayerModel.MregisterPlayer(data)
                .then((resultRegister) => {
                    miscHelpers.response(res, resultRegister, 200)
            })
            .catch((error) => {
                console.log(error)
            })
        },
/////// EDIT / PATCH PLAYER //////////////////////////////////////////////
CeditPlayer: (req, res) => {
    console.log( req.body.username,req.body.email,req.params.iduser)
    let idnya = req.params.iduser

    const data = {
        username  : req.body.username,
        email     : req.body.email,
        // foto   : 'https://localhost:5000/' + req.file.path,
    }
    
    PlayerModel.MeditPlayer(data,idnya)
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

        PlayerModel.MloginPlayer(username)
            .then((result) => {
                const dataUser = result[0]
                const usePassword = miscHelpers.setPassword(password, dataUser.salt).passwordHash

                if (usePassword === dataUser.password) {
                    dataUser.token = jwt.sign({
                        id_player   : dataUser.id_player,
                        email       : dataUser.email,
                        foto        : dataUser.foto,
                        score       : dataUser.score
                    }, process.env.SECRET_KEY, { expiresIn: '1h' })

                    const token = dataUser.token
                    delete dataUser.salt
                    delete dataUser.password

                    PlayerModel.updateToken(username, token)
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

        PlayerModel.MlogoutPlayer(iduser)
            .then(() => {
                miscHelpers.response(res, 'anda sudah logout', 200)
            })
            .catch((error) => {
                console.log(error)
            })
    },
}