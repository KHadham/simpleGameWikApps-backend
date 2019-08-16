const conn = require('../configs/db')

module.exports = {
////////GET ALL PLAYER////////////////////////////
    MgetAllPlayer: () => {
        return new Promise((resolve, reject) => {
            conn.query('SELECT * FROM player', (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },
////////GET 1 PLAYER////////////////////////////

    MgetByidPlayer: (iduser) => {
        return new Promise((resolve, reject) => {
            conn.query('SELECT * FROM player WHERE id_player = ?', iduser, (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },
//////// POST PLAYER / REGISTER ///////////////////////////

    MregisterPlayer: (data) => {
        return new Promise((resolve, reject) => {
            conn.query('INSERT INTO player SET ?', data, (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(err)
                }
            })
        })
    },
//////// POST / LOGIN  PLAYER ////////////////////////////

    MloginPlayer: (username) => {
        return new Promise((resolve, reject) => {
            conn.query('SELECT player.*,leaderboard.score FROM player LEFT JOIN leaderboard ON player.id_player = leaderboard.id_leaderboard WHERE player.username = ?', username, (err, result) => {
                if (!err) {
                    console.log(result)
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },
////////  XXXX ////////////////////////////

    updateToken: (username, token) => {
        return new Promise((resolve, reject) => {
            conn.query('UPDATE player SET token = ? WHERE username = ?', [token, username], (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },
////////  EDIT DATA PLAYER ////////////////////////////

    MeditPlayer: (data, id) => {
        return new Promise((resolve, reject) => {
            conn.query('UPDATE player SET ? WHERE id_player = ?', [data, id], (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },
//////// LOGOUT PLAYER////////////////////////////

    MlogoutPlayer: (iduser) => {
        return new Promise((resolve, reject) => {
            conn.query(`UPDATE player SET token = '' WHERE id_player = ?`, iduser, (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },
}