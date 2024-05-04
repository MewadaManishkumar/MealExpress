'use client'

import React, { useState, useEffect } from "react";
import CustomerHeader from "../_components/CustomerHeader";
import Footer from "../_components/Footer";
import { DELIVERY_CHARGES, TAX } from "../lib/constant";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  const [removeCartData, setRemoveCartData] = useState();
  const [cartData, setCartData] = useState();
  const [cartStorage, setCartStorage] = useState();
  const [cartIds, setCartIds] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const localCart = JSON.parse(localStorage.getItem("cart")) || [];
      setCartStorage(localCart);
      setCartIds(localCart.map(cartItem => cartItem._id));
      setTotal(localCart.reduce((acc, item) => acc + item.price, 0));
    }
  }, []);

  const removeFromCart = (id) => {
    setRemoveCartData(id);
    const updatedCart = cartStorage.filter((item) => item._id !== id);
    if (typeof window !== "undefined") {
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }
    setCartStorage(updatedCart);
    setCartIds(updatedCart.map(cartItem => cartItem._id));
    const newTotal = updatedCart.reduce((acc, item) => acc + item.price, 0);
    setTotal(newTotal);
  };

  useEffect(() => {
    if (cartStorage?.length === 0) {
      router.push("/");
    }
  }, [cartStorage, router]);

  return (
    <div>
      <CustomerHeader cartData={cartData} removeCartData={removeCartData} />
      <div className="food-list-wrapper">
        {cartStorage?.length > 0 ? (
          cartStorage?.map((item) => (
            <div className="list-item" key={item._id}>
              <div className="list-item-block-1">
                <img style={{ width: 100 }} src={item.image_path} />
              </div>
              <div className="list-item-block-2">
                <div>{item.name}</div>
                <div className="description">{item.description}</div>
                {cartIds?.includes(item._id) ? (
                  <button onClick={() => removeFromCart(item._id)}>
                    Remove From Cart
                  </button>
                ) : (
                  <button onClick={() => addToCart(item)}>Add to Cart</button>
                )}
              </div>
              <div className="list-item-block-3">Price: {item.price}</div>
            </div>
          ))
        ) : (
          <h1>No Food Items for this Restaurant</h1>
        )}
      </div>
      <div className="total-wrapper">
        <div className="block-1">
          <div className="row">
            <span>Food Charges : </span>
            <span>{total}</span>
          </div>
          <div className="row">
            <span>Tax : </span>
            <span>{(total * TAX) / 100}</span>
          </div>
          <div className="row">
            <span>Delivery Charges : </span>
            <span>{DELIVERY_CHARGES}</span>
          </div>
          <div className="row">
            <span>Total Amount : </span>
            <span>{total + DELIVERY_CHARGES + (total * TAX) / 100}</span>
          </div>
        </div>
        <div className="block-2">
          <button>Order Now</button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Page;