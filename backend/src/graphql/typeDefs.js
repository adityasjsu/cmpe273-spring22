const { gql } = require('apollo-server');

module.exports = gql`
type User{
    _id: ID
    email: String!
    name:  String!
    password: String
    about: String
    city: String
    dob: String
    address: String
    country: String
    phone_no: String
    image: String
    message: String
}

input userInput{
    email: String!
    name:  String
    password: String
    image: String
    about: String
    city: String
    dob: String
    address: String
    country: String
    phone_no: String
    id: ID
}

 type LoggedUser {
    _id: ID!
    email: String!
    token: String!
  }

type Shop{
    name: String!
    email: String!
    total_sales: Int
    image: String
}

input shopInput{
    name: String!
    email: String
    total_sales: Int
    image: String
}

type Order{
    order_item_ID: Int!
    order_ID: Int!
    name: String!
    total: Int!
    price: Int!
    quantity: Int!
    email: String!
    shop: String!
    date_purc: String!
    image: String
    gift: String
    giftDesc: String
}

input orderInput{
    order_item_ID: Int!
    order_ID: Int!
    name: String!
    total: Int!
    price: Int!
    quantity: Int!
    email: String!
    shop: String!
    date_purc: String!
    image: String
    gift: String
    giftDesc: String
}

type Product{
    product_ID: Int!
    name:String!
    category:String!
    description:String!
    price: Int!
    quantity: Int!
    fav: String!
    shopname: String!
    image: String
}

input productInput{
    product_ID: Int
    name:String!
    category:String!
    description:String!
    price: Int!
    quantity: Int!
    fav: String!
    shopname: String
    image: String
}
type Cart{
    cart_item_ID: Int!
    name: String!
    stock: Int!
    price: Int!
    quantity: Int!
    email: String!
    shop: String!
    image: String
    gift: String
    giftDesc: String
}

input cartInput{
    cart_item_ID: Int!
    name: String!
    stock: Int!
    price: Int!
    quantity: Int!
    email: String!
    shop: String!
    image: String
    gift: String
    giftDesc: String
}
type Query{
    getUserByEmail(email: String!):User!
    getAllShops:[Shop!]!
    getShopByUser(email: String!):Shop!
    getShopByName(name: String!):Shop!
    getOrdersByEmail(email: String!): [Order!]!
    getAllProducts:[Product!]!
    getProductByID(product_ID: Int!): Product!
    getProductByShopName(shopname: String!): [Product!]!
    getItemByEmail(email: String!): [Cart!]!


}

type Mutation{
    login(email: String!, password:String!): LoggedUser!   
    createUser(userInput:userInput!): User!
    updateProfile(userInput:userInput): User!
    createShop(shopInput:shopInput!): Shop!
    updateShop(shopInput:shopInput!): Shop!
    createOrderItem(orderInput:orderInput!): Order!
    createProduct(productInput: productInput!): Product!
    updateProduct(product_ID: Int!, productInput: productInput!): Product!
    updateProductQuantity(product_ID: Int!, quantity: Int!) : Product!
    deleteProduct(product_ID: Int!): Boolean!
    createItem(cartInput: cartInput!): Cart!
    deleteItem(email: String!): Boolean!
}
`