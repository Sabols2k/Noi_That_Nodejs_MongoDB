// const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const Schema = mongoose.Schema;

mongoose.plugin(slug);

const admin = new Schema({
    email: {type: 'String', required: true,unique: true, default: '12'},
    username: {type: 'String',unique: true,},
    password: {type: 'String', maxLength: 255},
    passwordHash: {type: 'String', maxLength: 255},
    phoneNumber: {type: 'String', maxLength: 255},
    role:{type: 'String', maxLength: 255},
    firstname: {type: 'String', maxLength: 255},
    lastname: {type: 'String', maxLength: 255},
    age: {type: 'String', maxLength: 255},
    img: {type: 'String', maxLength: 255},
    slug: {type: 'String', slug: 'username'},
},{
    timestamps: true,
});
// unique: true : ở slug thì unique có tác dụng thêm chữ phía sau slug nếu slug đã bị trùng lặp

module.exports = mongoose.model('admin',admin);

// const Course = new Schema({
//     name: {type: 'String', required: true},
//     description: {type: 'String', maxLength: 600},
//     image: {type: 'String', maxLength: 255},
//     videoId: {type: 'String', maxLength: 255},
//     level: {type: 'String', maxLength: 255},
//     slug: {type: 'String', slug: 'name', unique: true},
// },{
//     timestamp: true,
// });

// module.exports = mongoose.model('Course',Course);



