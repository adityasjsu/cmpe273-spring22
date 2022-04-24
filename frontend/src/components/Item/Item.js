import React from 'react';
import { useEffect, useState } from 'react';
import { CCard, CCardImage, CCardBody, CCardTitle, CCardText, CButton } from '@coreui/react'
import ItemEditPopup from './ItemEditPopup';
import axios from 'axios';
import { useNavigate } from 'react-router';


function Item(props) {

    const [seen, setSeen] = useState(false);
    const [fav, setFav] = useState(false);
    const navigate = useNavigate();
    const [unFav, setUnfav] = useState("");

    useEffect(() => {


        if (props.item.fav === "1") {
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
        axios.put("/api/items/fav/" + props.item.product_ID, data)
            .then(response => {
                setFav(true);
            })
        console.log("Item Favorited")
        window.location.reload(false);
    }

    const handleUnFav = () => {

        const data = {
            fav: "0"
        }

        axios.put("/api/items/fav/" + props.item.product_ID, data)
            .then(response => {
                setFav(false);
            })
        console.log("Item UnFavorited")
        window.location.reload(false);
    }

    const onNavigateItemPage = () => {
        navigate("/item/" + props.item.product_ID);
    }

    const handleItemPopup = () => {
        setSeen(!seen);

    }

    const handleDeleteItem = () => {
        axios.delete("/api/items/" + props.item.product_ID);
        window.location.reload(false);

    }

    return (
        <div className='hover' >

            {seen ? <ItemEditPopup item={props.item} toggle={handleItemPopup} /> : null}
            { }
            <CCard className={`mb-3 border-light border-top-3 border-top-light`} >
                <CCardImage onClick={onNavigateItemPage} orientation="top" src={props.item.image} width={150} height={200} />
                <CCardBody>
                    <CCardTitle>{props.item.name}</CCardTitle>

                    <br />
                    <CCardText>Price:{localStorage.getItem("currency")}{props.item.price}</CCardText>
                    <CCardText>Quantity:{props.item.quantity > 0 ? props.item.quantity : "Out of Stock"}</CCardText>

                    { }
                    <br />

                    {fav ?

                        <CButton color='danger' variant='outline' onClick={handleUnFav} >Add to favorite</CButton>

                        :

                        <button color='success' variant='outline' onClick={handleFavorite} >Add to Favorite</button>

                    }
                    {/* <CButton onClick={handleFavorite} href="#">Favorite Item</CButton> */}

                    <br />
                    <br />

                    {props.type === "shop" ?

                        <><button color='warning' shape='rounded-pill' onClick={handleItemPopup}>Edit</button></>

                        : ""}

                </CCardBody>
            </CCard>

            {/* </button> */}
            <br />


        </div>

    );
}



export default Item;
