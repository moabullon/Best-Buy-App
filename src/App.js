import React, { Component } from 'react';
import logo from './best-buy-logo.svg';
import axios from 'axios'
import './App.css';

class App extends Component {

  constructor () {
    super ()
    this.state = {
      products:[]
    }
  }



  componentDidMount (){
    axios.get("http://localhost:3030/products?$sort[price]=-1&$limit=20").then(response =>  this.setState({
        products: response.data.data
    }))
  }



  delete(product){
     const newState = this.state.products;
     if (newState.indexOf(product) > -1) {
       newState.splice(newState.indexOf(product), 1);
       this.setState({data: newState})
     }
   }



   productSearch (){
     let searchFromUser = this.inputFromUser.value
     axios.get(`http://localhost:3030/products?name[$like]=*{searchFromUser}*`).then(response =>  this.setState({
         products: response.data.data
     }))
   }


  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to Best Buy</h2>
        </div>
        <p className="App-intro">
          List of available products
        </p>
        <div className="Search-area">
        <input placeholder="enter product name" ref={(input) => { this.searchFromUser = input }}/>
        <button onClick={this.produtSearch.bind(this)}>Search</button>
        </div>
        {this.state.products.map(product => {
          return (
          <div className="Product-list">
              <span><a href={product.url} target="_blank"><img className="image" src={product.image}/></a></span>
              <p className="title"><a href={product.url} target="_blank">{product.name}</a></p>
              <span className="description">Description: {product.description}</span>
              <span className="model">Model: {product.model}</span>
              <span className="price">Price: ${product.price}</span>
              <span className="delete-button" onClick={this.delete.bind(this, product)} ><button>Delete this product</button></span>
            </div>
          )
        }
        )}

          <hr></hr>



      </div>
    );
  }
}

export default App;
