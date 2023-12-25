`let db = require("./databaseConfigs")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const saltRounds = 10;


let User = {

    addUser: (email, uername, password, role, callback) => {
        let conn = db.getConnection();
        conn.connect((err) => {
            if (err) {
                return callback(err, null)
            }
            if (role == null) role = "user"
            bcrypt.hash(password, saltRounds, (errHashing, password) => {
                if (errHashing) {
                    return callback(errHashing, null)
                }
                else{
                    let sql = "INSERT INTO users (email, username, user_password, user_role) VALUES (?, ?, ?, ?)"
                    conn.query(sql, [email, uername, password, role], (err, result) => {
                        conn.end()
                        if (err) {
                            return callback(err, null)
                        }
                        console.log("User added successfully")
                        return callback(null, { id: result.insertId, affectedRows: result.affectedRows, success: true });

                    });
                }

            })
            
        });
    },

    loginUser: (username, password, callback) => {
        let conn = db.getConnection();
        conn.connect((err) => {
            if (err){
                return callback(err, null)
            }
            else{
                let sql = "SELECT * FROM users WHERE username = ?"
                conn.query(sql, [username], (err, result) => {
                    conn.end()
                    if (err){
                        return callback(err, null)
                    }
                    else{
                        if (result.length > 0){
                            bcrypt.compare(password, result[0].user_password, (err, res) => {
                                // remove password from result
                                if (err){
                                    return callback(null, {success: false, message: "Invalid username or password", token: ""})
                                }
                                else{
                                    if (res){
                                        let payload = {
                                            id: result[0].user_id,
                                            role: result[0].user_role,
                                            username: result[0].username

                                        }
                                        let token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: "1h"})
                                        return callback(null, {success: true, token: token})
                                        
                                    }
                                    else{
                                        return callback(null, {success: false, message: "Invalid username or password", token: ""})
                                    }
                                }
                            })
                        }
                        else{
                            return callback(null, {success: false, message: "Invalid username or password", token: ""})
                        }
                    }
                })
            }
        })
    },

    authenticateUser: (token, callback) => {
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err){
                return callback(err, null)
            }
            else{
                return callback(null, decoded)
            }
        })
    }

    


}

module.exports = User