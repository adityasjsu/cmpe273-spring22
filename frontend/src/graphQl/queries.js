export const getUserBy_Email = `query _($email: String!){getUserByEmail(email: $email){_id,email,city,}}`
export const getAll_Shops = `query _{getAllShops{name,email,image,total_sales,}}`
export const getShopBy_Name = `query _($name:String!){getShopByName(name:$name){name,email,image,total_sales,}}`
export const getShopBy_User = `query _($email:String!){getShopByUser(email:$email){name,email,image,total_sales,}}`
export const getProductBy_ShopName = `query _($shopname: String!){getProductByShopName(shopname: $shopname)
{name,shopname,image,quantity,price,}}`
export const getProductBy_ID = `query _($product_ID: Int!){getProductByID(product_ID: $product_ID)
{product_ID,name,category,description,price,quantity,fav,shopname,image,}}`
export const getItemBy_Email = `query _($email: String!){getItemByEmail(email: $email)
{cart_item_ID,name,stock,price,quantity,email,shop,image,gift,giftDesc,}}`
export const getOrdersBy_Email = `query _($email: String!){getOrdersByEmail(email:$email)
{email,order_ID,order_item_ID,shop,name,total,price,quantity,date_purc,image,gift,giftDesc,}}`


