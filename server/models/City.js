const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const citySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: [3, 'name should be at least 1 characters long'],
        maxlength: [50, "name can't be more than 50 characters long"]
    }
});

citySchema.plugin(mongoosePaginate);

module.exports = mongoose.model('City', citySchema);
