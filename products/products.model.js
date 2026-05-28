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

function getProductsByPriceRange(min, max) {
    return products.filter((product) => {
        return product.price >= min && product.price <= max;
    });
}

module.exports = {
    getAllProducts,
    getProductsByPriceRange
}