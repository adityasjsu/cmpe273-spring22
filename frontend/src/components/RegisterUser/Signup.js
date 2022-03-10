import React , {Component} from 'react';
import axios from 'axios';
import {Navigate} from 'react-router';
//import { Link } from 'react-router-dom';
//import { CForm, CFormLabel, CFormInput, CCol, CButton, CRow, CContainer, CTabContent, CLink } from '@coreui/react';

class Signup extends Component {

    constructor(props){
        super(props);
        this.state = {
             email: "",
                 name: "",
                 password: "",
                errMssg: "",
                navigateTag: "",
                created:false
        }

        // this.usernameChangeHandler = this.usernameChangeHandler.bind(this);
        this.emailChangeHandler = this.emailChangeHandler.bind(this);
        this.passwordChangeHander = this.passwordChangeHander.bind(this);
        this.nameChangeHandler = this.nameChangeHandler.bind(this);
        this.addUser = this.addUser.bind(this);
    }

    // usernameChangeHandler = (e) => {
    //     this.setState({
    //         username: e.target.value
    //     });
    // }
    emailChangeHandler = (e) => {
        this.setState({
            email: e.target.value
        });
    }
    passwordChangeHander = (e) => {
        this.setState({
            password: e.target.value
        });
    }

    nameChangeHandler = (e) => {
        this.setState({
            name: e.target.value
        })
    }

    addUser = (e) => {

        //prevent page from refresh
        e.preventDefault();

        const data = {
            email: this.state.email,
            password: this.state.password,
            name: this.state.name,
            image:"/default.jpeg"
        }
        axios.defaults.withCredentials = true;
        axios.post("/api/users", data)
            .then(response => {
                console.log("Status code" , response.status);

                if(response.status === 200){
                    this.setState({
                         errMssg: "", created:true 
                    })
                }
                else{
                    this.setState({
                        errMssg: "Could Not Sign Up"
                    })
                }
            })
    }

    render(){
         let navigateVar = null;
         if(this.state.created === true){
            navigateVar = <Navigate to= "/login"/>
         }
        return(
            <><div className='App'>
                {navigateVar}
                <br />
                <br />
                <br />
                <br />
            </div>
            <div class="container">
                    <h2>Create Your Account</h2>
                    <form onSubmit={this.addUser}>
                        <div style={{ width: '30%' }} class="form-group">
                            <input onChange={this.emailChangeHandler} id="emailId"
                                type="email" class="form-control" name="EmailID" placeholder="Email Address"
                                required />
                        </div>
                        <br />
                        <div style={{ width: '30%' }} class="form-group">
                            <input onChange={this.nameChangeHandler} id="name" type="text"
                                class="form-control" name="name" placeholder="Name" required />
                        </div>
                        <br />
                        <div style={{ width: '30%' }} class="form-group">
                            <input onChange={this.passwordChangeHander} id="password" type="password"
                                class="form-control" name="password" placeholder="Password" required />
                        </div>
                        <br />
                        <div style={{ width: '30%' }}>
                            <button class="btn btn-success" type="submit" style={{backgroundColor: ''}}>Register</button>
                        </div>
                    </form>
                </div>
                <br/>
                <br/>


                
            </>

                
        );
    }
}

export default Signup;