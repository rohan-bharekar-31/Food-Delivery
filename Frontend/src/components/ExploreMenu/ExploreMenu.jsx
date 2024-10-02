import React from 'react'
import './ExploreMenu.css'
import { menu_list } from '../../assets/assets'

const ExploreMenu = ({category,setCategory}) => {
   
    return (
        <div className='explore-menu' id='explore-menu'>
            <h1>Explore our menu</h1>
            <p className='explore-menu-text'> Choose from a diverse menu featuring a delectable array of dishes. Our misson is to satisfy your cravings and elevate your dinning experience, one delicious meal at a time.</p>
            <div className="explore-menu-list">
                {
                    menu_list.map((item, index) => {
                        return (
                            <div className="explore-menu-list-item" key={index} onClick={()=>setCategory((prev)=>prev===item.menu_name?"All":item.menu_name)}>
                                <img src={item.menu_image} className={
                                    category===item.menu_name?"active":""
                                } alt="" />
                                <p>{item.menu_name}</p>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default ExploreMenu
