const movie = {
    "/api/movies/": {
        get: {
            tags: ["Landing Page"],
            summary: "Get List Movie",
            description: "Get List Movie",
            responses: {
                "200": {
                    description: "Success",
                },
            }
        },
    },
    "/api/movies/detail": {
        post: {
            tags: ["Landing Page"],
            summary: "Get Detail Movie",
            description: "Get Detail Movie",
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                movieCode: {
                                    type: "number",
                                    example: 1000
                                }
                            },
                            required: ["movieCode"]
                        }
                    }
                }
            },
            responses: {
                "200": {
                    description: "Get Detail Movie Successfully",
                },
                "400": {
                    description: "Bad Request",
                },
                "401": {
                    description: "Unauthorized",
                }
            }
        },
    },
    "/api/movies/find-schedule": {
        post: {
            tags: ["Landing Page"],
            summary: "Find Schedule Movie",
            description: "Find Schedule Movie",
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                maLichChieu: {
                                    type: "number",
                                    example: 100
                                }
                            },
                            required: ["maLichChieu"]
                        }
                    }
                }
            },
            responses: {
                "200": {
                    description: "Find Schedule Movie Successfully",
                },
                "400": {
                    description: "Bad Request",
                },
                "401": {
                    description: "Unauthorized",
                }
            }
        },
    },
    "/api/theaters/list": {
        get: {
            tags: ["Landing Page"],
            summary: "Get List Theater",
            description: "Get List Theater",
            responses: {
                "200": {
                    description: "Success",
                },
            }
        },
    },
    "/api/theaters/create": {
        post: {
            tags: ["Landing Page"],
            summary: "Create New Theater",
            description: "Create New Theater",
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                theaterCode: {
                                    type: "string"
                                },
                                theaterName: {
                                    type: "string"
                                },
                                slug: {
                                    type: "string"
                                },
                                logo: {
                                    type: "string"
                                }
                            },
                            required: ["theaterCode", "theaterName", "slug", "logo"]
                        }
                    }
                }
            },
            responses: {
                "200": {
                    description: "Create New Theater Successfully",
                },
                "400": {
                    description: "Bad Request",
                },
                "401": {
                    description: "Unauthorized",
                }
            }
        },
    },
    "/api/theaters/create-complex": {
        post: {
            tags: ["Landing Page"],
            summary: "Create New Complex",
            description: "Create New Complex",
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                theaterCode: {
                                    type: "string"
                                },
                                maCumRap: {
                                    type: "string"
                                },
                                tenCumRap: {
                                    type: "string"
                                },
                                diaChi: {
                                    type: "string"
                                },
                                danhSachRap: {
                                    type: "array",
                                    items: {
                                        type: "object",
                                        properties: {
                                            maRap: {
                                                type: "number",
                                                example: 501
                                            },
                                            tenRap: {
                                                type: "string",
                                                example: "Rạp 1"
                                            }
                                        },
                                        required: ["maRap", "tenRap"]
                                    }
                                }
                            },
                            required: ["theaterCode", "maCumRap", "tenCumRap", "diaChi"]
                        }
                    }
                }
            },
            responses: {
                "200": {
                    description: "Create New Complex Successfully",
                },
                "400": {
                    description: "Bad Request",
                },
                "401": {
                    description: "Unauthorized",
                }
            }
        },
    },
    "/api/theaters/find": {
        post: {
            tags: ["Landing Page"],
            summary: "Find Theater Complex",
            description: "Find Theater Complex",
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                theaterCode: {
                                    type: "string"
                                }
                            },
                            required: ["maLichChieu"]
                        }
                    }
                }
            },
            responses: {
                "200": {
                    description: "Find Theater Complexe Successfully",
                },
                "400": {
                    description: "Bad Request",
                },
                "401": {
                    description: "Unauthorized",
                }
            }
        },
    },
    "/api/theaters/chair": {
        get: {
            tags: ["Landing Page"],
            summary: "Get List list Seat",
            description: "Get List Seat",
            responses: {
                "200": {
                    description: "Success",
                },
            }
        },
    },
    "/api/theaters/booking": {
        post: {
            tags: ["Landing Page"],
            summary: "Booking Ticket",
            description: "Booking Ticket",
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            type: "object",
                            properties: {
                                email: {
                                    type: "string"
                                },
                                maLichChieu: {
                                    type: "number"
                                },
                                danhSachVe: {
                                    type: "array",
                                    items: {
                                        type: "object",
                                        properties: {
                                            maGhe: {
                                                type: "number",
                                                example: 38
                                            },
                                            price: {
                                                type: "number",
                                                example: 100000
                                            }
                                        },
                                        required: ["maGhe", "price"]
                                    }
                                }
                            },
                            required: ["email", "maLichChieu", "danhSachVe"]
                        }
                    }
                }
            },
            responses: {
                "200": {
                    description: "Booking Ticket Successfully",
                },
                "400": {
                    description: "Bad Request",
                },
                "401": {
                    description: "Unauthorized",
                }
            }
        },
    },
    "/api/movies/list-banner": {
        get: {
            tags: ["Landing Page"],
            summary: "Get List Banner",
            description: "Get List Banner",
            responses: {
                "200": {
                    description: "Success",
                },
            }
        },
    }
}

module.exports = movie