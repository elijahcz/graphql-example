const productsModel = require("./products.model");

module.exports = {
    Query: {
        products: (parent, args, context, info) => {
            return productsModel.getAllProducts();
        },
    }
};