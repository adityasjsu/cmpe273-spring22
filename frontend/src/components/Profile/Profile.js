import React , {useEffect, useState} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import FavItems from './FavItems';
import { CContainer, CRow, CCol, CButton } from '@coreui/react';
import Navbar from '../Navigation/Navigationbar';

const Profile = () => {
    const[username, setUsername] = useState("");
    const[name, setName] = useState("");
    const[email, setEmail] = useState("");
    const[image,setImage] = useState("");
    const[user, setUser] = useState({});
    const[favItems,setFavItems] = useState([]);
    const userShop = sessionStorage.getItem("shop")
    const[hasShop, setHasShop] = useState(false);
    const navigate = useNavigate();
 

    useEffect(() => {
        axios.defaults.headers.common['authorization'] = localStorage.getItem('authToken');
        axios.get("/api/users/" + sessionStorage.getItem("token"))
        .then((response) => {
            setUser(response.data);
            setUsername(response.data.email);
            setName(response.data.name);
            setEmail(response.data.email);
            setImage(response.data.image);

            
        axios.get("/api/items/")
        .then(response => {
            setFavItems(response.data.filter(item =>item.fav === "1"));
        })
           
        })
        .catch(err => {
            console.log("authorization failed");
            //sessionStorage.removeItem("token");
            //sessionStorage.removeItem("shop");
          //  localStorage.removeItem("authToken");
          alert("authorization failed. Sign out and Sign in again")
           // navigate("/login"); 
        });
        console.log("Username:", username);


        if(userShop != "undefined"){
            setHasShop(true);
        }

    },[]);

    
    return(
        <><div className='App'>
            {/* {seen ? <ShopPopup name="TESTING" toggle={handlePopup} /> : null} */}

            <br/><br/>

            <CContainer>
                <CRow>
                <CCol > <img src={image} width={300}/>
                <br/>

<h2><b>User : {name}</b></h2>

<br />
<br />
<Link to="/updateProfile" state={{ user: user }} className="btn btn-secondary">Edit Profile</Link>

</CCol>
               
                <CCol>

                </CCol>
                <CCol>

                   {/* <br/>
                    <br/>
                    <br/>

                    <Link to="/orders"  className="btn btn-primary">View My Orders</Link>

                    <br/>
                    <br/>
                    <br/>*/}
                    {hasShop  ? 

                        ""
                    :
                        ""
                    }
{/*Link to="/createshop"  className="btn btn-primary">Create Shop</Link>*/}

                    
                </CCol>


                </CRow>
            </CContainer>
            

            


            <br/>
            <br/>
            <br/>
            <br/>
            <div>
                <FavItems favItems={favItems}/>
            </div>

        </div>
       </>
    )
}

export default Profile;
