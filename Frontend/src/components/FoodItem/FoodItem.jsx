import React, { useContext, useState ,useEffect} from 'react'
import { assets } from '../../assets/assets'
import './FoodItem.css'
import { StoreContext } from '../../context/StoreContext'

const FoodItem = ({ name, id, price, description, image }) => {

 
  const {cartItems,addToCart,removeFromCart}=useContext(StoreContext)
 
  
  return (
    <div className='food-item'>
      <div className='food-item-img-container'>
        <img src={image} alt="" className="food-item-image" />
        {!cartItems[id]
          ? <img className='add' src={assets.add_icon_white} onClick={()=>addToCart(id)} />
          : <div className='food-item-counter'>
            <img src={assets.remove_icon_red} onClick={()=>removeFromCart(id)}
              alt=""  />
            <p>{cartItems[id]}</p>
            <img src={assets.add_icon_green} onClick={()=>addToCart(id)} alt=""  />
          </div>
        }
      </div>
      <div className="food-item-info">
        <div className="food-item-rating">
          <p>{name}</p>
          <img src={assets.rating_starts} alt="" />
        </div>
        <p className="food-item-desc">
          {description}
        </p>
        <p className="food-item-price">${price}</p>
      </div>
    </div>
  )
}

export default FoodItem
