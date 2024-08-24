import React from 'react'
import sharara_product from '../Assests/sharara_data'
import Item from '../Item/Item';
const Sharara = () => {
  return (
    <div className='sharara'>
         <h1>SHARARA</h1>
        <hr/>
        <div className='popular-item'>
            {sharara_product.map((item,i)=>{
               return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price}/>
            })}
        </div>
    </div>
  )
}

export default Sharara