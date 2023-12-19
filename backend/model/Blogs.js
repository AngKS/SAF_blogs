let db = require("./databaseConfigs")


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
    }



}

module.exports = Blog