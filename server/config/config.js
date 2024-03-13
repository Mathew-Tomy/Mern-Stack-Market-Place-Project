const TABLE_NAME = 'market_place';
const config = {
    PORT: process.env.PORT || 5000,
    DB_CONNECTION: `mongodb://localhost/${TABLE_NAME}`,
    SECRET: '',
    SALT: 10,
    COOKIE_NAME: 'USER_SESSION',
    CLOUDINARY_NAME: '',
    CLOUDINARY_API_KEY: ,
    CLOUDINARY_API_SECRET: '',
    CLOUDINARY_STORAGE: ''
}

module.exports = config;
