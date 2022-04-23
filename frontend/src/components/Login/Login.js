import React , {Component} from 'react';
import axios from 'axios';
import {Navigate} from 'react-router';
import { Link } from 'react-router-dom';
//import { CForm, CFormLabel, CFormInput, CCol, CButton, CRow, CContainer, CTabContent } from '@coreui/react';

class Login extends Component {

    constructor(props){
        super(props);
        this.state = {
            email: "",
            password: "",
            auth:false,
            errMessage: ""
        }

        this.emailChangeHandler = this.emailChangeHandler.bind(this);
        this.passwordChangeHander = this.passwordChangeHander.bind(this);
        this.submitLogin = this.submitLogin.bind(this);
    }

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

    submitLogin = (e) => {
        e.preventDefault();
        const data = {
            email: this.state.email,
            password: this.state.password,
        }
        axios.defaults.withCredentials = true;
        axios.post("api/login", data)
            .then(response => {
                console.log("Status code" , response.status);

                if(response.status === 200){
                    if(response.data !== "Wrong Password" && response.data !== "Incorrect email/password combination"){
                    sessionStorage.setItem("token", data.email);
                    localStorage.setItem("authToken",response.data);
                    console.log("response : ",response);
                    this.setState({
                        auth: true,
                        errMessage:""
                    })

                    axios.get("/api/shops/usershop/"+data.email)
                    .then(response => {
                    if(response){
                        sessionStorage.setItem("shop",response.data.name);
                    }
            })  
                }
            else{
                this.setState({
                    errMessage : response.data
                })
            }
            }
                else{
                    console.log("inside else");
                    this.setState({
                        errMessage: "Could Not Sign In"
                    })
                    console.log("err",this.state.errMessage);
                }
            })
    }

    render(){
        let navigateVar = null;
        if(this.state.auth === true){
           navigateVar = <Navigate to= "/"/>
        }
        return(
            <><div className='App'>
                {navigateVar}

                <br />
                <br />
                <br />
                <br />
                <br />
            </div>
            <div class="container">

                    <div class="login-form">
                        <div class="main-div">
                            <div class="panel">
                                <h2>Login</h2>
                                <p>Please enter your email and password</p>
                            </div>
                            <form onSubmit={this.submitLogin}>
                                <div id='invalidCredError' style={{ color: "red" }}>{this.state.errMessage}</div>
                                <div class="form-group">
                                    <input onChange={this.emailChangeHandler} type="email"
                                        class="form-control" name="emailId" placeholder="Email Address" required />
                                </div><br/>
                                <div class="form-group">
                                    <input onChange={this.passwordChangeHander} type="password"
                                        class="form-control" name="password" placeholder="Password" required /><br/>
                                </div>
                                <button class="btn btn-primary" style={{ backgroundColor: 'black' }}>Login</button>
                            </form>
                        </div>
                        <Link to="/signup">Create an account</Link>
                    </div>
                </div>

</>
                   
        );
    }
}

export default Login;