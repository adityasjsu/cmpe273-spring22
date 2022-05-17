const orderModel = require('../../models/order.model');
const { UserInputError } = require('apollo-server');
// Encryption


module.exports = {
    Query: {
        getOrdersByEmail: async (_, { email },) => {

            const orders = await orderModel.Order.find({ email: email },);
            if (orders !== null) {
                console.log("fetched ordered items:", orders.length);
                return orders;
            }
            else {
                console.log("Error while getting order items: ");
                throw new UserInputError(`Couldn't find order items for user with email:${email}`);
            }
        }// end of getOrdersByEmail
    },//end of Query
    Mutation: {
        createOrderItem: async (_, { orderInput }, context) => {
            const orderData = new orderModel.Order(orderInput);
            const existingOrder = await orderModel.Order.findOne({ order_item_ID: orderInput.order_item_ID },);
            if (existingOrder) {
                throw new UserInputError(`Order with id '${orderInput.order_item_ID}' already exist.`);
            }
            else {
                const order = await orderData.save();
                if (order !== null) {
                    console.log("Order Created", order.name);
                    return {
                        name: order.name,
                        email: order.email,
                        order_item_ID: order.order_item_ID,
                        order_ID: order.order_ID,
                        shop: order.shop,
                    };
                }
                else {
                    console.log(`error while creating order with id:${orderInput.order_item_ID}`);
                    throw new UserInputError(`error while creating order with id:${orderInput.order_item_ID}`);
                }
            }

        },// end of createOrderItem
    },// end of mutation
};
