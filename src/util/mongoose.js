module.exports = {
    mutipleMongooseToObject: function(mongooses){
        return mongooses.map(mongoose => mongoose.toObject());
    }, 
    mongooseToObject: function(mongoose){
        return mongoose ? mongoose.toObject() : mongoose;
    },
    checkLoginForOption: function (session) {
        lst = []
        if (session.loggedIn) {
            var loginAccount = `<a href="/account">Tài khoản</a>`
            var registerLogout = `<a href="/logout">Đăng xuất</a>`
        } else {
            var loginAccount = `<a href="/login">Đăng nhập</a>`
            var registerLogout = `<a href="/register">Đăng kí</a>`
        }

        return [loginAccount, registerLogout]
    }
};
