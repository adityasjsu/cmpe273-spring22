import React , {useEffect, useState} from 'react';
import axios from 'axios';
import { CTable, CTableHead, CTableRow,CTableHeaderCell, CTableBody, CTableDataCell, CButton } from '@coreui/react';
import { useNavigate } from 'react-router';

const Cart = () => {
    const[cartItems,setCartItems] = useState([]);
    const[total, setTotal] = useState(0);
    const navigate = useNavigate();
    const[hasItems, setHasItems] = useState(false);

    useEffect(() => {

        async function getCart(){
            let response = await axios.get("/api/cart/byuser/" + sessionStorage.getItem("token"))
            response = await response;
    
            setCartItems(response.data)
            // await response.data.map(item => total = total + item.price);
            setTotal(response.data.reduce((a, v) => a + v.price, 0).toFixed(2));
            // await response.data.map(item => setTotal(total+item.price));

            console.log(total)
        }
        
        getCart()


    },[]);

    const handleCheckout = () => {
        
        const theRandomNumber = Math.floor(Math.random() * 99999999) + 1;
        const today = new Date().toString();

        cartItems.map(item => {

            

            let randomID = Math.floor(Math.random() * 99999) + 1;

            const data = {
                order_item_ID:randomID,
                order_ID:theRandomNumber,
                image:item.image,
                name:item.name,
                shop:item.shop,
                quantity:item.quantity,
                price:item.price,
                date_purc:today,
                total:total,
                email:sessionStorage.getItem("token")
            }

            axios.post("/api/orders/" , data)
            .then(response => {
                console.log("order response",response);
            })


            let quantity = {
                quantity:item.stock - data.quantity
            }

            axios.put("/api/items/stock/"+item.cart_item_ID , quantity)
            .then(response => {
                console.log("Stock Fixed")
                console.log(response);
            })



            // CREATE Total Order
        })

        axios.delete("/api/cart/" + sessionStorage.getItem("token"))

        navigate("/orders");
    }


    console.log("\n Inside Cart Page")

    return(
        <div className='App'>

            {console.log(cartItems)}
            <br/>
            <br/>               
            
            <h1>Your Product Cart</h1>
            <br/>  
            
                <><CTable>
                    <CTableHead >
                        <CTableRow>
                            <CTableHeaderCell scope="col">Product Image</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Product Name</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Quantity</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Price</CTableHeaderCell>
                        </CTableRow>
                    </CTableHead>
                    <CTableBody>

                        {cartItems.map(({ image, name, quantity, price }) => (

                            <CTableRow>
                                <CTableHeaderCell align={'middle'} scope="row"><img src={image} width={100} /></CTableHeaderCell>
                                <CTableDataCell align={'middle'}>{name}</CTableDataCell>
                                <CTableDataCell align={'middle'}>{quantity}</CTableDataCell>
                                <CTableDataCell align={'middle'}>{localStorage.getItem("currency")}{price}</CTableDataCell>
                            </CTableRow>
                        ))}
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

