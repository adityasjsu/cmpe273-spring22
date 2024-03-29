import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import { useParams } from 'react-router';
import { CContainer, CRow, CCol, CButton } from '@coreui/react';
import qlQuery from '../../graphQl/graphQlQuery';
import { create_Item } from '../../graphQl/mutation';
import { getProductBy_ID, getShopBy_Name } from '../../graphQl/queries';



const ItemPage = (props) => {

    const [item, setItem] = useState({});
    const [fav, setFav] = useState(false);
    const [shopName, setShopName] = useState("");
    const [sales, setSales] = useState(0);
    const { id } = useParams();
    const navigate = useNavigate();
    let [counter, setCounter] = useState(1);


    useEffect(() => {

        async function getItem() {

            // let response = axios.get("/api/items/"+ id);
            console.log("id", id);
            const data = {
                "product_ID": parseInt(id),

            }
            const { getProductByID } = await qlQuery(getProductBy_ID, data);
            if (getProductByID) {
                console.log("product", getProductByID);
            }
            // response = await response;

            setItem(getProductByID);
            console.log(getProductByID);
            // setItem(response.data);
            // console.log(response.data)
        }

        getItem();

    }, [setItem]);


    useEffect(() => {
        const a = async () => {
            const data = {
                "name": item.shopname,
            }
            const { getShopByName } = await qlQuery(getShopBy_Name, data);
            if (getShopByName) {
                setShopName(getShopByName.name);
                setSales(getShopByName.total_sales)
                console.log(getShopByName.name)
            }
        }; a();

        // axios.get("/api/shops/"+ item.shopname)
        //     .then(response => {
        //         setShopName(response.data.name);
        //         setSales(response.data.total_sales)
        //         console.log(response.data.name)
        //     });

        if (item.fav === "1") {
            setFav(true);
        }
        else {
            setFav(false);
        }

    })


    const handleFavorite = () => {

        const data = {
            fav: "1"
        }
            ;
        if (!localStorage.getItem('authToken')) {
            navigate("/login");
        }
        axios.defaults.headers.common['authorization'] = localStorage.getItem('authToken');
        axios.put("/api/items/fav/" + item.product_ID, data)
            .then(response => {
                setFav(true);
            })
            .catch(err => {
                console.log("authorization failed");
                //sessionStorage.removeItem("token");
                //sessionStorage.removeItem("shop");
                //  localStorage.removeItem("authToken");
                alert("authorization failed. Sign in again")
                navigate("/login");
            });
        console.log("Item Favorited");
        console.log("fav:", fav);
        window.location.reload(false);
    }

    const handleUnFav = () => {

        const data = {
            fav: "0"
        }
        if (!localStorage.getItem('authToken')) {
            navigate("/login");
        }
        axios.defaults.headers.common['authorization'] = localStorage.getItem('authToken');
        axios.put("/api/items/fav/" + item.product_ID, data)
            .then(response => {
                setFav(false);
            })
            .catch(err => {
                console.log("authorization failed");
                //sessionStorage.removeItem("token");
                //sessionStorage.removeItem("shop");
                //  localStorage.removeItem("authToken");
                alert("authorization failed. Sign in again")
                navigate("/login");
            });
        console.log("Item UnFavorited")
        window.location.reload(false);
    }

    const onNavigateShopPage = () => {
        navigate("/shop/" + item.shopname);
    }

    const handlePlus = () => {
        if (counter <= item.quantity)
            setCounter(counter++)
    }

    const handleMinus = () => {
        if (counter > 0)
            setCounter(counter--)
    }

    const handleAddToCart = async (e) => {


        const cartData = {
            "cartInput": {
                "cart_item_ID": parseInt(id),
                "image": item.image,
                "name": item.name,
                "shop": item.shopname,
                "quantity": counter,
                "stock": item.quantity,
                "price": item.price * counter,
                "email": sessionStorage.getItem("token"),
            }
        }
        const { createItem } = await qlQuery(create_Item, cartData);

        if (createItem) {
            console.log(createItem);
            console.log("Item Added to cart");
            console.log(cartData);
        }
        // axios.post("/api/cart/" , cartData)
        // .then(response => {
        //     console.log(response);
        //     console.log("Item Added to cart");
        //     console.log(cartData);
        // })


        // handleQuantityChange()
        navigate("/cart/");

    }



    return (
        <><div>
            {/* {seen ? <ShopPopup name="TESTING" toggle={handlePopup} /> : null} */}
            <br /><br /><br /><br /><br />
            <CContainer>

                <CRow className="justify-content-between">
                    <CCol ><img src={item.image} width={600} /></CCol>

                    <CCol xs={2}>




                    </CCol>

                    <CCol>

                        <h3><b>{item.name}</b></h3>

                        <br />
                        Seller:<button color='link' onClick={onNavigateShopPage}>{shopName}</button> Sales: {sales}


                        <br /><br />
                        Price <b>{localStorage.getItem("currency") + item.price}</b>

                        <br />
                        Description: <b>{item.description}</b>

                        <br /><br />
                        Stock: <b>{item.quantity > 0 ? item.quantity : "Out of Stock"}</b>

                        <br /><br />
                        {item.quantity > 0 ?

                            <><button variant='outline' onClick={handleMinus}>-</button><b>   {counter}   </b><button variant='outline' onClick={handlePlus}>+</button></>

                            : ""}

                        <br />
                        <br />
                        <br />

                        {item.quantity > 0 ?

                            <button onClick={handleAddToCart} color='' variant='outline' >Add to Cart: {localStorage.getItem("currency")}{item.price * counter}</button>

                            :

                            ""}
                        {fav ?

                            <button color='link' onClick={handleUnFav} >Add to Favorites</button>

                            :

                            <button color='link' onClick={handleFavorite} >Add to Favorites</button>

                        }
                    </CCol>
                </CRow>
            </CContainer>

        </div>
        </>
    )
}

export default ItemPage;
