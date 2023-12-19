var mysql = require('mysql2');

var dbconnect = {
    getConnection: function () {
        var conn = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "aks12345",
            database: "saf_blogs"
        });
        return conn;
    }
};

module.exports = dbconnect