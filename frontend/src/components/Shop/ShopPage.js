import React , {useEffect, useState} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import ItemList from '../Item/ItemList';
import { useParams } from 'react-router';
import ItemPopup from './ItemPopup';
import { CContainer,CCol,CRow, CButton } from '@coreui/react';

const ShopPage = (props) => {
    const[name, setName] = useState("");
    const[image, setImage]= useState("");
    const[total_sales, setTotalSales] = useState("");
    const[shop_ID, setShopID]= useState("");
    const[items, setItems] = useState([]);
    const[username, setUsername] = useState("");
    const[valid, setValid] = useState(false);
    const[seen, setSeen] = useState(false);
    const[userShop,setUserShop] = useState(false);
    const {id} = useParams();
    console.log("insideshop page",id);
    // To handle the image input
    const hiddenFileInput = React.useRef(null);

    useEffect(() => {

        async function getResponse(){

            //let response = axios.get("/api/v1/shops/usershop/" + sessionStorage.getItem("token"));
            let response = axios.get("/api/shops/" + id)
            response = await response;
            setShopID(response.data.name);
            setImage(response.data.image);
            setName(response.data.name);
            setUsername(response.data.email);
            setTotalSales(response.data.total_sales);

            if(response.data.email === sessionStorage.getItem("token")){
                setUserShop(true);
            }

            console.log("Shop ID: " + id)
        }

        getResponse();

    },[]);

    useEffect(() => {
        async function getItems() {

            let response = axios.get("/api/items/byshop/" + id)
            response = await response;
            setItems(response.data);
            // if(items.length > 0){
            //     setValid(true);
            // }

            console.log("Items for Store " + id + " fetched");
            console.log(response);
        }
        getItems();
    },[setItems]);


    // Opens file input upon button press
    const handleClick = event => {
        hiddenFileInput.current.click();
    };

    const handleItemPopup = () => {
        setSeen(!seen);
        console.log("Pressed:" , seen);
    }

    const uploadImage = async e=> {
        const files = e.target.files
        const data = new FormData
        data.append('file', files[0])
        data.append('upload_preset', 'x9kvvkmf')

        const res = await fetch(
            'http://api.cloudinary.com/v1_1/dtsbyd9s6/image/upload', 
            {
                method: 'POST',
                body: data
            }
        )

        const file = await res.json()
        setImage(file.secure_url)

        console.log(file.secure_url)

    }

    const updateImage = async e => {

        const newData = {
            name:name,
            total_sales:total_sales,
            image:image
        }

        let response = await axios.put("/api/shops/" + id , newData);

        console.log(response)

    }

    return(

        <div>
            <div className='App'>
                {seen ? <ItemPopup shop={name} name={name} toggle={handleItemPopup} /> : null}
            </div>
        

        <br/><br/>

        <CContainer>
            <CRow>
            <CCol > 
                <img src={image} width={150} alt=""/>
                <br/>
                <p>   </p>
                { userShop ?<><button style={{marginRight:10 , marginLeft:5,color:"blue"}} onClick={handleClick}>Browse Image</button>
                <button style={{color:'blue'}} onClick={updateImage}>Update</button></>:""}
                
                <input type="file" ref={hiddenFileInput} onChange={uploadImage} style={{display:'none'}} />
                <h3>Shop Products:</h3>
                {userShop ?<button style={{color:'blue'}} onClick={handleItemPopup}> <b></b> Add Item</button> : ""}

            </CCol>
        
            <CCol>

                <br/>
                <br /><h2>shopName: {name}</h2>
                Owner: <b>{username}</b>
                <br />
                <br/>{userShop ? <h5> Total Sales: {total_sales} </h5> : "" }


            </CCol>
            <CCol>

                <br/>
                <br/>
                <br/>
                <br/>
                
            </CCol>


            </CRow>
            </CContainer>


            {/* {items.length> 0 ? setValid(true): setValid(false)} */}
            <div className=''>
                <br/>

                <br/>
                <br/>
                {items.length > 0 ? 

                    <CContainer>
                    <CRow xs={{ cols: 4 }}>
                        {userShop ?     
                            <ItemList type={"shop"} items={items}/>
                            :
                            <ItemList items={items}/>
                        }
                        {/* <ItemList type={"shop"} items={items}/> */}
                    </CRow>
                    </CContainer>

                : 
                        <><center><p>No Products. Add new products</p></center></>}
                        {/* {{valid ? items.map(({ item_ID, name, description, quantity }) => (
                            <p key={item_ID}>Item name: {name},Description {description}, Quantity: {quantity}.</p>
                        )) : <p>NO ITEMS in this Shop</p>}} */} 

            </div>

                       

        </div>
    )
}

export default ShopPage;
