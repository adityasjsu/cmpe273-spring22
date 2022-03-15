import axios from "axios";
import React, { Component } from "react";
import { CFormInput, CFormLabel,CFormCheck, CButton } from "@coreui/react";


export default class ItemPopup extends Component {

  constructor(props){
      super(props);
      
      this.state = {
          product_ID:"",
          name: "",
          image:"/no-item.png",
          category:"",
          description:"",
          price: "",
          quantity:"",
          fav:0,
          created: false
      }

      this.handleClick = this.handleClick.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.uploadImage = this.uploadImage.bind(this);
  } 

  // Handles the pop up toggle
  handleClick = () => {
    this.props.toggle();
  };

  handleNameChange = (e) => {
    this.setState({
        name: e.target.value
    });
  }

  uploadImage = async e=> {
    const files = e.target.files
    const data = new FormData
    data.append('file', files[0])
    data.append('upload_preset', '273-images')

    const res = await fetch(
        'http://api.cloudinary.com/v1_1/ddpcbqqmh/image/upload', 
        {
            method: 'POST',
            body: data
        }
    )

    const file = await res.json()

    this.setState({
      image:file.secure_url
    })

    console.log(file.secure_url)
  }

  handleCategoryChange = (e) => {
    this.setState({
        category: e.target.value
    });
  }

  handleDescriptionChange = (e) => {
    this.setState({
        description: e.target.value
    });
  }

  handlePriceChange = (e) => {
    this.setState({
        price: e.target.value
    });
  }

  handleQuantityChange = (e) => {
    this.setState({
        quantity: e.target.value
    });
  }

  handleSubmit = () => {

    var theRandomNumber = Math.floor(Math.random() * 99999) + 1;

    const data= {
        product_ID:theRandomNumber,
       // shop: this.props.shop,
        shopname:this.props.name,
        name: this.state.name,
        image: this.state.image,
        category:this.state.category,
        description: this.state.description,
        price: this.state.price,
        quantity:this.state.quantity,
        fav:0

    }
    axios.post("/api/items", data)
    .then(response => {
        console.log(response);
        if(response.status === 200){
            this.setState({
                created:true
            })
        }
        else{
            console.log(response);
        }
    })
  }




  render() {
    // let redirectVar = null;
    // if(this.state.created === true){
    //    redirectVar = <Navigate to= "/shop"/>
    // }
    return (
      <div className="modal11">
        {/* {redirectVar} */}
        <div className="modal_content11" >
          <span className="close11" onClick={this.handleClick}>
            &times;
          </span>
          <form style={{color:"black",}} onSubmit={this.handleSubmit}>
            <h4>New Product</h4>
            <label inline>
            <input onChange={this.handleNameChange} type="text" name="name" placeholder="Product Name"/>
            </label>
            <br/>
            <br/>
            <label>
              Category:  
              
              <CFormCheck onClick={this.handleCategoryChange} inline type="radio" name="inlineRadioOptions" id="inlineCheckbox2" value="Jewelry" label="Jewellery"/>
              <CFormCheck onClick={this.handleCategoryChange} inline type="radio" name="inlineRadioOptions" id="inlineCheckbox1" value="Clothing" label="Clothing"/>
              <CFormCheck onClick={this.handleCategoryChange} inline type="radio" name="inlineRadioOptions" id="inlineCheckbox2" value="Home Decor" label="Decor"/>
              <CFormCheck onClick={this.handleCategoryChange} inline type="radio" name="inlineRadioOptions" id="inlineCheckbox1" value="option3" label="Entertainment"/>
              <CFormCheck onClick={this.handleCategoryChange} inline type="radio" name="inlineRadioOptions" id="inlineCheckbox1" value="Art" label="Art"/>

              <input onChange={this.handleCategoryChange} type="text" name="category" placeholder="custom category"/>
            </label>
            <br />
            <br/>
            <label>
              <input onChange={this.handleDescriptionChange} className='item-description-input' type="text" name="description" placeholder="Description "/>
            </label>
            <br />
            <br />
            <label>
              <input onChange={this.handlePriceChange} type="text" name="price" placeholder="Price"/>
            </label>
            <br />
            <br/>
            <label>
              <input onChange={this.handleQuantityChange} type="text" name="quantity" placeholder="Quantity"/>
            </label>
            <br />
            <br />
            <label>
              Image :
              <input onChange={this.uploadImage} type="file" name="image" placeholder="Item Image"/>
            </label>
            <br />
            <br />
            <button style={{color:"black"}} type="submit">Add</button>
          </form>
        </div>
      </div>
    );
  }
}
