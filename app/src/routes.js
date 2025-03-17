const express = require('express');
const router = express.Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../common/swagger/init.swagger.js');


const userRoutes = require('../routes/admin/user.routes');
const movieRoutes = require('../routes/system/movie.routes');
const theaterRoutes = require('../routes/system/theater.routes');
const cloudinaryRoutes = require('../routes/cloudinary/cloudinary.routes');
const emailRoutes = require('../routes/send-email/email.routes');

router.use('/users', userRoutes);
router.use('/movies', movieRoutes);
router.use('/theaters', theaterRoutes);
router.use('/cloudinary', cloudinaryRoutes);
router.use('/email', emailRoutes);

router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', (req, res) => {
    const urlNew = `${req.protocol}://${req.get("host")}`
    console.log('Current URL:', urlNew)

    const existingServer = swaggerDocument.servers.find(item => item.url === urlNew)
    
    if (!existingServer) {
        swaggerDocument.servers.unshift({
            url: urlNew,
            description: "New server"
        })
    }

    return swaggerUi.setup(swaggerDocument, {
        swaggerOptions: {
            persistAuthorization: true
        }
    })(req, res)
});

module.exports = router;