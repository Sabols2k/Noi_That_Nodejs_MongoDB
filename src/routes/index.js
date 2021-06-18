
const meRouter = require('./me');
const adminRouter = require('./admin/admin');
const adminloginRouter = require('./admin/login');
const adminlogoutRouter = require('./admin/logout');
const productRouter = require('./product');

function route(app) {

  app.use('/product', productRouter);
  app.use('/admin', adminRouter);
  app.use('/admin/login', adminloginRouter);
  app.use('/admin/logout', adminlogoutRouter);
  app.use('/me', meRouter);
  app.use('/', productRouter)
}
module.exports = route;
