const User = require('../../models/User')
const Product = require('../../models/Product')
const { multipleMongooseToObject, getQuantity, checkLoginForOption } = require('../../../util/mongoose.js')


class SearchController {

    async index(req, res, next) {

        const { query } = req.params
        var product = await Product.find({ "name": { $regex: ".*" + query + ".*" } })
        product = multipleMongooseToObject(product)

        res.render('search', {
            layout: 'main.hbs',
            css: "main.css",
            js: "search.js",
        })
    }

    async search(req, res, next) {
        const { query } = req.params
        var product = await Product.find({ "name": { $regex: ".*" + query + ".*" } })
        product = multipleMongooseToObject(product)
        if (product)
            res.send({ product: product })
    }

}


module.exports = new SearchController();
