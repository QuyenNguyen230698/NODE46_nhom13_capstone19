const movie = {
    "/api/movies/list": {
        get: {
            tags: ["Movie"],
            security: [
                {
                    bearerAuth: [],
                },
            ],
            summary: "Get List Movie",
            description: "Get List Movie",
            responses: {
                "200": {
                    description: "Success",
                },
            }
        },
    }
}

module.exports = movie