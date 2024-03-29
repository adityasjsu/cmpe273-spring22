import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Item from '../Item/Item';
import ItemList from '../Item/ItemList';
import { CContainer, CRow, CFooter } from '@coreui/react';

const Homepage = () => {

    const [items, setItems] = useState([])
    const [currency, setCurrency] = useState(localStorage.getItem("currency"));
    const [country, setCountry] = useState(localStorage.getItem("country"));

    useEffect(() => {

        async function getItems() {
            let shop = axios.get("/api/shops/usershop/" + sessionStorage.getItem("token"));
            shop = await shop;

            let response = axios.get("/api/items/")
            response = await response;

            setItems(response.data.filter(item => item.shopname != shop.data.name))

        }
        getItems();
    }, [setItems]);


    console.log("\n Inside Home Page")

    return (
        <div className='App'>
            <br />
            <br />
            <h2>Welcome to Etsy</h2>


            <br />

            <CContainer>
                <CRow xs={{ cols: 5 }}>
                    <ItemList items={items} />
                </CRow>
            </CContainer>



        </div>
    )
}

export default Homepage;

