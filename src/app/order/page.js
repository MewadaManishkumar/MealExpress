"use client";
import { useEffect, useState } from "react";
import CustomerHeader from "../_components/CustomerHeader";
import Footer from "../_components/Footer";
import { DELIVERY_CHARGES, TAX } from "../lib/constant";
import { useRouter } from "next/navigation";
import { message } from "antd";
import { baseUrl } from "../Utils"

const Page = () => {
  const [userStorage, setUserStorage] = useState();
  const [cartStorage, setCartStorage] = useState();
  const [total, setTotal] = useState(0);
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const localCart = JSON.parse(localStorage?.getItem("cart")) || [];
      const localUser = JSON.parse(localStorage?.getItem("user")) || [];
      if (localCart?.length === 0) {
        // If cart is empty, navigate to the root URL
        router.push("/");
        return;
      }
      setCartStorage(localCart);
      setUserStorage(localUser);
      setTotal(localCart?.reduce((acc, item) => acc + item.price, 0));
    }
  }, []);

  const orderNow = async () => {
    let user_id = JSON.parse(localStorage?.getItem("user"))._id;
    let city = JSON.parse(localStorage?.getItem("user")).city;
    let cart = JSON.parse(localStorage?.getItem("cart"));
    let foodItemIds = cart.map((item) => item._id).toString();
    let deliveryBoyResponse = await fetch(`${baseUrl}api/deliverypartners/${city}`);
        deliveryBoyResponse = await deliveryBoyResponse.json();
        let deliveryBoyIds = deliveryBoyResponse.result.map((item) => item._id);

        let deliveryBoy_id = deliveryBoyIds[Math.floor(Math.random() * deliveryBoyIds.length)]
        if (!deliveryBoy_id) {
            message.info("Delivery partner not available ")
            return false;
        }

    let resto_id = cart[0].resto_id;
    let collection = {
      user_id,
      resto_id,
      foodItemIds,
      deliveryBoy_id,
      status: "confirm",
      amount: total + DELIVERY_CHARGES + (total * TAX) / 100,
    };

    let response = await fetch(`${baseUrl}api/order`, {
      method: "POST",
      body: JSON.stringify(collection),
    });
    response = await response.json();

    if (response.success) {
      setIsOrderPlaced(true); // Set isOrderPlaced to true after successful order placement
      message.success("Your order has been placed");
      router.push("myprofile");
    } else {
      message.error("Order failed");
    }
  };

  // Render the component only if the cart is not empty
  if (cartStorage && cartStorage.length > 0) {
    return (
      <div>
        <CustomerHeader isOrderPlaced={isOrderPlaced} setIsOrderPlaced={setIsOrderPlaced} />
        <div className="total-wrapper">
          <div className="block-1">
            <h2>User Details</h2>
            <div className="row">
              <span>Name </span>
              <span>{userStorage?.name}</span>
            </div>
            <div className="row">
              <span>address </span>
              <span>{userStorage?.address}</span>
            </div>
            <div className="row">
              <span>Mobile </span>
              <span>{userStorage?.mobile}</span>
            </div>
            <h2>Amount Details</h2>
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
            <h2>Payment Methods</h2>
            <div className="row">
              <span>Cash on Delivery : </span>
              <span>{total + DELIVERY_CHARGES + (total * TAX) / 100}</span>
            </div>
          </div>
          <div className="block-2">
            <button onClick={orderNow}>Place your Order Now</button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  return null;
};

export default Page;