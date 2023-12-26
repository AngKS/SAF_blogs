require('dotenv').config();
const fastify = require("fastify")({
    logger: false
})
const cors = require('@fastify/cors')
const jwt = require('jsonwebtoken');

var user = require("./model/User")
var blog = require("./model/Blogs")

fastify.register(cors, {
    origin: '*'
})


// Can use default JSON/Text parser for different content Types
fastify.addContentTypeParser('application/json', { parseAs: 'string' }, function (req, body, done) {
    try {
        var json = JSON.parse(body)
        done(null, json)
    } catch (err) {
        err.statusCode = 400
        done(err, undefined)
    }
})

// API Endpoints``

// Hello World test route
fastify.get('/', function (req, res) {
    res.send({ hello: 'world' })
})


fastify.post("/api/register", (req, res) => {
    console.log(`\n\n\n=========== logging ============\n ${JSON.stringify(req.body)}\n\n\n`)
    let username = req.body.username
    let password = req.body.password
    let email = req.body.email
    let role = req.body.role
    user.addUser(email, username, password, role, (err, result) => {
        if (err) {
            res.send({ status: "error", message: err })
        }
        res.send({ status: "success", message: result })

    })

})

fastify.post("/api/login", (req, res) => {
    let username = req.body.username
    let password = req.body.password
    user.loginUser(username, password, (err, result) => {
        if (err) {
            res.send({ status: "error", message: err })
        }
        res.send({ status: "success", message: result })

    })

})

fastify.post("/api/user/auth", (req, res) => {
    let token = req.body.token
    user.authenticateUser(token, (err, result) => {
        if (err) {
            res.send({ status: "error", message: err })
        }
        res.send({ status: "success", message: result })

    })
})


fastify.get("/api/blogs", (req, res) => {
    blog.getAllBlogs((err, result) => {
        if (err) {
            res.send({ status: "error", message: err })
        }
        res.send({ status: "success", message: result })

    })

})

// GET all user blogs
fastify.post("/api/user/blogs", (req, res) => {
    let user_id = req.body.user_id
    blog.getUserBlogs(user_id, (err, result) => {
        if (err) {
            res.send({ status: "error", message: err })
        }
        res.send({ status: "success", message: result })

    })
})

// GET specific blog
fastify.post("/api/blog", (req, res) => {
    let blog_id = req.body.blog_id
    console.log(req.body)
    blog.getBlogByID(blog_id, (err, result) => {
        if (err) {
            res.send({ status: "error", message: err })
        }
        res.send({ status: "success", message: result })

    })
})

// POST new Blog post
fastify.post("/api/blog/new", async (req, res) => {

    let blog_content = req.body.content
    let blog_title = req.body.title
    let user_token = req.body.token

    // authorize if token is fit for transaction

    var userAuthenticated = null
    try {
        jwt.verify(user_token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return callback(err, null)
            }
            else {
                userAuthenticated = decoded
            }
        })
        console.log(userAuthenticated)
    } catch (err) {
        console.log("HERE", err)
        return res.send({ status: "error", message: err })
    }
    if (userAuthenticated !== null) {
        console.log("Saving blog")
        blog.addBlog(blog_title, blog_content, userAuthenticated.id, (err, result) => {
            if (err) {
                res.send({ status: "error", message: err })
            }
            res.send({ status: "success", message: result })

        })
    }
    else {
        res.send({ status: "error", message: "Not Authorized" })
    }

})

fastify.put("/api/blog/update", async (req, res) => {
    
        let blog_content = req.body.content
        let blog_title = req.body.title
        let user_token = req.body.token
        let blog_id = req.body.blogUUID
        let userUUID = req.body.userUUID
    
        // authorize if token is fit for transaction
    
        var userAuthenticated = null
        try {
            jwt.verify(user_token, process.env.JWT_SECRET, (err, decoded) => {
                if (err) {
                    return callback(err, null)
                }
                else {
                    userAuthenticated = decoded
                }
            })
            console.log(userAuthenticated)
        } catch (err) {
            console.log("HERE", err)
            return res.send({ status: "error", message: err })
        }
        if (userAuthenticated !== null) {
            console.log("Updating blog")
            // compare user id with author_user_id
            if (userAuthenticated.id !== userUUID){
                return res.send({ status: "error", message: "Not Authorized" })
            }
            else{
                blog.updateBlog(blog_title, blog_content, userUUID, blog_id, (err, result) => {
                    if (err) {
                        res.send({ status: "error", message: err })
                    }
                    res.send({ status: "success", message: result })

                })
            }

            
        }
        else {
            res.send({ status: "error", message: "Not Authorized" })
        }
})


fastify.post("/api/blog/delete", async (req, res) => {
        
            let user_token = req.body.token
            let blog_id = req.body.blogUUID
            let userUUID = req.body.userUUID
        
            // authorize if token is fit for transaction
            console.log(req.body)
            var userAuthenticated = null
            try {
                jwt.verify(user_token, process.env.JWT_SECRET, (err, decoded) => {
                    if (err) {
                        return callback(err, null)
                    }
                    else {
                        userAuthenticated = decoded
                    }
                })
                console.log(userAuthenticated)
            } catch (err) {
                console.log("HERE", err)
                return res.send({ status: "error", message: err })
            }
            if (userAuthenticated !== null) {
                console.log("Deleting blog")
                // compare user id with author_user_id
                if (userAuthenticated.id !== userUUID){
                    return res.send({ status: "error", message: "Not Authorized" })
                }
                else{
                    blog.deleteBlog(userUUID, blog_id, (err, result) => {
                        if (err) {
                            res.send({ status: "error", message: err })
                        }
                        res.send({ status: "success", message: result })
    
                    })
                }
    
                
            }
            else {
                res.send({ status: "error", message: "Not Authorized" })
            }
})




fastify.listen(3000,(err, address) =>{
    if (err) {
        fastify.log.error(err)
        process.exit(1)
    }
    fastify.log.info(`server listening on ${address}`)
})