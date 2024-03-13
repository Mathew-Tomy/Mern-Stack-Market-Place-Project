const router = require('express').Router();
const authController = require('./controllers/authController');
const productController = require('./controllers/productController');
const userController = require('./controllers/userController');
const messageController = require('./controllers/messageController');
const categoryController = require('./controllers/categoryController');
const cityController = require('./controllers/cityController');
const isAuth = require('./middlewares/isAuth');

router.get('/', (req, res) => {
    res.send('Server is running')
})

router.use('/auth', authController);
router.use('/products', productController);
router.use('/user', userController);
router.use('/messages', messageController);
router.use('/category', categoryController);
router.use('/city', cityController);
module.exports = router;