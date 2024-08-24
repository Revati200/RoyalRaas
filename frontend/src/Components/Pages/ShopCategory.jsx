import React, { useContext } from 'react'
import '../Assests/CSS/ShopCategory.css'
import { ShopContext } from '../Context/ShopContext'
import Item from '../Item/Item';
const ShopCategory = (props) => {
  const{all_product} =useContext(ShopContext);
  return (
    <div className='shopcategory'>
      
      <div className="shopcategory-products">
        {all_product.map((item,i)=>{
          if(props.category===item.category){
            return <Item key={i} id={item.id} image={item.image} name={item.name} new_price={item.new_price}/>
          }
          else {
            return null;
          }
        })}
      </div>
      
    </div>
  )
}

export default ShopCategory