import { useState,useEffect ,useMemo} from "react";
import { API_URL } from "../constans";
const useCart = () => {

    const initialCart = () => {
        const localStorageCart = localStorage.getItem("cart");
        return localStorageCart ? JSON.parse(localStorageCart) : []
        //si localstorage tiene algo, lo parseamos, si no, devolvemos un arreglo vacio
      }
      
        const [guitars, setGuitars] = useState([]);
        const [cart, setCart] = useState(initialCart);
      
        const MAX_ITEMS = 5;
        const MIN_ITEMS = 1;
      
        useEffect(() => {
          localStorage.setItem("cart", JSON.stringify(cart));
          peticion();
        }, [cart]);
      
      
      
        function addToCart(item) {
          const itemExistets = cart.findIndex((guitar) => guitar.id === item.id);
          if (itemExistets >= 0) {
            if (cart[itemExistets].quantity >= MAX_ITEMS) return;
            const updateCart = [...cart];
            updateCart[itemExistets].quantity++;
            setCart(updateCart);
          } else {
            item.quantity = 1;
            setCart([...cart, item]);
          }
        }
      
        const peticion = async () => {
          try {
            const res = await fetch(`${API_URL}/guitarras`);
            const data = await res.json();
            setGuitars(data);
          } catch (err) {
            console.log("ERROR", err.message);
          }
        };
      
        function removeFromCart(id) {
          setCart((prevCart) => prevCart.filter((guitar) => guitar.id !== id));
          //eliminar la primera id que coincida
          //devulve las que son diferentes a las que presionamos
        }
      
        function increaseQuantity(id) {
          const updateCart = cart.map((item) => {
            if (item.id === id && item.quantity < MAX_ITEMS) {
              return {
                ...item,
                quantity: item.quantity + 1,
              };
            }
            return item;
          });
          setCart(updateCart);
        }
      
        function decreaseQuantity(id) {
          const updateCart = cart.map((item) => {
            if (item.id === id && item.quantity > MIN_ITEMS) {
              return {
                ...item,
                quantity: item.quantity - 1,
              };
            }
            return item;
          });
          setCart(updateCart);
        }
      
        function clearCart() {
          setCart([]); //setiar arreglo vacio
        }
        const isEmpty = useMemo(() => cart.length === 0, [cart]);

        const cartTotal = useMemo(
          () => cart.reduce((t, item) => t + item.quantity * item.price, 0),
          [cart]
        );
      
        const totalItems = useMemo(
          () => cart.reduce((t, item) => t + item.quantity, 0),
          [cart]
        );


    return{
        guitars,
        cart,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        isEmpty,
        cartTotal,
        totalItems

    }
}


export default useCart;