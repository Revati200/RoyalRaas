import React, { useContext } from 'react'
import './ProductDisplay.css'
import { ShopContext } from '../Context/ShopContext';
const ProductDisplay = (props) => {
    const {product}=props;
    const {addToCart}=useContext(ShopContext);
    
  return (
    <div className='productdisplay'>
     <div className="productdisplay-left">
     <div className="productdisplay-img">
     <img className='productdisplay-main-img' src={product.image} alt=""/>
     </div>
     </div>
     <div className="productdisplay-right">
        <h1>{product.name}</h1>
        <div className="productdisplay-right-prices">
            <div className="productdisplay-right-price-new">₹{product.new_price}</div>
        </div>
<div className="productdisplay-right-description">
The design embodies a perfect fusion of tradition and contemporary fashion, making a statement of refined elegance and sophisticated style. The look is completed with a matching drape, adorned with vibrant thread tassels along the edges, adding a touch of elegance and cohesion to the entire outfit.
</div>
<div className="productdisplay-right-size">
    <h1>Select Size</h1>
    <div className="productdisplay-right-size">
        <div>XS</div>
        <div>S</div>
        <div>M</div>
        <div>L</div>
        <div>XL</div>
    </div>
</div>
<button onClick={()=>{addToCart(product.id)}}>ADD TO CART</button>
     </div>
    </div>
  )
}

export default ProductDisplay