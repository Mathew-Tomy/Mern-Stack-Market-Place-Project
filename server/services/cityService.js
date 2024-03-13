const City = require('../models/City');
const User = require('../models/User');
const { cloudinary } = require('../config/cloudinary');
const { CLOUDINARY_STORAGE } = require('../config/config');

async function getAll() {
    return await City.paginate();
}

async function findByCity(city) {
    return await City.find({ city: city })
}

async function findById(id) {
    return await City.findById(id);
}

async function edit(id, data) {
    return await City.updateOne({ _id: id }, data);
}

async function create(data, userId) {
    let product = new City({...data})
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
    findByCity,
    findById,
    edit,
    userCollectionUpdate,
    findUserById
}
