const User = require('../../models/User')
const Product = require('../../models/Product')
const { mutipleMongooseToObject, getQuantity, checkLoginForOption } = require('../../../util/mongoose.js')


class SearchController {

    async index(req, res, next) {

        const { query } = req.params
        console.log({ query });
        var product = await Product.find({ "name": { $regex: ".*" + query + ".*" } })
        product = mutipleMongooseToObject(product)

        res.render('search', {
            layout: 'main.hbs',
            js: "search.js",
            product: product,
        })
    }

    async search(req, res, next) {
        const { query } = req.params
        var product = await Product.find({ "name": { $regex: ".*" + query + ".*" } })
        product = mutipleMongooseToObject(product)
        if (product)
            res.send({ product: product })
    }

}


module.exports = new SearchController();
