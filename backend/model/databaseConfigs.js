var mysql = require('mysql2');

var dbconnect = {
    getConnection: function () {
        var conn = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: process.env.DB_PASSWORD,
            database: "saf_blogs"
        });
        return conn;
    }
};

module.exports = dbconnect