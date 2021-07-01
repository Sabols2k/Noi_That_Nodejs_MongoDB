
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
            var infoAccount = 
            `
            <div class="section-header">
                <div class="d-flex layout-flex">
                    <h2 class="section-title">
                        <i class="far fa-address-card hide-on-desktop"></i>
                        Thông tin nhận hàng 
                    </h2>
                    
                </div>
            </div>` ;
            var disabled = ` disabled `
            
        } else {
            var loginAccount = `<a href="/login">Đăng nhập</a>`
            var registerLogout = `<a href="/register">Đăng kí</a>`
            var infoAccount = `
            <div class="section-header">
                <div class="d-flex layout-flex">
                    <h2 class="section-title">
                        <i class="far fa-address-card hide-on-desktop"></i>
                        Thông tin nhận hàng
                    </h2>
                    <a href="/login">
                        <i class="far fa-user-circle"></i>
                        <span>Đăng nhập</span>
                    </a>
                </div>
            </div>` ;
            var disabled = ` `
        }

        return [loginAccount, registerLogout,infoAccount, disabled]
    }
    
};
