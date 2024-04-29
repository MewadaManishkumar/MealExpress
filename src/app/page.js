'use client'
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Input, Typography, Dropdown, Menu } from "antd";
import CustomerHeader from "./_components/CustomerHeader";
import Footer from "./_components/Footer";
import { CloseCircleOutlined } from '@ant-design/icons';

export default function Home() {
  const [locations, setLocations] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [showLocation, setShowLocation] = useState(false);
  const router = useRouter();

  useEffect(() => {
    loadLocations();
    loadRestaurants();
  }, []);

  const loadLocations = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/customer/locations");
      const data = await response.json();
      if (data.success) {
        setLocations(data.result);
      }
    } catch (error) {
      console.error("Error loading locations:", error);
    }
  };

  const loadRestaurants = async (params) => {
    let url = "http://localhost:3000/api/customer";
    if (params?.location) {
      url += `?location=${params.location}`;
    } else if (params?.restaurant) {
      url += `?restaurant=${params.restaurant}`;
    }
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data?.success) {
        setRestaurants(data.result);
      }
    } catch (error) {
      console.error("Error loading restaurants:", error);
    }
  };

  const handleListItem = (item) => {
    setSelectedLocation(item);
    setShowLocation(false);
    loadRestaurants({ location: item });
  };

  const handleClearSelection = () => {
    setSelectedLocation(""); // Clear the selected location
    loadRestaurants(); // Reload all data
  };
  // Menu for locations dropdown
  const menu = (
    <Menu>
      {locations.map((location) => (
        <Menu.Item key={location} onClick={() => handleListItem(location)}>
          {location}
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <main>
      <CustomerHeader />
      <div className="main-page-banner">
        <Typography.Title style={{ color: "white" }}>
          Food Delivery App
        </Typography.Title>
        <div className="input-wrapper">
          <Dropdown overlay={menu} trigger={["click"]} placement="bottomLeft">
            <Input
              type="text"
              value={selectedLocation}
              className="select-input"
              placeholder="Select Place"
              readOnly
              suffix={selectedLocation && <CloseCircleOutlined onClick={handleClearSelection} />}
            />
          </Dropdown>
          <Input
            type="text"
            className="search-input"
            onChange={(event) => {
              const searchValue = event.target.value;
              loadRestaurants({ restaurant: searchValue });
            }}
            placeholder="Enter food or restaurant name"
          />
        </div>
      </div>
      <div className="restaurant-list-container">
        {restaurants.map((item) => (
          <div
            key={item._id}
            onClick={() => router.push(`explore/${item.name}?id=${item._id}`)}
            className="restaurant-wrapper"
          >
            <div className="heading-wrapper">
              <Typography.Title level={3}>{item.name}</Typography.Title>
              <Typography.Text>Contact: {item.contact}</Typography.Text>
            </div>
            <div className="address-wrapper">
              <div>{item.city},</div>
              <div className="address">
                {item.address}, Email: {item.email}
              </div>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </main>
  );
}
