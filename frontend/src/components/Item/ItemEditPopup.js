import axios from "axios";
import React, { Component } from "react";

export default class ItemEditPopup extends Component {

  constructor(props) {
    super(props);

    this.state = {
      product_ID: this.props.item.product_ID,
      name: this.props.item.name,
      image: this.props.item.image,
      category: this.props.item.category,
      description: this.props.item.description,
      price: this.props.item.price,
      quantity: this.props.item.quantity,
      fav: this.props.item.fav,
      edited: false
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

  uploadImage = async e => {
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
      image: file.secure_url
    })
    //setImage(file.secure_url)

    console.log(file.secure_url)
  }

  handleImageChange = (e) => {
    this.setState({
      image: e.target.value
    });
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

    const data = {
      name: this.state.name,
      image: this.state.image,
      category: this.state.category,
      description: this.state.description,
      price: this.state.price,
      quantity: this.state.quantity,
      fav: this.state.fav

    }
    axios.put("/api/items/" + this.state.product_ID, data)
      .then(response => {
        console.log(response);
        if (response.status === 200) {
          this.setState({
            edited: true
          })
          console.log(this.state.product_ID)
        }
        else {
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
      <div className="modal22">
        {/* {redirectVar} */}
        <div className="modal_content22">
          <span className="close22" onClick={this.handleClick}>
            &times;
          </span>
          <form onSubmit={this.handleSubmit}>
            <h4>Edit Product</h4>
            <label>
              Product Name:<br />
              <input value={this.state.name} onChange={this.handleNameChange} type="text" name="name" placeholder="Item Name" />
            </label>
            <br />
            <label>
              Quantity: <br />
              <input value={this.state.quantity} onChange={this.handleQuantityChange} type="text" name="quantity" placeholder="Total Quantity" />
            </label>
            <br />
            <label>
              Category: <br />
              <input value={this.state.category} onChange={this.handleCategoryChange} type="text" name="category" placeholder="Item Category" />
            </label>
            <br />
            <label>
              Description: <br />
              <input value={this.state.description} onChange={this.handleDescriptionChange} className='item-description-input' type="text" name="description" placeholder="Enter Description " />
            </label>
            <br />
            <label>
              Price: <br />
              <input value={this.state.price} onChange={this.handlePriceChange} type="text" name="price" placeholder="Enter Price" />
            </label>
            <br />
            <br />
            <label>
              Image:
              <input onChange={this.uploadImage} type="file" name="image" placeholder="Item Image" />
            </label>
            <br />
            <br />
            <input type="submit" value="update" />
          </form>
        </div>
      </div>
    );
  }
}
