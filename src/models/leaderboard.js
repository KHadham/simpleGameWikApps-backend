const conn = require('../configs/db')

module.exports = {
////////GET ALL LEADERBOARD////////////////////////////
    MgetAllLeaderboard: () => {
        return new Promise((resolve, reject) => {
            conn.query(' SELECT leaderboard.* ,player.username,player.foto FROM leaderboard LEFT JOIN player ON leaderboard.id_player = player.id_player ORDER BY leaderboard.score DESC LIMIT 10 ', (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },
////////GET ALL LEADERBOARD////////////////////////////
    MgetAllscore: () => {
        return new Promise((resolve, reject) => {
            conn.query(' SELECT leaderboard.score from leaderboard ORDER BY leaderboard.score DESC LIMIT 10', (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },
////////GET 1 LEADERBOARD////////////////////////////

    MgetByidLeaderboard: (iduser) => {
        return new Promise((resolve, reject) => {
            conn.query('SELECT leaderboard.* ,player.username,player.foto FROM leaderboard LEFT JOIN player ON leaderboard.id_player = player.id_player WHERE player.id_player = ?', iduser, (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },
//////// POST LEADERBOARD / CREATE ///////////////////////////

    MpostLeaderboard: (data) => {
        return new Promise((resolve, reject) => {
            conn.query('INSERT INTO leaderboard SET ?', data, (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(err)
                }
            })
        })
    },

////////  UPDATE / EDIT EUY ////////////////////////////

    MupdateLeaderboard: (username, token) => {
        return new Promise((resolve, reject) => {
            conn.query('UPDATE leaderboard SET ? WHERE id_player = ?', [token, username], (err, result) => {
                if (!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },
    
}