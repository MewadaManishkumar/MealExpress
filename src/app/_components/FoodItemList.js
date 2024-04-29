import React, { useState, useEffect } from "react";
import { Button, Image, Table, message } from "antd";
import { useRouter } from "next/navigation";

const FoodItemList = () => {
  const [foodData, setFoodData] = useState();
  const router = useRouter();

  const columns = [
    {
      title: "Sr. No.",
      key: "index",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Image",
      dataIndex: "image_path",
      key: "image_path",
      render: (text) => (
        <Image src={text} alt="Food Item" width="100px" preview={false} />
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <>
          <Button type="primary" style={{ marginRight: "8px" }} onClick={()=> router.push(`dashboard/${record._id}`)}>
            Edit
          </Button>
          <Button type="primary" danger onClick={() => handleDelete(record._id)}>
            Delete
          </Button>
        </>
      ),
    },
  ];

  let restaurantData = [];
  if (typeof window !== "undefined") {
    const storedData = localStorage.getItem("restaurantUser");
    if (storedData) {
      restaurantData = JSON.parse(storedData);
    }
  }
  const resto_id = restaurantData?._id;

  const fetchFoodData = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/restaurant/foods/${resto_id}`
      );
      const responseData = await response.json();
      setFoodData(responseData?.data);
    } catch (error) {
      console.error("Error fetching food data:", error);
    }
  };

  useEffect(() => {
    fetchFoodData();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/restaurant/foods/${id}`, {
        method: "DELETE",
      });
      const data = await response.json();
      if (data.success) {
        setFoodData(data.data)
        message.success({ content: "Item deleted successfully" })
      } else {
        console.error("Error deleting food item:", data.message);
      }
    } catch (error) {
      console.error("Error deleting food item:", error);
    }
  };
  return (
    <Table
      columns={columns}
      dataSource={foodData}
      rowKey={(record) => record._id || record.id}
    />
  );
};

export default FoodItemList;
