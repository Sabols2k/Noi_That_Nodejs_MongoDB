const products = require('../../models/Product');
const bills = require('../../models/Bill');
const billdetail = require('../../models/BillDetail');
const users = require('../../models/User');
const {mongooseToObject} = require('../../../util/mongoose');
const {mutipleMongooseToObject,checkLoginForOption } = require('../../../util/mongoose');

class CheckoutController {

  async index(req, res, next) {
    var lst = checkLoginForOption(req.session)
    var user = await users.findById(req.session.userid)
    if(req.session.loggedIn){
      var email= user.email;
      var phone = user.phoneNumber;
      var name = user.firstname+ " "+user.lastname
    }
    else{
      email = "";
      phone="";
      name="";
    }
    // console.log(user.email);
    res.render('checkout',{
      loginAccount: lst[0],
      registerLogout: lst[1],
      infoAccount: lst[2],
      disabled: lst[3],
      infouser:{
        email: email,
        phone: phone,
        name: name
      },
     
    });
  }
  notfoud(req, res, next){
    res.send(404);
  }
  async create(req, res, next){

    const data = req.body[0];
    const databilldetail = req.body[1];
    console.log(databilldetail);
    if(req.session.loggedIn){
      // data.push({userId : req.session.userid})
      data.userId=req.session.userid
    // console.log(data[0]);
    // const data= { totalPrice: 7121000, userId: '60d0c935de7b0c6164530d19' }
      console.log(data);
      const bill = new bills(data);
      await bill.save()
      .then(bill => 
      { 
        // res.redirect('/home')
        // res.send("item saved to database");

        for (let index = 0; index < databilldetail.length; index++) {
          const formDataBillDetail = {
              productId: databilldetail[index].id,
              productName: databilldetail[index].name,
              billId: bill._id,
              price: databilldetail[index].price,
              quantity: databilldetail[index].quantity,
          }
          console.log("bill detail");
          console.log(formDataBillDetail);
          const billDetail = new billdetail(formDataBillDetail);
          // console.log("bill detail");

          
          billDetail.save()
        }
      })

      .catch(error =>{
        res.status(400).send("unable to save to database");
      });

    

    }
  }
  createBilldetail(req, res, next){
    const data = req.body[0];
    if(req.session.loggedIn){
      // data.push({userId : req.session.userid})
      data.userId=req.session.userid
      console.log(data);
      const bill = new bills(data);
      bill.save()
      .then(item => 
      { 
        res.redirect('/home')
        // res.send("item saved to database");
      })

      .catch(error =>{
        res.status(400).send("unable to save to database");
      });

    }
  }
}

module.exports = new CheckoutController();

// const courseController = require('./CourseController');
