"use client";
import RestaurantHeader from "@/app/_components/RestaurantHeader";
import "./../style.css";
import AddFoodItem from "@/app/_components/AddFoodItem";
import React, { useState } from "react";
const FoodItemListLazy = React.lazy(() =>import("@/app/_components/FoodItemList"));
import { Button } from "antd";
import {
  AreaChartOutlined,
  PlusSquareOutlined,
} from "@ant-design/icons";
const Dashboard = () => {
  const [addItem, setAddItem] = useState(false);
  
  return (
    <div>
      <RestaurantHeader />
      <Button type={addItem ? "primary" : "default"} style={{ margin: "15px" }} onClick={() => setAddItem(true)}>
        <PlusSquareOutlined style={{ fontSize: "15px" }} />
        Add Item
      </Button>
      <Button type={!addItem ? "primary" : "default"} style={{ margin: "15px" }} onClick={() => setAddItem(false)}>
        <AreaChartOutlined style={{ fontSize: "15px" }} />
        Dashboard
      </Button>
      {addItem ? (
        <AddFoodItem setAddItem={setAddItem} />
      ) : (
        <React.Suspense fallback={<div>Loading...</div>}><FoodItemListLazy /></React.Suspense>
      )}
    </div>
  );
};

export default Dashboard;
