import React, { useState } from "react";
import { Input, Button, message } from "antd";

const AddFoodItem = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [imagePath, setImagePath] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(false);

  const handleAddItem = async () => {
    
    // Perform validation checks here
    if (!name || !price || !imagePath || !description) {
      setError(true)
      // message.error("Please fill in all the required fields.");
      return;
    }else{
      setError(false);
    }
    let resto_id;
    const restaurantData = JSON.parse(localStorage.getItem("restaurantUser"));
    if (restaurantData) {
      resto_id = restaurantData._id;
    }
    let response = await fetch("http://localhost:3000/api/restaurant/foods", {
      method: "POST",
      body: JSON.stringify({
        name,
        price,
        image_path: imagePath,
        description,
        resto_id,
      }),
    });

    response = await response.json();
    if (response.success) {
      message.success("Food item added successfully!");
    } else{
      message.error("Food item not added ");
    }

    // Reset the input fields
    setName("");setPrice("");setImagePath("");setDescription("");
  };

  return (
    <div className="add-food-item-container">
      <h2>Add Food Item</h2>

      <div className="input-wrapper">
        <Input
          type="text"
          className="input-field"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter food item name"
          addonBefore="Name"
        />
        {error && !name && <span className="input-error">Please enter a valid name</span>}
      </div>
      <div className="input-wrapper">
        <Input
          className="input-field"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Enter price"
          addonBefore="Price"
          prefix="₹"
        />
        {error && !price && <span className="input-error">Please enter a valid price</span>}
      </div>
      <div className="input-wrapper">
        <Input
          className="input-field"
          value={imagePath}
          onChange={(e) => setImagePath(e.target.value)}
          placeholder="Enter image path"
          addonBefore="Image Path"
        />
        {error && !imagePath && <span className="input-error">Please enter a valid imagePath</span>}
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
        {error && !description && <span className="input-error">Please enter a valid description</span>}
      </div>
      <div className="input-wrapper">
        <Button className="antd-button" type="primary" onClick={handleAddItem}>
          Add
        </Button>
      </div>
    </div>
  );
};

export default AddFoodItem;
