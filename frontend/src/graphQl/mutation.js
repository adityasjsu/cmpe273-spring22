export const create_User = `mutation _($userInput:userInput!){createUser(userInput:$userInput){email,_id,}}`
export const User_Login = `mutation _login($email: String!, $password: String!)
{login(email:$email,password:$password){token,}}`
export const update_Profile = `mutation _updateProfile($userInput:userInput!)
{updateProfile(userInput:$userInput){email,_id,message}}`
export const create_Shop = `mutation _($shopInput:shopInput!){createShop(shopInput:$shopInput){email,name,}}`
export const update_Shop = `mutation _($shopInput:shopInput!)
{updateShop(shopInput:$shopInput){email,name,total_sales,}}`
export const create_Product = `mutation _($productInput:productInput!)
{createProduct(productInput:$productInput){product_ID,name,shopname,}}`
export const update_Product = `mutation _($product_ID:Int!,$productInput:productInput!)
{updateProduct(product_ID:$product_ID,productInput:$productInput){product_ID,name,shopname,quantity,}}`
export const update_ProductQuantity = `mutation _($product_ID:Int!,$quantity:Int!)
{updateProductQuantity(product_ID:$product_ID,quantity:$quantity){quantity,}}`
export const delete_Product = `mutation _($product_ID:Int!){deleteProduct(product_ID:$product_ID,)}`
export const create_Item = `mutation _($cartInput:cartInput!){createItem(cartInput:$cartInput){cart_item_ID,email,}}`
export const delete_Item = `mutation _($email:String!){deleteItem(email:$email)}`
export const create_OrderItem = `mutation _($orderInput:orderInput!){createOrderItem
    (orderInput:$orderInput){order_item_ID,order_ID,name,shop,email,}}`
