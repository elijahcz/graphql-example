const productsModel = require("./products.model");

module.exports = {
    Query: {
        products: (parent, args, context, info) => {
            return productsModel.getAllProducts();
        },
        productById: (parent, args, context, info) => {
            return productsModel.getProductById(args.id);
        },
        productsByPrice: (parent, args, context, info) => {
            return productsModel.getProductsByPriceRange(args.min, args.max);
        }
    }
};