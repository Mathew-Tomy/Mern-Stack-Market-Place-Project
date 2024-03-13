const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const categorySchema = new mongoose.Schema({
    title: {
        type: String,
        required: ['Title is required'],
        trim: true,
        minlength: [3, 'Title should be at least 3 characters long'],
        maxlength: [50, "Title can't be more than 50 characters long"]
    }
});

categorySchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Categories', categorySchema);
