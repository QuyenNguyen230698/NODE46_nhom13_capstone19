const user = {
    "/api/users/": {
        get: {
            tags: ["users"],
            security: [
                {
                    bearerAuth: [],
                },
            ],
            summary: "First check run",
            description: "Second check run",
            responses: {
                "200": {
                    description: "Success",
                },
            }
        },
    },
    "/api/users/register": {
        post: {
            tags: ["register"],
            security: [
                {
                    bearerAuth: [],
                },
            ],
            summary: "Register Account",
            description: "Need username, email, password, phoneNumber",
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                username: {
                                    type: "string",
                                },
                                email: {
                                    type: "string",
                                    format: "email",
                                },
                                password: {
                                    type: "string",
                                },
                                phoneNumber: {
                                    type: "string",
                                }
                            },
                            required: ["username", "email", "password", "phoneNumber"]
                        }
                    }
                }
            },
            responses: {
                "200": {
                    description: "Success",
                },
                "400": {
                    description: "Bad Request",
                },
                "401": {
                    description: "Unauthorized",
                }
            }
        }
    },
    "/api/users/login": {
    post: {
        tags: ["login"],
        summary: "User login",
        description: "Endpoint for user login",
        requestBody: {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            email: {
                                type: "string",
                                format: "email",
                            },
                            password: {
                                type: "string",
                            }
                        },
                        required: ["email", "password"]
                    }
                }
            }
        },
        responses: {
            "200": {
                description: "Login successful",
            },
            "400": {
                description: "Bad Request",
            },
            "401": {
                description: "Unauthorized",
            }
        }
    }
    },
    "/api/users/list": {
    get: {
        tags: ["Get list users"],
        summary: "Get list of users",
        description: "Retrieve a list of users. Requires Bearer Token authentication.",
        security: [
            {
                bearerAuth: []
            }
        ],
        responses: {
            "200": {
                description: "A list of users",
                content: {
                    "application/json": {
                        schema: {}
                    }
                }
            },
            "401": {
                description: "Unauthorized"
            }
        }
    }
    },
}

module.exports = user