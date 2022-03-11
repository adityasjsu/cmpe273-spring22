import React , {useEffect, useState} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Item from '../Item/Item';
import ItemList from '../Item/ItemList';
import { CContainer, CRow, CFooter } from '@coreui/react';

const Homepage = () => {

    const[items, setItems] = useState([])
   // console.log("qqqqqqq:",sessionStorage.getItem("shop") !== "undefined");
    // //const userShop = sessionStorage.getItem("shop");
    // if(sessionStorage.getItem("token")!=null && sessionStorage.getItem("token")!=="undefined")
    // {
    //     const welcomeText = "Welcome";
    // }
    const[currency,setCurrency] = useState(localStorage.getItem("currency"));
    const[country,setCountry] = useState(localStorage.getItem("country"));
  
    useEffect(() => {

        async function getItems() {
            let shop = axios.get("/api/shops/usershop/"+sessionStorage.getItem("token"));
            shop = await shop;

            let response = axios.get("/api/items/")
            response = await response;

            setItems(response.data.filter(item =>item.shopname != shop.data[0].name))
            
        }
        getItems();
    },[setItems]);


    // const handleCountryChange = (e) => {
    //     localStorage.setItem("country" , e.target.value);
    // }

    console.log("\n Inside Home Page")

    return(
        <div className='App'>
            <br/>
            <br/>             
            <h2>Welcome to Etsy</h2>


            <br/>

            <CContainer>
                <CRow xs={{ cols: 5 }}>
                    <ItemList items={items}/>
                </CRow>
            </CContainer>



        </div>
    )
}

export default Homepage;

