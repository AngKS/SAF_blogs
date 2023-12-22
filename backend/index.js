require('dotenv').config();
const fastify = require("fastify")({
    logger: true
})
const cors = require('@fastify/cors')
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

fastify.post("/api/user/blogs", (req, res) => {
    let user_id = req.body.user_id
    blog.getUserBlogs(user_id, (err, result) => {
        if (err) {
            res.send({ status: "error", message: err })
        }
        res.send({ status: "success", message: result })

    })
})

fastify.post("/api/blog", (req, res) => {
    let blog_id = req.body.blog_id
    
    blog.getBlogByID(blog_id, (err, result) => {
        if (err) {
            res.send({ status: "error", message: err })
        }
        res.send({ status: "success", message: result })

    })
})










fastify.listen(3000,(err, address) =>{
    if (err) {
        fastify.log.error(err)
        process.exit(1)
    }
    fastify.log.info(`server listening on ${address}`)
})