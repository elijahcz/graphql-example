const products = [
    {
        id: "1",
        description: 'Red Shoe',
        price: 8.80,
        reviews: []
    },
    {
        id: "2",
        description: 'Blue Jeans',
        price: 19.90,
        reviews: []
    }
];

function getAllProducts() {
    return products;
}

function getProductById(id) {

    return products.find(item => item.id === id);
}

function getProductsByPriceRange(min, max) {

    return products.filter(product => product.price >= min && product.price <= max);
}

function addNewProduct(id, description, price) {
    const newProduct = {
        id: id,
        description: description,
        price: price,
        reviews: []
    };

    products.push(newProduct);

    return newProduct;
}

function addNewProductReview(productId, rating, comment) {
    const newProductReview = {
        rating: rating,
        comment: comment
    };

    const productFound = getProductById(productId);

    if(productFound) {
        productFound.reviews.push(newProductReview);        
    }
    
    return productFound;
} 

module.exports = {
    getAllProducts,
    getProductById,
    getProductsByPriceRange,
    addNewProduct,
    addNewProductReview
}