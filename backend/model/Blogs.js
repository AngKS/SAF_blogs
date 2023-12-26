let db = require("./databaseConfigs")
const jwt = require("jsonwebtoken")
const { v4: uuidv4 } = require('uuid');


let Blog = {

    getAllBlogs: (callback) => {
        let conn = db.getConnection();
        conn.connect((err) => {
            if (err) {
                return callback(err, null)
            }
            let sql = "SELECT blogs.*, users.* FROM blogs INNER JOIN users ON blogs.author_user_id = users.user_id";
            conn.query(sql, (err, result) => {
                conn.end()
                if (err) {
                    return callback(err, null)
                }
                delete result[0].user_password
                delete result[0].user_id
                delete result[0].user_role
                delete result[0].author_user_id
                console.log(result)
                return callback(null, result)
            })
        })
    },

    getUserBlogs: (userId, callback) => {
        let conn = db.getConnection();
        conn.connect((err) => {
            if (err) {
                return callback(err, null)
            }
            let sql = "SELECT * FROM blogs WHERE author_user_id = ?"
            conn.query(sql, [userId], (err, result) => {
                conn.end()
                if (err) {
                    return callback(err, null)
                }

                console.log(result)
                delete result[0].author_user_id
                return callback(null, result)
            })
        })
    },

    getBlogByID: (blog_id, callback) => {
        let conn = db.getConnection();
        conn.connect((err) => {
            if (err) {
                return callback(err, null)
            }
            let sql = "SELECT blogs.*, users.* FROM blogs INNER JOIN users ON blogs.author_user_id = users.user_id WHERE blog_id = ?"
            conn.query(sql, [blog_id], (err, result) => {
                conn.end()
                if (err) {
                    return callback(err, null)
                }
                delete result[0].user_password
                delete result[0].user_id
                delete result[0].user_role
                delete result[0].author_user_id
                console.log(result)
                return callback(null, result)
            })
        })
    },

    addBlog: (title, content, userUUID, callback) => {

        let conn = db.getConnection();
        conn.connect((err) => {
            if (err) {
                return callback(err, null)
            }

            // check if user exists
            let sql = "SELECT * FROM users WHERE userUUID = ?"
            conn.query(sql, [userUUID], (err, result) => {
                if (err) {
                    return callback(err, null)
                }
                if (result.length > 0) {
                    console.log("User exists")
                    // user exists
                    let sql = "INSERT INTO blogs (blogUUID, blog_title, blog_content, author_user_id) VALUES (?, ?, ?, ?)"
                    conn.query(sql, [uuidv4(), title, content, userUUID], (err, result) => {
                        conn.end()
                        if (err) {
                            return callback(err, null)
                        }
                        console.log("\n\n ============\n\nBlog added successfully\n===================\n\n\n")
                        return callback(null, { id: result.insertId, affectedRows: result.affectedRows, success: true });

                    });
                }
                else {
                    return callback("User does not exist", null)
                }
            })

        });
    },





}

module.exports = Blog