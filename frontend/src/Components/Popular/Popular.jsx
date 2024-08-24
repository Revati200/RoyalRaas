import React from 'react'
import data_product from '../Assests/data'
import Item  from '../Item/Item'
import './Popular.css'
import banner_item from '../Assests/icons/men_banner.jpeg';
const Popular = () => {
  return (
    <div className='popular'>
        <h1>NEW ARRIVALS</h1>
        <hr/>
        <p>A Royal Affair</p>
        <hr/>
        <div className='popular-item'>
            {data_product.map((item,i)=>{
               return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price}/>
            })}
        </div>
        <div className='banner-item'>
          <img src={banner_item} alt=""/>
        </div>
    </div>
  )
}

export default Popular