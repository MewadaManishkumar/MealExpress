'use client'

import { Layout, Menu, Image } from "antd";
import {
  HomeOutlined,
  UserOutlined,
  ShoppingCartOutlined,
  PlusOutlined,
} from "@ant-design/icons";

const { Header } = Layout;

const CustomerHeader = () => {
  return (
    <Header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "white",
      }}
    >
      <div className="logo">
        <Image
          preview={false}
          width={120}
          src="https://i.ibb.co/FJLb1jv/Meal-Express.png"
          alt="Logo"
        />
      </div>
      <Menu
        mode="horizontal"
        style={{
          lineHeight: "80px",
          display: "flex",
          alignItems: "center",
        }}
        items={[
          {
            key: "home",
            icon: <HomeOutlined />,
            label: "Home",
            style: { width: "100px" },
          },
          {
            key: "login",
            icon: <UserOutlined />,
            label: "Login",
            style: { width: "100px" },
          },
          {
            key: "signup",
            icon: <UserOutlined />,
            label: "SignUp",
            style: { width: "100px" },
          },
          {
            key: "cart",
            icon: <ShoppingCartOutlined />,
            label: "Cart(0)",
            style: { width: "100px" },
          },
          {
            key: "addRestaurant",
            icon: <PlusOutlined />,
            label: "Add Restaurant",
            style: { width: "120px" },
          },
        ]}
      />
    </Header>
  );
};

export default CustomerHeader;
