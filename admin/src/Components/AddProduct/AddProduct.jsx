import React, { useState } from 'react'
import './AddProduct.css'
import upload_area from '../../assets/upload_area.jpeg'


const AddProduct = () => {

  const[image,setImage]=useState(false);
  const[productDetails, setproductDetails]=useState({
    name:"",
    image:"",
    category:"",
    price:"",
  })

  const imageHandler=(e)=>{
     setImage(e.target.files[0]);
  }
  const changeHandler=(e)=>{
    setproductDetails({...productDetails,[e.target.name]:e.target.value}

    )
  }
  const Add_Product=async()=>{
    console.log(productDetails);
    let responseData;
    let product=productDetails;

    let formData=new FormData();
    formData.append('product',image);
    await fetch('http://localhost:4008/upload',{
      method:'POST',
      headers:{
        Accept:'application/json',
      },
      body:formData,

    }).then((resp)=>resp.json()).then((data)=>{responseData=data});
  
  if(responseData.success){
 product.image=responseData.image_url;
 console.log(product);
 await fetch('http://localhost:4008/addproduct',{
  method:'POST',
  headers:{
 Accept:'application/json',
 'Content-Type':'application/json',
 },
  body:JSON.stringify(product),
 }).then((resp)=>resp.json()).then((data)=>{
  data.succes?alert("Product Added"):addEventListener;ErrorEvent("Failed");
 });
  
  }
}
  return (
    <div className='add-product'>
       <div className="addproduct-itemfield">
        <p>Add Products</p>
        <input value={productDetails.name} onChange={changeHandler}type='text' name='name' placeholder='Type here'/>
       </div>
       <div className="addproduct-price">
        <div className="addproduct-itemfield">
          <p>Price</p>
          <input value={productDetails.price} onChange={changeHandler}type="text" name="price" placeholder='Type here'/>
        </div>
  <div className="addproduct-itemfield">
    <p>Product Category</p>
    <select value={productDetails.category} onChange={changeHandler}name='category' className='addproduct-selector'>
      <option value='women'>Women</option>
      <option value='men'>Men</option>
    </select>
  </div>
  <div className="addproduct-itemfield">
    <label htmlFor='file-input'>
      <img src={image?URL.createObjectURL(image):upload_area} className='addproduct-thumnail-img' alt=''/>
    </label>
    <input onChange={imageHandler}type='file' name='image' id='file-input' hidden/>
  </div>
  <button onClick={()=>{Add_Product()}}className='addproduct-btn'>ADD</button>
       </div>

    </div>
  )
}

export default AddProduct