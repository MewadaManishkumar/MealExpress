'use client'
import RestaurantHeader from "@/app/_components/RestaurantHeader";
import './../style.css'
import AddFoodItem from "@/app/_components/AddFoodItem";
import { useState } from "react";
const Dashboard = () => {
    const [addItem, setAddItem] = useState(false);
    return (<div>
        <RestaurantHeader />
        <button style={{marginTop: "30px"}} onClick={()=>setAddItem(true)}>Add Item</button>
        <button style={{marginLeft: "30px"}} onClick={()=>setAddItem(false)}>Dashboard</button>
        {addItem? <AddFoodItem /> : <h1>Restaurant Dashboard</h1>}
    </div>)
}

export default Dashboard;