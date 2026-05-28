const orders = [
    {
        date: "2026-05-01",
        subtotal: 48.60,
        items: [
            {
                product: {
                    id: 1,
                    description: 'Red Shoe',
                    price: 8.80,                
                }, 
                quantity: 1
            },
            {
                product: {
                    id: 2,
                    description: 'Blue Jeans',
                    price: 19.90
                }, 
                quantity: 2
            },
        ]
    },
];

function getAllOrders() {
    return orders;
}

module.exports = {
    getAllOrders
}