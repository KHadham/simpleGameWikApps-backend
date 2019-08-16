const jwt = require('jsonwebtoken')
const miscHelper = require('./miscHelpers')

const allowedAccess = process.env.REQUEST_HEADERS

module.exports = {
    authInfo: (req, res, next) => {
        const headerAuth = req.headers['authorization']
        const headerSecret = req.headers['x-access-token']

        if (headerAuth !== allowedAccess) {
            return miscHelper.response(res, null, 401, 'Unauthorized, Need access token!')
        } else if (typeof headerSecret === 'undefined') {
            next()
        } else {
            const bearerToken = headerSecret.split(' ')
            const token = bearerToken[1]
            req.token = token
            console.log('Token Stored! ', token)
            next()
        }
    },

    accessToken: (req, res, next) => {
        const secretKey = process.env.SECRET_KEY
        const accessToken = req.token
        const userToken = req.headers['x-control-user']

        jwt.verify(accessToken, secretKey, (err, decoded) => {
            if (err && err.name === 'TokenExpiredError') return miscHelper.response(res, null, 401, 'Token Expired!')

            if (err && err.name === 'JsonWebTokenError') return miscHelper.response(res, null, 401, 'Invalid Token')

            if (parseInt(userToken) !== parseInt(decoded.id_player)) return miscHelper.response(res, null, 401, 'Invalid User Token!')
            console.log(decoded)
            next()
        })
    }
}