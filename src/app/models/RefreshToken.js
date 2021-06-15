// const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const refreshToken = new Schema({
    user: {type: 'String', required: true,unique: true, default: '12'},
    token: {type: 'String', maxLength: 255},
    expires: {type: 'Date', maxLength: 255},
    createdByIp: {type: 'String', maxLength: 255}

},{
    timestamps: true,
});
// unique: true : ở slug thì unique có tác dụng thêm chữ phía sau slug nếu slug đã bị trùng lặp

module.exports = mongoose.model('refreshToken',refreshToken);

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



