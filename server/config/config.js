const TABLE_NAME = 'market_place';
const config = {
    PORT: process.env.PORT || 5000,
    DB_CONNECTION: `mongodb://localhost/${TABLE_NAME}`,
    // DB_CONNECTION: `mongodb+srv://iva2:iveto1234@cubicle.qzem5.mongodb.net/allForYou?retryWrites=true&w=majority`,
    SECRET: 'badumts',
    SALT: 10,
    COOKIE_NAME: 'USER_SESSION',
    CLOUDINARY_NAME: 'dym6r4jiz',
    CLOUDINARY_API_KEY: 621713157117422,
    CLOUDINARY_API_SECRET: 'RmC1YhPf4TldMGE8U1WwHqWD-jk',
    CLOUDINARY_STORAGE: 'pza5zln6'
}

module.exports = config;