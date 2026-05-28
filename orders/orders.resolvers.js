const ordersModel = require('./orders.model')

module.exports = {
    Query: {
        orders: (parent, args, context, info) => {
            return ordersModel.getAllOrders();
        }
    }
};