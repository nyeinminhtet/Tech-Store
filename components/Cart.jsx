import React, { useRef } from "react";
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineLeft,
  AiOutlineShopping,
} from "react-icons/ai";
import Link from "next/link";
import { TiDeleteOutline } from "react-icons/ti";
import { toast } from "react-hot-toast";

import { useStateContext } from "../context/StateContext";
import { urlFor } from "../libs/client";
import getStripe from "../libs/getStripe";
import { config } from "../config";

const Cart = () => {
  const cartRef = useRef();
  const {
    totalPrice,
    totalQuantities,
    cartItems,
    setShowCart,
    toggleCartItemQuantity,
    removeItem,
  } = useStateContext();

  //checkout payment
  const handleCheckOut = async () => {
    const stripe = await getStripe();

    const response = await fetch("/api/stripe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cartItems),
    });

    if (response.statusCode === 500) return;

    const data = await response.json();
    toast.loading("Please wait ...");

    stripe.redirectToCheckout({ sessionId: data.id });
  };

  return (
    <div className="cart-wrapper" ref={cartRef}>
      <div className="cart-container">
        <button
          type="button"
          onClick={() => setShowCart(false)}
          className="cart-heading"
        >
          <AiOutlineLeft />
          <span className="heading">Your cart</span>
          <span className="cart-num-items">({totalQuantities} items)</span>
        </button>

        {cartItems.length < 1 && (
          <div className="empty-cart">
            <AiOutlineShopping size={150} />
            <h3>Your shopping bag is empty!</h3>
            <Link href="/">
              <button
                type="button"
                className="btn"
                onClick={() => setShowCart(false)}
              >
                Continue Shopping
              </button>
            </Link>
          </div>
        )}

        {/* products */}
        {cartItems.length >= 1 &&
          cartItems.map((cartItem, i) => (
            <div className="product" key={i}>
              <img
                src={urlFor(cartItem?.image[0])}
                className="cart-product-image"
              />
              <div className="item-desc">
                <div className="flex top">
                  <h5>{cartItem.name}</h5>
                  <h4>${cartItem.price}</h4>
                </div>
                <div className="flex botton">
                  <div>
                    <p className="quantity-desc">
                      <span
                        className="minus"
                        onClick={() =>
                          toggleCartItemQuantity(cartItem._id, "dec")
                        }
                      >
                        <AiOutlineMinus />
                      </span>
                      <span className="num">{cartItem.quantity}</span>
                      <span
                        className="plus"
                        onClick={() =>
                          toggleCartItemQuantity(cartItem._id, "inc")
                        }
                      >
                        <AiOutlinePlus />
                      </span>
                    </p>
                  </div>

                  <button
                    className="remove-item"
                    type="button"
                    onClick={() => removeItem(cartItem)}
                  >
                    <TiDeleteOutline />
                  </button>
                </div>
              </div>
            </div>
          ))}

        {cartItems.length >= 1 && (
          <div className="cart-bottom">
            <div className="total">
              <h3>TotalPrice:</h3>
              <h3>${totalPrice}</h3>
            </div>
            <div className="btn-container">
              <button type="button" className="btn" onClick={handleCheckOut}>
                Pay
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
