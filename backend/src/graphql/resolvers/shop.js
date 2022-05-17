const shopModel = require('../../models/shop.model');
const { UserInputError } = require('apollo-server');
// Encryption


module.exports = {
    Query: {
        getAllShops: async (_, args,) => {
            const shops = await shopModel.Shop.find({},);
            if (shops !== null) {
                console.log("fetched shops", shops.length);
                return shops;
            }
            else {
                console.log("Error while getting shops: ");
                throw new UserInputError("Error while getting shops: ");
            }
        },// end of getAllShops
        getShopByName: async (_, { name },) => {
            const shop = await shopModel.Shop.findOne({ name: name },);
            if (shop !== null) {
                console.log("fetched shop:", shop);
                return shop;
            }
            else {
                console.log("Error while getting shops: ");
                throw new UserInputError(`Couldn't find shop:${name}`);
            }

        }, // end of getShopByName
        getShopByUser: async (_, { email },) => {

            const shop = await shopModel.Shop.findOne({ email: email },);
            if (shop !== null) {
                console.log("fetched shop:", shop);
                return shop;
            }
            else {
                console.log("Error while getting shops: ");
                throw new UserInputError(`Couldn't find shop for user with email:${email}`);
            }
        },// end of getShopByUser
    },//end of Query
    Mutation: {
        createShop: async (_, { shopInput },) => {
            const shopData = new shopModel.Shop(shopInput);
            const existingShop = await shopModel.Shop.findOne({ name: shopInput.name },);
            if (existingShop) {
                throw new UserInputError(`Shopname '${shopInput.name}' is already taken.`);
            }
            else {
                const shop = await shopData.save();
                if (shop !== null) {
                    console.log("Shop Created", shop.name);
                    return {
                        name: shop.name,
                        email: shop.email,
                    };
                }
                else {
                    console.log(`error while creating shop with name:${shopInput.name}`);
                    throw new UserInputError(`error while creating shop with name:${shopInput.name}`);
                }
            }

        },//end of create shop
        updateShop: async (_, { shopInput },) => {
            const shopData = {
                total_sales: shopInput.total_sales,
                name: shopInput.name,
                image: shopInput.image
            }

            const shop = await shopModel.Shop.findOneAndUpdate({ name: shopInput.name }, shopData, { new: true },);
            if (shop !== null) {
                console.log("Shop updated", shop);
                return shop;
            }
            else {
                console.log("error");
                throw new UserInputError(`couldn't find shop: ${shopInput.name} to update`);
            }

        },// end of update shop
    },// end of mutation
};
