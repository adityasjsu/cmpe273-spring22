const productModel = require('../../models/item.model');
const { UserInputError } = require('apollo-server');
// Encryption


module.exports = {
    Query: {
        getAllProducts: async () => {
            const products = await productModel.Product.find({},);
            if (products !== null) {
                console.log("fetched products", products.length);
                return products;
            }
            else {
                console.log("Error while getting products: ");
                throw new UserInputError("Error while getting products: ");
            }
        },// end of getAllProducts
        getProductByShopName: async (_, { shopname },) => {
            const products = await productModel.Product.find({ shopname: shopname },);
            if (products !== null) {
                console.log("fetched product", products.length);
                return products;
            }
            else {
                console.log("Error while getting products: ");
                throw new UserInputError(`Error while getting product with shopname:${shopname}`);
            }
        },// end of getProductByShopName
        getProductByID: async (_, { product_ID },) => {
            const product = await productModel.Product.findOne({ product_ID: product_ID },);
            if (product !== null) {
                console.log("fetched product", product);
                return product;
            }
            else {
                console.log("Error while getting products: ");
                throw new UserInputError(`Error while getting product with id:${product_ID}`);
            }
        },// end of getProductByID
    },//end of Query
    Mutation: {
        createProduct: async (_, { productInput },) => {

            console.log("inside Product", productInput);
            const productData = new productModel.Product(productInput);
            const existingProduct = await productModel.Product.findOne({ product_ID: productInput.product_ID },);
            if (existingProduct) {
                throw new UserInputError(`Product with id '${productInput.product_ID}' already exist.`);
            }
            else {
                const product = await productData.save();
                if (product !== null) {
                    console.log("Product Created", product.name);
                    return {
                        name: product.name,
                        shopname: product.shopname,
                        product_ID: product.product_ID,
                    };
                }
                else {
                    console.log(`error while creating product with id:${productInput.product_ID
                        }`);
                    throw new UserInputError(`error while creating product with id:${productInput.product_ID
                        }`);
                }

            }

        }, // end of createProduct
        updateProduct: async (_, { product_ID, productInput },) => {

            const productD = {
                name: productInput.name,
                category: productInput.category,
                description: productInput.description,
                price: productInput.price,
                quantity: productInput.quantity,
                fav: productInput.fav,
                image: productInput.image
            }

            const product = await productModel.Product.findOneAndUpdate({ product_ID: product_ID }, productD, { new: true },);
            if (product !== null) {
                console.log("product updated", product);
                return product;
            }
            else {
                console.log("error");
                throw new UserInputError(`couldn't find product with ID: ${product_ID}`);
            }
        },// end of updateProduct
        updateProductQuantity: async (_, { product_ID, quantity },) => {

            const product = await productModel.Product.findOneAndUpdate({ product_ID: product_ID }, { quantity: quantity }, { new: true },);
            if (product !== null) {
                console.log("product quantity updated succesfully", product);
                return {
                    quantity: product.quantity
                };
            }
            else {
                console.log("error");
                throw new UserInputError(`couldn't find product with ID: ${product_ID}`);
            }
        },// end of updateProductQuantity
        deleteProduct: async (_, { product_ID },) => {

            const result = await productModel.Product.deleteOne({ product_ID: product_ID },);
            if (result && result.deletedCount === 1) {
                console.log("product deleted succesfully", result);
                return true
            }
            else {
                console.log("error");
                throw new UserInputError(`couldn't find product with ID: ${product_ID}`);
            }
        }, //end of deleteProduct
    },// end of mutation
};
