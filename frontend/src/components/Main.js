import React , {Component} from 'react';
import {Route, Routes} from 'react-router-dom';
import Signup from './RegisterUser/Signup';
import Login from './Login/Login';
import Navbar from './Navigation/Navigationbar';
import Profile from './Profile/Profile';
import UpdateProfile from './Profile/UpdateProfile';
import Homepage from './HomePage/Homepage';
import Cart from './Cart/Cart';
import ShopPage from './Shop/ShopPage';
import CreateShop from './Shop/CreateShop';
import SearchPage from './SearchPage/SearchPage';
import ItemPage from './Item/ItemPage';
import OrderPage from './OrderPage/OrderPage'
import axios from 'axios';
import { Container } from 'react-bootstrap';

class Main extends Component {



    // handleCurrencyChange = (e) => {
    //     localStorage.setItem("currency" , e.target.value);
    // }

    render(){
         if(sessionStorage.getItem("currency") == null){
            sessionStorage.setItem("currency", "$")
         }
        return(
            <><div>
                <Navbar />
            </div>
            
            <Routes>


                <Route path="/" element={<Homepage />}/>
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/updateprofile" element={<UpdateProfile />} />
                <Route path="/cart" element={<Cart />} />
                {/* <Route path="/shop/" element={<ShopPage shop={shop}   />} /> */}
                <Route path="/shop/:id" element={<ShopPage />} />
                <Route path="/createShop" element={<CreateShop/>}/>
                <Route path="/search/:query" element={<SearchPage/>}/>
                <Route path="/item/:id" element={<ItemPage/>}/>
                <Route path="/orders" element={<OrderPage/>}/>

                {/* <Route path="/" element={<Homepage />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/updateprofile" element={<UpdateProfile />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/shop/:id" element={<ShopPage />} />
                <Route path="/createShop" element={<CreateShop/>}/>
                <Route path="/search/:query" element={<SearchPage/>}/>
                <Route path="/item/:id" element={<ItemPage/>}/>
                <Route path="/orders" element={<OrderPage/>}/> */}

            </Routes>
            <div>
            <Container>
            
            <footer className='footer' style={{ backgroundColor: 'pink' }}>
                    
            <div>
                Country: United States  {" "}
                <select value={"$"} onChange={(e)=> localStorage.setItem("currency" , e.target.value)}>
                    <option value="₹">Rupee (₹)</option>
                    <option value="£">Pound (£)</option>
                    <option value="¥">Euro (€)</option>
                    <option value="$">U.S. Dollar ($)</option>
                    <option value="¥">Yen (¥)</option>
                </select> 
            </div>
            <div>
                Etsy@2022
                <span></span>
            </div>
            
            <div>
            </div>
            </footer>
            </Container>
            
            </div>
            </>
 
            
        )
    }
}

export default Main;