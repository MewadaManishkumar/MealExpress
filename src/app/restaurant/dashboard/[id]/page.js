"use client";

import React, { useEffect, useState } from "react";
import { Input, Button, message } from "antd";
import { useRouter } from "next/navigation";
import { RollbackOutlined } from "@ant-design/icons";

const EditFoodItem = (props) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [imagePath, setImagePath] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetchFoodItem();
  }, []);

  const fetchFoodItem = async () => {
    try {
      let response = await fetch(
        `http://localhost:3000/api/restaurant/foods/edit/${props.params.id}`
      );
      response = await response.json();
      // Set the food item state
      if (response?.success) {
        setName(response?.data?.name);
        setPrice(response?.data?.price);
        setImagePath(response?.data?.image_path);
        setDescription(response?.data?.description);
      }
    } catch (error) {
      console.error("Error fetching food item:", error);
    }
  };

  const handleEditItem = async () => {
    if (!name || !price || !imagePath || !description) {
      setError(true);
      return;
    } else {
      setError(false);
    }
    try {
      let response = await fetch(
        `http://localhost:3000/api/restaurant/foods/edit/${props.params.id}`,
        {
          method: "PUT",
          body: JSON.stringify({ name, price, imagePath, description }),
        }
      );
      response = await response.json();
      // Set the food item state
      if (response?.success) {
        message.success("Food item  has been updated successfully!");
        router.push("../dashboard")
      }
    } catch (error) {
      message.error("Error in updating food item:");
    }
  };

  return (
    <div className="add-food-item-container">
      <div style={{ position: "absolute", top: 20, left: 20 }}>
        <Button
          type="default"
          size="large"
          icon={<RollbackOutlined />}
          onClick={() => router.push("../dashboard")}
        ></Button>
      </div>

      <h2>Update Food Item</h2>
      <div className="input-wrapper">
        <Input
          type="text"
          className="input-field"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter food item name"
          addonBefore="Name"
        />
        {error && !name && (
          <span className="input-error">Please enter a valid name</span>
        )}
      </div>
      <div className="input-wrapper">
        <Input
          className="input-field"
          type="number"
          value={price}
          maxLength={10}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Enter price"
          addonBefore="Price"
          prefix="₹"
        />
        {error && !price && (
          <span className="input-error">Please enter a valid price</span>
        )}
      </div>
      <div className="input-wrapper">
        <Input
          className="input-field"
          value={imagePath}
          onChange={(e) => setImagePath(e.target.value)}
          placeholder="Enter image path"
          addonBefore="Image Path"
        />
        {error && !imagePath && (
          <span className="input-error">Please enter a valid imagePath</span>
        )}
      </div>
      <div className="input-wrapper">
        <Input.TextArea
          className="input-field"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter description"
          rows={4}
          prefix="Description"
        />
        {error && !description && (
          <span className="input-error">Please enter a valid description</span>
        )}
      </div>
      <div className="input-wrapper">
        <Button className="antd-button" type="primary" onClick={handleEditItem}>
          Update
        </Button>
      </div>
    </div>
  );
};

export default EditFoodItem;
