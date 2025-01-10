import { createContext ,useEffect,useState} from "react";
import axios from 'axios'
export const StoreContext = createContext(null)

const StoreContextProvider = (props) => {

    const [cartItems, setCartItems] = useState({})
    const [token, setToken] = useState("")
    const [food_list,setFood_list]=useState([])

    const url="http://localhost:4000"

    const fetchFoodList=async () => {
        const response=await axios.get(`${url}/api/food/list`)
        setFood_list(response.data.data)
    }

    const addToCart=async (itemId)=>{
        if(!cartItems[itemId]){
            setCartItems((prev)=>({...prev,[itemId]:1}))
        }
        else{
            setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
        }
        if(token){
            await axios.post(url+"/api/cart/add",{itemId},{headers:{token}})
        }
    }

    const removeFromCart=async (itemId)=>{
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
        if(token){
            await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}})
        }
    }

    const getTotalCartAmount=()=>{
        let totalAmount=0;
        for (const item in cartItems) {
            if(cartItems[item]>0){
                let iteminfo=food_list.find((product)=>product._id === item)
                totalAmount+=iteminfo.price* cartItems[item]
            }
        }
        console.log(cartItems)
        return totalAmount
    }

    useEffect(() => {
        const loadData = async () => {
            await fetchFoodList();
            const token = localStorage.getItem("token");
            if (token) {
                setToken(token);
                const response = await axios.post(url + "/api/cart/get",{}, {headers:{token}});
                setCartItems(response.data.cartData)
            }
        };
        loadData();
    }, []);
    
    
    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken
    }

    
    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider