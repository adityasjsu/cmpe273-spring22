const cartModel = require('../../models/cart.model');
const { UserInputError } = require('apollo-server');
// Encryption


module.exports = {
    Query: {
        getItemByEmail: async (_, { email },) => {
            console.log("email1:", email);
            const carts = await cartModel.Cart.find({ email: email },);
            if (carts !== null) {
                console.log("fetched cart items:", carts.length);
                return carts;
            }
            else {
                console.log("Error while getting cart items: ");
                throw new UserInputError(`Couldn't find cart items for user with email:${email}`);
            }
        },// end of getItemByEmail
    },//end of Query
    Mutation: {
        createItem: async (_, { cartInput },) => {
            const cartData = new cartModel.Cart(cartInput);
            const existingCart = await cartModel.Cart.findOne({ cart_item_ID: cartInput.cart_item_ID },);
            if (existingCart) {
                throw new UserInputError(`Cart with id '${cartInput.cart_item_ID}' already exist.`);
            }
            else {
                const cart = await cartData.save();
                if (cart !== null) {
                    console.log("Cart Created", cart.cart_item_ID);
                    return {
                        shop: cart.shop,
                        cart_item_ID: cart.cart_item_ID,
                        email: cart.email,
                    };
                }
                else {
                    console.log(`error while creating cart with id:${cartInput.cart_item_ID}`);
                    throw new UserInputError(`error while creating cart with id:${cartInput.cart_item_ID}`);
                }
            }

        },// end of createItem
        deleteItem: async (_, { email },) => {

            const result = await cartModel.Cart.deleteMany({ email: email },);
            if (result && result.deletedCount > 0) {
                console.log("cart deleted succesfully", result);
                return true
            }
            else {
                console.log("error");
                throw new UserInputError(`couldn't find any cart item for user with email: ${email}`);
            }
        }, // end of deleteItem
    },// end of mutation
};
