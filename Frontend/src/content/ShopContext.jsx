import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import {toast } from 'react-toastify';
import { products as pd} from "../assets copy/assets"

export const ShopContext = createContext();

const ShopContextProvider = (props)=>{

    const [save3d, setSave3d] = useState(false);
    const currency = '$';
    const delivery_fee = 10;
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(true);
    const [cartItems, setCartItems] = useState({});
    const [products, setProducts] = useState([])
    const [token,setToken] = useState('')
    const navigate = useNavigate()
    const [isCartOpen, setCartOpen] = useState(false);
    const [registrationType, setRegistrationType] = useState("");
    const [userType, setUserType] = useState("");
    const [totalOrders , setTotalOrders] = useState(0)
    const [orderTotalValues, setOrderTotalValues] = useState(0)
    const [userContextData, setUserContextData] = useState(null);

    const toggleCart = () => setCartOpen(!isCartOpen);

    useEffect(() => {
        const fetchUserContextData = async () => {
          try {
            const response = await axios.get(`${backendUrl}/api/user/user-profile`, {
              headers: { Authorization: `Bearer ${token}` },
            });
    
            if (response.data.success) {
              setUserContextData(response.data.user);
              console.log(response.data.user.email);
            } else {
              console.error(response.data.message);
            }
          } catch (error) {
            console.error("Error fetching user data:", error);
          }
        };
    
        if (token) fetchUserContextData();
      }, [token, backendUrl]);


    const addToCart = async (itemId, size) => {
        let cartData = structuredClone(cartItems);  // Clone the cartItems
        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1;  // Increment quantity if size already exists
            } else {
                cartData[itemId][size] = 1;  // Add new size with quantity 1
            }
        } else {
            cartData[itemId] = {};  // Create a new item entry
            cartData[itemId][size] = 1;  // Set quantity for the selected size
        }
        setCartItems(cartData);  // Update state with new cartData

        if(token){
            try {
                await axios.post(backendUrl+'/api/cart/add',{itemId,size}, {headers:{token}})
            } catch (error) {
                console.log(error)
                toast.error(error.message)
            }
        }
    };

    const getCartCount = ()=> {
        let totalCount = 0;
        for(const items in cartItems) {
            for(const item in cartItems [items]){
                try {
                    if (cartItems[items][item] > 0) {
                        totalCount += cartItems [items][item];
                    }
                } catch (error) {
                }
            }
        }
        return totalCount;
    }

    const updateQuantity = async (itemId, size, quantity)=>{
        let cartData = structuredClone(cartItems);
        cartData[itemId][size]= quantity;
        setCartItems(cartData)

        if(token){
            try {
                await axios.post(backendUrl+'/api/cart/update',{itemId,size,quantity}, {headers:{token}})
            } catch (error) {
                console.log(error)
                toast.error(error.message)
            }
        }
    }

    const getCartAmount = ()=>{
        let totalAmount = 0
        for(const items in cartItems){
            let itemInfo = products.find((product)=> product._id === items);
            for(const item in cartItems[items]){
                try {
                    if (cartItems[items][item] > 0) {
                        totalAmount += itemInfo.price * cartItems[items][item];
                    }
                } catch (error) {}
            }
        }
        return totalAmount;
    }

    const getProductData = async ()=>{
        setProducts(pd)
        // try {
        //     const response = await axios.get(backendUrl+'/api/product/list')
        //     if(response.data.success){
        //         setProducts(response.data.products)
        //     }else{
        //         toast.error(response.data.message)
        //     }
        // } catch (error) {
        //     console.log(error)
        //     toast.error(error.message)
        // }
    }

    const getUserCart = async (token)=>{
        try {
            const respone = await axios.post(backendUrl+'/api/cart/get',{}, {headers:{token}})
            if(respone.data.success){
                setCartItems(respone.data.cartData)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    useEffect(()=>{
        getProductData()
    },[])

    useEffect(() => {
        localStorage.setItem("save3d", save3d);
        console.log(localStorage.getItem("save3d"))
      }, [setSave3d]);

    useEffect (()=>{
        if (!token && localStorage.getItem('token') ) {
            setToken(localStorage.getItem('token'))
            getUserCart(localStorage.getItem('token'))
            console.log(userType)
            setUserType(localStorage.getItem("userTypeData"))
            console.log(userType)
        }
    },[])
    useEffect(() => {
        if (token) {
          const savedTotalOrders = localStorage.getItem("totalOrders");
          const savedTotalValue = localStorage.getItem("totalValue");
      
          if (savedTotalOrders) setTotalOrders(Number(savedTotalOrders));
          if (savedTotalValue) setOrderTotalValues(Number(savedTotalValue));
        }
      }, [token]);
      

    const value = {
        products ,currency, delivery_fee,
        search,setSearch,setShowSearch,showSearch,
        cartItems,
        addToCart,
        getCartCount,
        setCartItems,
        updateQuantity,
        getCartAmount,
        navigate,
        backendUrl,
        setToken, token,
        isCartOpen, toggleCart, setCartOpen ,
        registrationType, setRegistrationType,
        userType, setUserType,
        totalOrders , setTotalOrders,
        orderTotalValues, setOrderTotalValues,
        save3d, setSave3d,
        userContextData, setUserContextData
    }
    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;