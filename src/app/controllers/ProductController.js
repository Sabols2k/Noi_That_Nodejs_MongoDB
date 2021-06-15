const products = require('../models/Product');
const {mongooseToObject} = require('../../util/mongoose');
const {mutipleMongooseToObject} = require('../../util/mongoose');
class ProductController {

  index(req, res, next) {
    // res.render('products/create');
    products.find({})
      .then(product => res.render('products/show',{
        products: mutipleMongooseToObject(product)
      }))
      .catch(next);
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

  showuser(req, res, next) {

  }
  //[DELETE] /courses/:id
  destroy(req, res, next){
    products.deleteOne({_id: req.params.id})
      // .then(() => res.redirect('back'))
      .catch(next);
  }
}

module.exports = new ProductController();

// const courseController = require('./CourseController');
