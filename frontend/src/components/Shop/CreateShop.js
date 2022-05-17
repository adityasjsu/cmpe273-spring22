import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router';
import qlQuery from '../../graphQl/graphQlQuery';
import { create_Shop } from '../../graphQl/mutation';
import { getAll_Shops } from '../../graphQl/queries';
//import { CInput, CButton } from '@coreui/react';
//import { Button } from 'react-bootstrap';

const CreateShop = () => {
    const [name, setName] = useState("");
    const [available, setAvailability] = useState();
    const [created, setCreated] = useState();
    const [shops, setShops] = useState([]);
    const [note, setNote] = useState("");
    const [shopID, setShopID] = useState("");
    const navigate = useNavigate();

    useEffect(() => {

        const a = async () => {
            const { getAllShops } = await qlQuery(getAll_Shops);
            if (getAllShops) {
                setShops(getAllShops);
                console.log(shops);
            }
        }; a();

        // axios.get("/api/shops/")
        // .then((response) => {
        //     if(response){
        //         setShops(response.data);
        //         console.log(shops);
        //     }
        // });

    }, []);


    const handleNameChange = (e) => {
        setName(e.target.value)

    }

    const handleAvailabiliy = () => {

        if (shops.find(c => c.name == name)) {
            setAvailability(false);
            setNote("Choose another name");
        }
        else {
            setAvailability(true);
        }
        console.log("Availability:", available);

    }

    const handleSubmit = async () => {

        //  var theRandomNumber = Math.floor(Math.random() * 999) + 1;

        // const data= {
        //     email:sessionStorage.getItem("token"),
        //    // shop_ID:theRandomNumber,
        //     name: name,
        //     total_sales:0,
        //     image:"/no-shop.jpeg"
        // }
        const data = {
            "shopInput": {
                "email": sessionStorage.getItem("token"),
                "name": name,
                "image": "/no-shop.jpeg",
                "total_sales": 0,
            }
        }
        if (available) {
            const { createShop } = await qlQuery(create_Shop, data);
            console.log(createShop);
            if (createShop) {
                setCreated(true);
                sessionStorage.setItem("shop", createShop.name);
                console.log("Shop Created", createShop.name)
                setShopID(createShop.name)
                navigate("/shop/" + createShop.name);
            }
            else {
                console.log(createShop);
            }
            // axios.post("/api/shops", data)
            //     .then(response => {
            //         console.log(response);
            //         if (response.status === 200) {
            //             //setShop(data.shop_ID)
            //             setCreated(true);
            //             sessionStorage.setItem("shop", data.name);
            //             console.log("Shop Created", data.name)
            //             setShopID(data.name)
            //             navigate("/shop/" + data.name);
            //         }
            //         else {
            //             console.log(response);
            //         }
            //     })
        }
    }

    // let redirectVar = null;
    // if(created === true){
    //     redirectVar = <Navigate to= "/shop/" ${shopID}>
    // }
    let navigateVar = null;
    const shopName = sessionStorage.getItem("shop");
    if (shopName != null && shopName !== "undefined") {
        navigateVar = <Navigate to={"/shop/" + shopName} />
    }

    return (

        <><div className='App'>
            {navigateVar}
            <br />
            <br />
            <br />
            <br />

            <br /><h2>Name your Shop</h2>

            <br /><h4 style={{ color: "blue" }}>Choose a unique name that reflects your style</h4>

            <br />
            <br />
            <br />
            <input onChange={handleNameChange} type='text' name="name" placeholder='Shop Name' style={{ marginLeft: 22, width: 390, height: 35 }} ></input>
            <button color='info' variant='outline' onClick={handleAvailabiliy}>Check availability</button>

            {/* <button onClick={handleAvailabiliy}>Check Availability</button> */}
            <br /><h3>{available == true ? "Available" : available == false ? "Not Available" : ''}</h3>
            <br />
            <br />{available ?
                <button color='success' onClick={handleSubmit}>Create Shop</button> : ""}
            <br />

        </div>
        </>
    )
}

export default CreateShop;
