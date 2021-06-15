
const meRouter = require('./me');
const adminRouter = require('./admin');
const productRouter = require('./product');

function route(app) {

  app.use('/product', productRouter);
  app.use('/admin', adminRouter);
  app.use('/me', meRouter);
  app.use('/', productRouter)
}
module.exports = route;
