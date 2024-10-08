import React, { useEffect, useState } from 'react'
import './ListProduct.css'
import cross_icon from '../../assets/logo.png.png';
const ListProduct = () => {

  const[allproducts,setallProducts]=useState([]);
  const fetchInfo=async()=>{
    await fetch('http://localhost:4008/allproducts')
    .then((res)=>res.json())
    .then((data)=>{setallProducts(data)});
  }
  useEffect(()=>{
    fetchInfo();
  })
  return (
    <div className='list-product'>
      <h1>All Product List</h1>
      <div className="listproduct-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Category</p>
        <p>Remove</p>
      </div>
      <div className="listproduct-allproduct">
       <hr/>
       {allproducts.map((product,index)=>{
        return <div key={index}className="listproduct-format-main listproduct-format">
           <img src={product.image} alt="" className="listproduct-product-icon" />
           <p>{product.name}</p>
           <p>${product.price}</p>
           <p>${product.category}</p>
           <img className='listproduct-remove-icon' src={cross_icon} alt=""/>
       </div> 
       })}
      </div>
      </div>
  )
}

export default ListProduct