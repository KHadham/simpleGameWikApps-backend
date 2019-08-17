require('dotenv/config')

const mysql = require('mysql')

const connection = mysql.createConnection({
    host    : process.env.DB_HOST,
    user    : process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
})

module.exports = connection

// Username: bXIhm8VlW9

// Database name: bXIhm8VlW9

// Password: TDhamgnPbq

// Server: remotemysql.com

// Port: 3306