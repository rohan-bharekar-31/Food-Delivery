import React from 'react'
import './Add.css'
import axios from "axios"
import { assets } from '../../assets/assets'
import { useState,useEffect } from 'react'
import { toast } from 'react-toastify'


const Add = ({url}) => {

    const [image, setImage] = useState(false);
    const [data, setdata] = useState({
        name: "",
        description: "",
        category: "Salads",
        price: ""
    })

    const onChangehandler=(event)=>{
        const name=event.target.name;
        const value=event.target.value;
        setdata((prevData)=>({
            ...prevData,[name]:value
        }))
    }

    useEffect(() => {
      console.log(data)
    }, [data])

    const onSubmitHandler=async (event) => {
        event.preventDefault();
        const  formData=new FormData();
        formData.append("name",data.name)
        formData.append("description",data.description)
        formData.append("price",data.price)
        formData.append("category",data.category)
        formData.append("image",image)
        
        const response=await axios.post(`${url}/api/food/add`,formData)

        if(response.data.success){
            setImage(false)
            setdata({
                name: "",
                description: "",
                category: "Salads",
                price: ""})
                toast.success(response.data.message)
        }
        else{
            toast.error(response.data.message)
        }

    }
    

    return (
        <div className="add">
            <form className='flex-col'>
                <div className="add-img-upload flex-col">
                    <p>Upload Image</p>
                    <label htmlFor="image">
                        <img src={image ? URL.createObjectURL(image) : assets.upload_area} alt="" srcset="" />
                    </label>
                    <input type="file" onChange={(e) => { setImage(e.target.files[0]) }} id='image' hidden required />
                </div>

                <div className="add-product-name flex-col">
                    <p>Product Name</p>
                    <input type="text" onChange={onChangehandler} value={data.name} name='name' placeholder='Type here' />
                </div>

                <div className="add-product-description flex-col">
                    <p>Product Description</p>
                    <textarea name="description" onChange={onChangehandler} value={data.description} rows="6" placeholder='"Write content here'></textarea>
                </div>

                <div className="add-category-price">

                    <div className="add-category flex-col">
                        <p>Product Category</p>
                        <select name="category" onChange={onChangehandler} value={data.category}>
                            <option value="Salad">Salad</option>
                            <option value="Rolls">Rolls</option>
                            <option value="Deserts">Deserts</option>
                            <option value="Sandwich">Sandwich</option>
                            <option value="Cake">Cake</option>
                            <option value="Pure Veg">Pure Veg</option>
                            <option value="Pasta">Pasta</option>
                            <option value="Noodles">Noodles</option>
                        </select>
                    </div>

                    <div className='add-price flex-col' >
                        <p>Product Price</p>
                        <input type="Number" onChange={onChangehandler} value={data.value} name='price' placeholder='$20' />
                    </div>
                </div>

                <button className='add-btn' type='submit' onClick={onSubmitHandler}>Add Items</button>

            </form>

        </div>
    )
}

export default Add 