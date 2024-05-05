'use client'

import { useEffect, useState } from "react";
import { Spin } from "antd"; // Import Spin component from antd
import CustomerHeader from "../../_components/CustomerHeader";
import { baseUrl } from "@/app/Utils";
import Footer from "@/app/_components/Footer";

const Page = (props) => {
  const name = props.params.name;
  const [loading, setLoading] = useState(true); // State to track loading state
  const [restaurantDetails, setRestaurantDetails] = useState();
  const [foodItems, setFoodItems] = useState([]);
  const [cartData, setCartData] = useState();
  const [cartStorage, setCartStorage] = useState([]);
  const [cartIds, setCartIds] = useState([]);
  const [removeCartData, setRemoveCartData] = useState();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const localCart = JSON.parse(localStorage.getItem("cart")) || [];
      setCartStorage(localCart);
      setCartIds(localCart.map(cartItem => cartItem._id));
    }
    loadRestaurantDetails();
  }, []);

  const addToCart = (item) => {
    const localCartIds = [...cartIds, item._id];
    setCartIds(localCartIds);
    setCartData(item);
    setRemoveCartData();
  };

  const removeFromCart = (id) => {
    setRemoveCartData(id);
    const updatedCart = cartStorage.filter((item) => item._id !== id);
    if (typeof window !== "undefined") {
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }
    setCartStorage(updatedCart);
    setCartIds(updatedCart.map(cartItem => cartItem._id));
  };

  const loadRestaurantDetails = async () => {
    const id = props.searchParams.id;
    let response = await fetch(`${baseUrl}api/customer/${id}`);
    response = await response.json();
    if (response.success) {
      setRestaurantDetails(response.details);
      setFoodItems(response.foodItems);
      setLoading(false); // Set loading to false when data is fetched
    }
  };

  return (
    <div>
      <CustomerHeader cartData={cartData} removeCartData={removeCartData} />
      <div className="restaurant-page-banner">
        <h1>{decodeURI(name)}</h1>
      </div>
      <div className="details-wrapper">
        <h4>Contact : {restaurantDetails?.contact}</h4>
        <h4>City:{restaurantDetails?.city}</h4>
        <h4>Address:{restaurantDetails?.address}</h4>
        <h4>Email:{restaurantDetails?.email}</h4>
      </div>
      <div className="food-list-wrapper">
        {loading ? ( // Check loading state
          <Spin /> // Show loading spinner if data is still loading
        ) : foodItems && foodItems.length > 0 ? ( // Check if foodItems is not null or undefined
          foodItems.map((item) => (
            <div className="list-item">
              <div>
                <img style={{ width: 100 }} src={item.image_path} />
              </div>
              <div>
                <div>{item.name}</div>
                <div>{item.price}</div>
                <div className="description">{item.description}</div>
                {cartIds.includes(item._id) ? (
                  <button onClick={() => removeFromCart(item._id)}>
                    Remove From Cart
                  </button>
                ) : (
                  <button onClick={() => addToCart(item)}>Add to Cart</button>
                )}
              </div>
            </div>
          ))
        ) : (
          <h1>No Food Items for this Restaurant</h1>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Page;