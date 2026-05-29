const productsModel = require("./products.model");

module.exports = {
    Query: {
        products: (parent, args, context, info) => {
            return productsModel.getAllProducts();
        },
        product: (parent, args, context, info) => {
            return productsModel.getProductById(args.id);
        },
        productsByPrice: (parent, args, context, info) => {
            return productsModel.getProductsByPriceRange(args.min, args.max);
        }
    },
    Mutation: {
        addNewProduct: (parent, args, context, info) => {
            return productsModel.addNewProduct(args.id, args.description, args.price);
        },
        addNewProductReview: (_, args) => {
            return productsModel.addNewProductReview(args.productId, args.rating, args.comment);
        }
    }
};