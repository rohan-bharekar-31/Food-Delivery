import React, { useContext, useState, useEffect } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios';
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom';

const Placeorder = () => {

  const { food_list, cartItems, getTotalCartAmount, url, token,setCartItems } = useContext(StoreContext);
  const navigate = useNavigate();

  

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    zipcode: "",
    country: "",
    phone: ""
  })

  const updateCartData=async()=>{
    const response = await axios.post(url + "/api/cart/get",{}, {headers:{token}});
    setCartItems(response.data.cartData)
  }

  useEffect(() => {
    if (!token) {
      navigate('/cart')
    }
    else if (getTotalCartAmount() === 0) {
      navigate('/cart')
    }
  }, [token])

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(prevData => ({ ...prevData, [name]: value }))
  }




  const placeOrder = async (event) => {
    event.preventDefault();
  
    let orderItems = [];
    food_list.forEach((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = { ...item }; // Create a new object to avoid modifying the original item
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    });
  
    let orderData = {
      address: data,
      items: orderItems,
      amount: await getTotalCartAmount() + 2, // Calculate total amount with additional charges
    };
  
    try {
      // Step 1: Create an order on the backend
      const createOrderResponse = await axios.post(
        url + "/api/order/create",
        { amount: orderData.amount },
        { headers: { token } }
      );
  
      if (!createOrderResponse.data.success) {
        return toast.error("Failed to create order. Please try again.");
      }
  
      const { order } = createOrderResponse.data;
      console.log("Razorpay Order:", order);
  
      // Step 2: Configure Razorpay options
      const options = {
        key: "rzp_test_86XIzVba3fNcWu", // Replace with your Razorpay API key
        amount: order.amount, // Amount in paise (e.g., ₹100 = 10000 paise)
        currency: "INR",
        name: "Food Del", // Name displayed on Razorpay checkout
        order_id: order.id, // Razorpay order ID from backend
        handler: async (response) => {
          console.log("Payment Response:", response);
  
          // Step 3: Verify payment on the backend
          const verifyResponse = await axios.post(
            url + "/api/order/verify",
            {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              address: orderData.address,
              items: orderData.items,
              amount:orderData.amount
            },
            { headers: { token } }
          );
  
          if (verifyResponse.data.success) {
            toast.success("Payment successful and OTP send to your Email");
            updateCartData();
          } else {
            toast.error("Payment verification failed.");
          }
        },
        theme: {
          color: "#F37254", // Razorpay theme color
        },
      };
  
      // Step 3: Open Razorpay Checkout
      const rzp = new Razorpay(options);
      rzp.open();
  
      // Handle payment failures
      rzp.on("payment.failed", (response) => {
        console.error("Payment Failed:", response.error);
        toast.error("Payment failed. Please try again.");
      });
    } catch (error) {
      console.error("Error placing order:", error);
      toast.error("An error occurred. Please try again.");
    }
  };
  


  return (
    <form onSubmit={placeOrder} className='place-order'>
      <div className="place-order-left">
        <p className='title'>Delivery Information</p>
        <div className="multi-fields">
          <input type="text" required placeholder='First name' name='firstName' onChange={onChangeHandler} value={data.firstName} />
          <input type="text" required placeholder='Last name' name='lastName' onChange={onChangeHandler} value={data.lastName} />
        </div>

        <input type="text" required placeholder='E-mail address' name='email' onChange={onChangeHandler} value={data.email} />
        <input type="text" required placeholder='Street' name='street' value={data.street} onChange={onChangeHandler} />

        <div className="multi-fields">
          <input type="text" required placeholder='City' name='city' value={data.city} onChange={onChangeHandler} />
          <input type="text" required placeholder='State' name='state' value={data.state} onChange={onChangeHandler} />
        </div>
        <div className="multi-fields">
          <input type="text" required placeholder='Zip-Code' name='zipcode' value={data.zipcode} onChange={onChangeHandler} />
          <input type="text" required placeholder='Country' name='country' value={data.country} onChange={onChangeHandler} />
        </div>
        <input type="text" required placeholder='Phone' name='phone' value={data.phone} onChange={onChangeHandler} />
      </div>
      <div className='place-order-right'>
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
          <button type='submit' >Pay on Delivery</button>
        </div>
      </div>
    </form>
  )
}

export default Placeorder
