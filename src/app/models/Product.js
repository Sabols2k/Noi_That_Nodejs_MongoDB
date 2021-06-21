const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const Schema = mongoose.Schema;

mongoose.plugin(slug);


const product = new Schema({
    product_id: {type: 'String', required: true, default: '12'},
    img: {type: 'String', maxLength: 255},
    name: {type: 'String', maxLength: 255},
    price: {type: 'String', maxLength: 255},
    tag: {type: 'String', maxLength: 255},
    slug: {type: 'String', slug: 'name', unique: true},
},{
    timestamps: true,
});

module.exports = mongoose.model('product',product);
