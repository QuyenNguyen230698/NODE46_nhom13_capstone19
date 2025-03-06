const user = require('./user.swagger')

const swaggerDocument = {
    openapi: "3.1.0",
    info: {
        title: "Nhom 13 NODE46 CapStone Buoi 19",
        version: "1.0.0",
        description: "BE NODE 46",
    },
    servers: [
        {
            url: "http://localhost:4000",
            description: "Local server",
        },
    ],
    components: {
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
            },
        },
    },
    paths: {
        ...user
    },
}

module.exports = swaggerDocument