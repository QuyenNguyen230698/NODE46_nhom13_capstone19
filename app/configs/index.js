require('dotenv').config();

module.exports = {
  port: process.env.PORT || 4000,
  mongoUri: process.env.MONGO_URI,
  jwtSecret: process.env.JWT_SECRET,
  refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,
  tokenExpiration: process.env.TOKEN_EXPIRATION || '15m',
  refreshTokenExpiration: process.env.REFRESH_TOKEN_EXPIRATION || '7d',
};
