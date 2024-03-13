const Category = require('../models/Categories');
const User = require('../models/User');
const { cloudinary } = require('../config/cloudinary');
const { CLOUDINARY_STORAGE } = require('../config/config');

async function getAll() {
    return await Category.paginate();
}

async function findByCategory(category) {
    return await Category.find({ category: category })
}

async function findById(id) {
    return await Category.findById(id);
}

async function edit(id, data) {
    return await Category.updateOne({ _id: id }, data);
}

async function create(data, userId) {
    let product = new Category({...data})
    await product.save();

    return await User.updateOne({ _id: userId }, { $push: { createdSells: product } });
}



async function userCollectionUpdate(userId, product) {
    return await User.updateOne({ _id: userId }, { $push: { createdSells: product } });
}

async function findUserById(id) {
    return await User.findById(id);
}

module.exports = {
    create,
    getAll,
    findByCategory,
    findById,
    edit,
   
    userCollectionUpdate,
    findUserById
}
