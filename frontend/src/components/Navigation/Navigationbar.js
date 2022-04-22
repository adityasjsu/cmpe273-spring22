import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { Navbar, Nav, Container, Form, FormControl, Button } from 'react-bootstrap';
import axios from 'axios';

const Navigationbar = (props) => {

    const [query, setQuery] = useState("");
    const navigate = useNavigate();
    const [isSignedIn, setSignedIn] = useState(false);

    useEffect(() => {
        if (sessionStorage.getItem("token") != null) {
            setSignedIn(true);
        }

    });

     const handleSearchChange = (e) => {
         if(isSignedIn){
         setQuery(e.target.value)
         }
     }

         const handleSearchSubmit = () => {
            if (isSignedIn) {
                        navigate("/search/" + query);
                        window.location.reload(false);
            }
            else{
                console.log("inside invalid search");
                navigate("/login"); 
            }
     }

    // const handleUserShopNav = () => {
    //     //axios.get(by username)
    //     //.then(store in sesssion storage)
    //     navigate("/shop/" + sessionStorage.getItem("shop"));
    // }

    // const handleUserProfile = () => {
    //     if (isSignedIn) {
    //         navigate("/shop/" + sessionStorage.getItem("shop"));
    //     }
    //     else {
    //         navigate("/login");
    //     }

    // }

    const handleSignout = () => {
        setSignedIn(false);
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("shop");
        navigate("/");
    }

    return (
        <div>
            <>
                <Navbar bg="orange" expand="lg">
                    <Container breakpoint="md">
                        <Navbar.Brand href="/" >Etsy</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">

                            <Form className="d-flex" onSubmit={handleSearchSubmit}>
                                <FormControl
                                    type="search"
                                    placeholder="Search for Anything"
                                    className="me-2"
                                    aria-label="Search"
                                    onChange={handleSearchChange}
                                />
                                <Button type="submit" variant="outline-success">Search</Button>
                            </Form>
                            {isSignedIn ?
                                <Nav className="me-auto">
                                    <Nav.Link href="/profile" >Favourite</Nav.Link>
                                    <Nav.Link href="/profile" >Profile</Nav.Link>
                                    <Nav.Link href="/createShop" >Shop</Nav.Link>
                                    <Nav.Link href="/cart" >Cart</Nav.Link>
                                    <Button variant="link" onClick={handleSignout}>
                                        Signout
                                    </Button>
                                </Nav>

                                : <Nav className="me-auto">
                                    <Nav.Link href="/login">Signin</Nav.Link>
                                </Nav>
                            }

                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </>

        </div>

    )
}





export default Navigationbar;