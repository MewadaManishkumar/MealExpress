"use client";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Layout, Menu, Button, Row, Col, Image } from "antd";
import Link from "next/link";
import { LogoutOutlined, HomeOutlined, UserOutlined } from "@ant-design/icons";

const { Header } = Layout;

const RestaurantHeader = () => {
  const [details, setDetails] = useState();
  const [headerHeight, setHeaderHeight] = useState(64); // Default height of the Header
  const pathName = usePathname();
  const router = useRouter();

  useEffect(() => {
    const data = localStorage.getItem("restaurantUser");
    if (!data && pathName === "/restaurant/dashboard") {
      router.push("/restaurant");
    } else if (data && pathName === "/restaurant") {
      router.push("/restaurant/dashboard");
    }
    if (data) {
      setDetails(JSON.parse(data));
    }

    // Dynamically set Header height
    const headerElement = document.querySelector("header.ant-layout-header");
    if (headerElement) {
      setHeaderHeight(headerElement.clientHeight);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("restaurantUser");
    router.push("/restaurant");
  };

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
            label: <Link href="/">Home</Link>,
            icon: <HomeOutlined />,
            style: { width: "100px" },
          },
          ...(details && details.name
            ? [
                {
                  key: "profile",
                  label: <Link href="/">Profile</Link>,
                  icon: <UserOutlined />,
                  style: { width: "100px" },
                },
                {
                  key: "logout",
                  label: <Link href="/restaurant">Logout</Link>,
                  icon: <LogoutOutlined />,
                  style: { width: "100px" },
                  onClick: logout,
                },
              ]
            : [
                {
                  key: "login",
                  label: <Link href="/">Login/SignUp</Link>,
                  icon: <UserOutlined />,
                  style: { width: "100px" },
                },
              ]),
        ]}
      />
    </Header>
  );
};

export default RestaurantHeader;
