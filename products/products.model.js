const products = [
    {
        id: 1,
        description: 'Red Shoe',
        price: 8.80,
    },
    {
        id: 2,
        description: 'Blue Jeans',
        price: 19.90,
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

module.exports = {
    getAllProducts,
    getProductById,
    getProductsByPriceRange
}