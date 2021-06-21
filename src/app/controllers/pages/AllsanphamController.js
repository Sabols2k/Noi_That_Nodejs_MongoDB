const products = require('../../models/Product');
const {mongooseToObject} = require('../../../util/mongoose');
const {mutipleMongooseToObject} = require('../../../util/mongoose');

class AllsanphamController {

  index(req, res, next) {
    // res.render('products/create');
    // products.find({})
    //   .then(product => res.render('products/show',{
    //     products: mutipleMongooseToObject(product)
    //   }))
    //   .catch(next);
    console.log(req.session)
    let perPage = 2;
    let page = req.params.page || 1; 
    products
    .find() // find tất cả các data
    .skip((perPage * page) - perPage) // Trong page đầu tiên sẽ bỏ qua giá trị là 0
    .limit(perPage)
    .exec((err, product) => {
      products.countDocuments((err, count) => { // đếm để tính có bao nhiêu trang
        if (err) return next(err);
        //  res.send(products1) // Trả về dữ liệu các sản phẩm theo định dạng như JSON, XML,...
        console.log(products);
        res.render('products/show', {
          products: mutipleMongooseToObject(product) , // sản phẩm trên một page
          current: page, // page hiện tại
          pages: Math.ceil(count / perPage), // tổng số các page
          
          
        });
      });
    });
  }

  allsp(req, res, next){
    res.render('all-sanpham')
  }
  notfoud(req, res, next){
    res.send(404);
  }
  //[GET] /courses/:slug
  show(req, res, next) {
    products.find({}, function (err, product) {
      if(!err) {
        res.json(product)
      } else{
        res.status(400).json({error: "ERROR"});
      }
    })
  }

  //[POST] /courses/create
  create(req, res, next) {
    res.render('products/create');
  }

  //[POST] /courses/store
  store(req, res, next) {
    const data = req.body;
    // console.log(formData);
    // res.redirect(`/`);
    // const data = {
    //   "username":"sabols2k11",
    //   "password":"123456",
    //   "name":"chaudd",
    //   "age":"21",
    //   "img":"aaaa",
    // };
  
    const product = new products(data);
     
    // product.save(function (err) {
    //   console.log(err);
    // }).then(() => res.redirect(`/`));

    // res.redirect('http://localhost:3001/zestreact/app/product/dashboard')

    product.save()
    .then(item => 
    { 
      res.redirect('show')
      // res.send("item saved to database");
    })

    .catch(error =>{
      res.status(400).send("unable to save to database");
    });
    // res.json(data);
    
      
     
  }
  //[GET] /courses/:id/edit
  edit(req, res, next) {
    // Course.findById(req.params.id)
    //   .then(course => res.render('courses/edit', {
    //     course: mongooseToObject(course)
    //   }))
    //   .catch(next);
  }

  //[PUT] /courses/:id
  update(req, res, next) {
    // res.json(req.body);
    // Course.updateOne({_id: req.params.id}, req.body)
    //   .then(()=> res.redirect('/me/stored/courses/'))
    //   .catch(next); 

    res.send('New Detail!!!');
  }

  page(req, res, next){
    let perPage = 2;
    let page = req.params.page || 1; 
    products
    .find() // find tất cả các data
    .skip((perPage * page) - perPage) // Trong page đầu tiên sẽ bỏ qua giá trị là 0
    .limit(perPage)
    .exec((err, product) => {
      products.countDocuments((err, count) => { // đếm để tính có bao nhiêu trang
        if (err) return next(err);
        //  res.send(products1) // Trả về dữ liệu các sản phẩm theo định dạng như JSON, XML,...
        console.log(products);
        res.render('products/show', {
          products: mutipleMongooseToObject(product) , // sản phẩm trên một page
          current: page, // page hiện tại
          pages: Math.ceil(count / perPage), // tổng số các page
          
          
        });
      });
    });
  }
  //[DELETE] /courses/:id
  destroy(req, res, next){  
    products.deleteOne({_id: req.params.id})
      // .then(() => res.redirect('back'))
      .catch(next);
  }

  upload(req, res, next){
    res.render('products/testuploadfile')
  }
  uploadfile(req, res, next){

  }

}

module.exports = new AllsanphamController();

// const courseController = require('./CourseController');
