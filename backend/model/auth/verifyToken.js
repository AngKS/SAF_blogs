var jwt = require('jsonwebtoken');


function verifyToken(token) {


    if (!token) { //process the token
        return {
            statusCode: 403,
            body: {
                auth: false,
                message: "Not Authorized"
            }
        }
    } else {
        jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {//verify token
            if (err) {
                return {
                    statusCode: 403,
                    body: {
                        auth: false,
                        message: "Not Authorized"
                    }
                }
            } else {
                // verify expiry
                let now = new Date.now()
                let expired = decoded.exp < now
                if (expired) {
                    return {
                        statusCode: 403,
                        body: {
                            auth: false,
                            message: "Not Authorized"
                        }
                    }
                } else {
                    return {
                        statusCode: 200,
                        body: {
                            auth: true,
                            message: "Authorized"
                        }
                    }
                }
            }
        });
    }
}

module.exports = verifyToken;
