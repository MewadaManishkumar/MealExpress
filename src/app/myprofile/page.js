"use client";
import { useEffect, useState } from "react";
import { Spin } from "antd";

import CustomerHeader from "../_components/CustomerHeader";
import Footer from "../_components/Footer";
import { baseUrl } from "../Utils";

const Page = () => {
  const [myOrders, setMyOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getMyOrders();
  }, []);

  const getMyOrders = async () => {
    setIsLoading(true);
    const userStorage = JSON.parse(localStorage?.getItem("user"));
    let response = await fetch(
      `${baseUrl}api/order?id=${userStorage._id}`
    );
    response = await response.json();
    if (response.success) {
      setMyOrders(response.result);
    }
    setIsLoading(false);
  };

  return (
    <div>
      <CustomerHeader />
      {isLoading ? (
        <div className="loading-spinner">
          <Spin size="large" />
        </div>
      ) : (
        myOrders.map((item) => (
          <div
            className="restaurant-wrapper"
            style={{ marginLeft: "auto", marginRight: "auto" }}
          >
            <h4>Name: {item.data.name}</h4>
            <div>Amount:{item.amount}</div>
            <div>Address:{item.data.address}</div>
            <div>Status:{item.status}</div>
          </div>
        ))
      )}
      <Footer />
    </div>
  );
};

export default Page;