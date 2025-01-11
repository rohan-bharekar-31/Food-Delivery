import React, { useContext } from 'react'
import { StoreContext } from '../../context/StoreContext'
import './Cart.css'
import { useNavigate } from 'react-router-dom'

const Cart = () => {
  const navigate = useNavigate()
  const { cartItems, removeFromCart, getTotalCartAmount, url,food_list,token } = useContext(StoreContext)
  const handleCheckout =()=>{
    if(token){
      navigate("/order")
    }
    else{
      toast.error("Login Required")
    }
  }

  return (
    <div className='cart'>
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {food_list.map((item) => {
          console.log(item)
          const quantity = cartItems[item._id] || 0; // Default to 0 if not in cart
          if (quantity > 0) {
            return (
              <div key={item._id}>
                <div className="cart-items-title cart-items-item">
                  <img src={url + "/images/" + item.image} alt={item.name} />
                  <p>{item.name}</p>
                  <p>${item.price}</p>
                  <p>{quantity}</p>
                  <p>${item.price * quantity}</p>
                  <p className='cross' onClick={() => removeFromCart(item._id)}>X</p>
                </div>
                <hr />
              </div>
            )
          }
          return null; // Return null if the item is not in the cart
        })}
      </div>

      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />

            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
            </div>
            <hr />

            <div className="cart-total-details">
              <b>Total</b>
              <b>${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</b>
            </div>
          </div>

          <button onClick={handleCheckout}>PROCEED TO CHECKOUT</button>
        </div>

        <div className="cart-promocode">
          <p>If you have a promo code, enter it here</p>
          <div className='cart-promocode-input'>
            <input type="text" placeholder='promo code' />
            <button>Submit</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
