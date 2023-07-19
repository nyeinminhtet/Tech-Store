import { useState, useEffect, createContext, useContext } from "react";
import { toast } from "react-hot-toast";

const Context = createContext();

export const StateContext = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [Qty, setQty] = useState(1);

  let foundProduct;

  const addItem = (product, quantity) => {
    const checkProductInCart = cartItems.find(
      (item) => item._id === product._id
    );

    setTotalPrice((pre) => pre + product.price * quantity);
    setTotalQuantities((pre) => pre + quantity);

    if (checkProductInCart) {
      const updateCartItems = cartItems.map((item) => {
        if (item._id === product._id)
          return {
            ...item,
            quantity: item.quantity + quantity,
          };
      });

      setCartItems(updateCartItems);
    } else {
      product.quantity = quantity;
      setCartItems([...cartItems, { ...product }]);
    }
    toast.success(`${Qty} ${product.name} added to the cart`);
  };

  const increQty = () => {
    setQty((pre) => pre + 1);
  };

  const decQty = () => {
    setQty((pre) => {
      if (pre - 1 < 1) return 1;
      return pre - 1;
    });
  };

  const removeItem = (product) => {
    foundProduct = cartItems.find((item) => item._id === product._id);
    const newCartItem = cartItems.filter((item) => item._id !== product._id);

    setTotalPrice((pre) => pre - foundProduct.price * foundProduct.quantity);
    setTotalQuantities((pre) => pre - foundProduct.quantity);
    setCartItems(newCartItem);
  };

  const toggleCartItemQuantity = (id, value) => {
    foundProduct = cartItems.find((item) => item._id === id);

    if (value === "inc") {
      const updateData = cartItems.map((item) =>
        item._id === id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCartItems(updateData);
      setTotalPrice((pre) => pre + foundProduct.price);
      setTotalQuantities((pre) => pre + 1);
    } else if (value === "dec") {
      if (foundProduct.quantity > 1) {
        const updateData = cartItems.map((item) =>
          item._id === id ? { ...item, quantity: item.quantity + 1 } : item
        );
        setCartItems(updateData);
        setTotalPrice((pre) => pre - foundProduct.price);
        setTotalQuantities((pre) => pre - 1);
      }
    }
  };

  return (
    <Context.Provider
      value={{
        showCart,
        cartItems,
        totalPrice,
        totalQuantities,
        Qty,
        increQty,
        decQty,
        addItem,
        setShowCart,
        setCartItems,
        toggleCartItemQuantity,
        removeItem,
        setTotalQuantities,
        setTotalPrice,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
