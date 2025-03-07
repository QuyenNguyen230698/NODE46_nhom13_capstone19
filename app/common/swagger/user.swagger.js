const { format } = require("morgan")

const user = {
    "/api/users/": {
        get: {
            tags: ["Admin or User"],
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
            tags: ["Admin or User"],
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
        tags: ["Admin or User"],
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
                                example: "q4@gmail.com"
                            },
                            password: {
                                type: "string",
                                format: "password",
                                example: "1234"
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
    "/api/users/login-admin": {
    post: {
        tags: ["Admin or User"],
        summary: "Admin login",
        description: "Endpoint for Admin login",
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
                                example: "q@gmail.com"
                            },
                            password: {
                                type: "string",
                                format: "password",
                                example: "1234"
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
    "/api/users/update": {
        post: {
            tags: ["Admin or User"],
            summary: "Update for users",
            description: "Update users. Requires Bearer Token authentication.",
            security: [
                {
                    bearerAuth: []
                }
            ],
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
                                    format: "password",
                                    example: "1234"
                                },
                                username: {
                                    type: "string",
                                    example: "full name"
                                },
                                phoneNumber: {
                                    type: "string",
                                    example: "0909988776"
                                },
                                avatar: {
                                    type: "string",
                                    example: "https://res.cloudinary.com/dy3tzo2kg/image/upload/v1741069754/avatar-default_q3pzgr.png"
                                },
                                position: {
                                    type: "string",
                                    example: "Guest or Staff"
                                }
                            },
                            required: ["email", "password", "username", "phoneNumber", "avatar", "position"]
                        }
                    }
                }
            },
            responses: {
                "200": {
                    description: "Change Roles Successful",
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
        tags: ["Admin or User"],
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
    "/api/users/update-role": {
        post: {
            tags: ["Admin or User"],
            summary: "Get list of users",
            description: "Retrieve a list of users. Requires Bearer Token authentication.",
            security: [
                {
                    bearerAuth: []
                }
            ],
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
                                roles: {
                                    type: "string",
                                    example: "ADMIN or USER"
                                }
                            },
                            required: ["email", "role"]
                        }
                    }
                }
            },
            responses: {
                "200": {
                    description: "Change Roles Successful",
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
    "/api/users/delete": {
        post: {
            tags: ["Admin or User"],
            summary: "Delete users",
            description: "Delete users. Requires Bearer Token authentication.",
            security: [
                {
                    bearerAuth: []
                }
            ],
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
                                status: {
                                    type: "string",
                                    example: "ACTIVE or INACTIVE"
                                }
                            },
                            required: ["email", "status"]
                        }
                    }
                }
            },
            responses: {
                "200": {
                    description: "Change Roles Successful",
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
    "/api/users/find-user": {
        post: {
            tags: ["Admin or User"],
            summary: "Find users",
            description: "Find users. Requires Bearer Token authentication.",
            security: [
                {
                    bearerAuth: []
                }
            ],
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
                                }
                            },
                            required: ["email"]
                        }
                    }
                }
            },
            responses: {
                "200": {
                    description: "Change Roles Successful",
                },
                "400": {
                    description: "Bad Request",
                },
                "401": {
                    description: "Unauthorized",
                }
            }
        }
    }
}

module.exports = user