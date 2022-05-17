import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { CTable, CTableHead, CModalBody, CFormInput, CTableRow, CTableHeaderCell, CFormCheck, CTableBody, CTableDataCell, CButton } from '@coreui/react';
import { useNavigate } from 'react-router';
import qlQuery from '../../graphQl/graphQlQuery';
import { delete_Item, create_OrderItem, update_ProductQuantity } from '../../graphQl/mutation';
import { getItemBy_Email } from '../../graphQl/queries';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();
  const [hasItems, setHasItems] = useState(false);
  const [visibleGiftDesc, setVisibleGiftDesc] = useState(false);


  function useForceUpdate() {
    const [value, setValue] = useState(0);
    return () => setValue((value) => value + 1);
  }
  const forceUpdate = useForceUpdate();
  useEffect(() => {

    async function getCart() {
      const data = {
        "email": sessionStorage.getItem("token"),
      };
      const { getItemByEmail } = await qlQuery(getItemBy_Email, data);

      setCartItems(getItemByEmail);
      setTotal(getItemByEmail.reduce((a, v) => a + v.price, 0).toFixed(2));
      console.log(total);
      // let response = await axios.get("/api/cart/byuser/" + sessionStorage.getItem("token"))
      // response = await response;

      // setCartItems(response.data)
      // await response.data.map(item => total = total + item.price);
      // setTotal(response.data.reduce((a, v) => a + v.price, 0).toFixed(2));
      // await response.data.map(item => setTotal(total+item.price));

      // console.log(total);
    }

    getCart()


  }, []);


  const handleCheckout = async () => {

    const theRandomNumber = Math.floor(Math.random() * 99999999) + 1;
    const today = new Date().toString();

    cartItems.map(async (item) => {

      if (item.price > 0) {

        let randomID = Math.floor(Math.random() * 99999) + 1;

        const data = {
          "orderInput": {
            "order_item_ID": randomID,
            "order_ID": theRandomNumber,
            "image": item.image,
            "name": item.name,
            "shop": item.shop,
            "quantity": item.quantity,
            "price": item.price,
            "date_purc": today,
            "total": total,
            "gift": item.gift,
            "email": sessionStorage.getItem("token")
          }
        }

        if (item.giftDesc && item.giftDesc.length > 0) {
          data.orderInput.giftDesc = item.giftDesc;
        }
        const { createOrderItem } = await qlQuery(create_OrderItem, data);
        console.log("order response", createOrderItem);
        // axios.post("/api/orders/", data)
        //   .then(response => {
        //     console.log("order response", response);
        //   })


        let quantityData = {
          "quantity": item.stock - data.quantity,
          "product_ID": item.cart_item_ID,
        }

        const { updateProductQuantity } = await qlQuery(update_ProductQuantity, quantityData);
        console.log("Stock fixed");
        console.log(updateProductQuantity);
        // axios.put("/api/items/stock/" + item.cart_item_ID, quantity)
        //   .then(response => {
        //     console.log("Stock Fixed")
        //     console.log(response);
        //   })



        // CREATE Total Order
      }
    })
    const data = {
      "email": sessionStorage.getItem("token"),
    }
    const { deleteItem } = await qlQuery(delete_Item, data);
    console.log(deleteItem);
    // axios.delete("/api/cart/" + sessionStorage.getItem("token"))

    navigate("/orders");
  }

  console.log("\n Inside Cart Page")

  return (
    <div className='App'>

      {console.log(cartItems)}
      <br />
      <br />

      <h1>Your Product Cart</h1>
      <br />

      <><CTable>
        <CTableHead >
          <CTableRow>
            <CTableHeaderCell scope="col">Product Image</CTableHeaderCell>
            <CTableHeaderCell scope="col">Product Name</CTableHeaderCell>
            <CTableHeaderCell scope="col">Quantity</CTableHeaderCell>
            <CTableHeaderCell scope="col">Price</CTableHeaderCell>
            <CTableHeaderCell scope="col"></CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>

          {cartItems.map((item) => (


            <CTableRow>
              <CTableHeaderCell align={'middle'} scope="row"><img src={item.image} width={100} />
                <CFormCheck onChange={() => {
                  item.gift = item.gift === '0' ? '1' : '0';
                  console.log("gift toggle :", item.gift);
                  if (item.gift === '0') {
                    if (item.giftDesc) {
                      item.giftDesc = null;
                    }
                  }
                  const index = cartItems ? cartItems.findIndex(
                    (cartItem) => cartItem._id === item._id
                  )
                    : null;
                  console.log("index to update is " + index)
                  //cartItems[index] = item;
                  let t = cartItems
                  t[index] = item;
                  setCartItems(t);
                  forceUpdate();
                }} id="flexCheckDefault" label="Gift Wrap" />
                {item.gift !== '0' ? <CModalBody>

                  <CFormInput size='sm' type='text' placeholder='Add Gift Description Here' onChange={(e) => {
                    item.giftDesc = e.target.value;
                    console.log("gift description :", item.giftDesc);
                    const index = cartItems ? cartItems.findIndex(
                      (cartItem) => cartItem._id === item._id
                    )
                      : null;
                    console.log("index to update is " + index)
                    //cartItems[index] = item;
                    let t = cartItems
                    t[index] = item;
                    setCartItems(t);
                    forceUpdate();
                  }}></CFormInput>
                </CModalBody> : ""}
              </CTableHeaderCell>

              <CTableDataCell align={'middle'}>{item.name}</CTableDataCell>
              <CTableDataCell align={'middle'}>
                <button variant='outline' type="button" onClick={() => {
                  const a = item.quantity;
                  item.quantity = parseInt(item.quantity) - 1;
                  console.log(
                    "item quantity is : " + item.quantity
                  );
                  item.price = (item.price - (item.price / a)) >= 0 ? item.price - (item.price / a) : 0;
                  console.log("item price", item.price);
                  console.log(
                    "cart object is : " + JSON.stringify(cartItems)
                  );
                  if (item.quantity === 0) {
                    let t = cartItems;
                    const index = t
                      ? t.findIndex(
                        (cartItem) => cartItem._id === item._id
                      )
                      : 0;
                    console.log("index:", index, t);
                    t.splice(index, 1);
                    setCartItems(t);
                    setTotal(t.reduce((a, v) => a + v.price, 0).toFixed(2));
                    forceUpdate();
                  }
                  else {
                    const index = cartItems
                      ? cartItems.findIndex(
                        (cartItem) => cartItem._id === item._id
                      )
                      : 0;
                    console.log("index to update is " + index)
                    //cartItems[index] = item;
                    let t = cartItems
                    t[index] = item;
                    setCartItems(t);
                    setTotal(t.reduce((a, v) => a + v.price, 0).toFixed(2));
                    // forceUpdate();
                    console.log(
                      "cart object is : " + JSON.stringify(cartItems)
                    );
                  }
                }}>-</button>
                <input
                  type="text"
                  name="quant[1]"
                  value={item.quantity}
                  min="0"
                  max="5"
                  readonly
                ></input>
                {/* <span >{"Quantity : " + item.quantity + " "}  </span> */}
                <button
                  variant='outline'
                  type="button"
                  onClick={() => {
                    const a = item.quantity;
                    item.quantity = parseInt(item.quantity) + 1;
                    console.log(
                      "item quantity is : " + item.quantity
                    );
                    item.price = item.price + (item.price / a);
                    console.log("item price", item.price);

                    console.log(
                      "cart object is : " + JSON.stringify(cartItems)
                    );
                    const index = cartItems
                      ? cartItems.findIndex(
                        (cartItem) => cartItem._id === item._id
                      )
                      : 0;
                    console.log("index to update is " + index)
                    //cartItems[index] = item;
                    let t = cartItems
                    t[index] = item;
                    setCartItems(t);
                    setTotal(t.reduce((a, v) => a + v.price, 0).toFixed(2));
                    //forceUpdate();
                    console.log(
                      "cart object is 1 : " + JSON.stringify(cartItems)
                    );
                    // cartItems
                    //setCartItems(cartItems);
                  }}
                >+</button>
              </CTableDataCell>
              <CTableDataCell align={'middle'}>{localStorage.getItem("currency")}{item.price}</CTableDataCell>
              <CTableDataCell align={'middle'}><button onClick={() => {
                let t = cartItems;
                const index = t
                  ? t.findIndex(
                    (cartItem) => cartItem._id === item._id
                  )
                  : 0;
                console.log("index:", index, t);
                t.splice(index, 1);
                setCartItems(t);
                setTotal(t.reduce((a, v) => a + v.price, 0).toFixed(2));
                forceUpdate();
              }}>X</button></CTableDataCell>
            </CTableRow>
          ))
          }
        </CTableBody>


      </CTable><br /><br /><br /></>
      <div>
        <button size="lg" variant="outline" color='' onClick={handleCheckout}>Total: {localStorage.getItem("currency")}{total}
          <br>
          </br>Checkout</button>
        <br></br>
      </div>

      {/* :

                    <><br /><br /><br /><br /><h2>No Items in your cart</h2></>
            } */}




    </div>
  )
}

export default Cart;

