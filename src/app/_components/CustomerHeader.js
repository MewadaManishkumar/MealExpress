"use client";
import { Layout, Menu, Image, Button, message } from "antd";
import {
  HomeOutlined,
  UserOutlined,
  ShoppingCartOutlined,
  PlusOutlined,
  LogoutOutlined,
  LoginOutlined,
  ProfileOutlined,
  CarOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

const { Header } = Layout;

const CustomerHeader = (props) => {
  const isLocalStorageAvailable = typeof localStorage !== "undefined";
  const userStorage = isLocalStorageAvailable
    ? JSON.parse(localStorage.getItem("user"))
    : null;
  const cartStorage = isLocalStorageAvailable
    ? JSON.parse(localStorage.getItem("cart"))
    : null;
  const [user, setUser] = useState(userStorage ? userStorage : undefined);
  const [cartNumber, setCartNumber] = useState(cartStorage?.length || 0);
  const [cartItem, setCartItem] = useState(cartStorage || []);
  const router = useRouter();

  useEffect(() => {
    if (props.cartData && isLocalStorageAvailable) {
      if (cartNumber) {
        if (cartItem[0]?.resto_id !== props.cartData.resto_id) {
          localStorage?.removeItem("cart");
          setCartNumber(1);
          setCartItem([props.cartData]);
          localStorage.setItem("cart", JSON.stringify([props.cartData]));
        } else {
          let localCartItem = [...cartItem];
          localCartItem.push(JSON.parse(JSON.stringify(props.cartData)));
          setCartItem(localCartItem);
          setCartNumber(cartNumber + 1);
          localStorage.setItem("cart", JSON.stringify(localCartItem));
        }
      } else {
        setCartNumber(1);
        setCartItem([props.cartData]);
        localStorage.setItem("cart", JSON.stringify([props.cartData]));
      }
    }
  }, [props.cartData, isLocalStorageAvailable]);

  useEffect(() => {
    if (props.removeCartData && isLocalStorageAvailable) {
      let localCartItem = cartItem.filter((item) => {
        return item._id !== props.removeCartData;
      });
      setCartItem(localCartItem);
      setCartNumber(cartNumber - 1);
      localStorage.setItem("cart", JSON.stringify(localCartItem));
      if (localCartItem.length === 0) {
        localStorage.removeItem("cart");
      }
    }
  }, [props.removeCartData, isLocalStorageAvailable]);

  useEffect(() => {
    if (props?.isOrderPlaced) {
      setCartItem([]);
      setCartNumber(0);
      localStorage.removeItem("cart");
      props?.setIsOrderPlaced(false);
    }
  }, [props?.isOrderPlaced, props?.setIsOrderPlaced]);

  const logout = () => {
    localStorage.removeItem("user");
    router.push("/user-auth");
  };

  const handleCartClick = () => {
    if (cartNumber === 0) {
      message.info("Cart is empty.");
    } else {
      router.push("/cart");
    }
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
          src="https://i.ibb.co/mFL7R3Q/Meal-Express.png"
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
            label: (
              <Link
                href="/"
                style={{ color: "inherit", textDecoration: "none" }}
              >
                Home
              </Link>
            ),
            style: { width: "100px" },
          },
          {
            key: "cart",
            icon: <ShoppingCartOutlined />,
            label: (
              <span onClick={handleCartClick} style={{ cursor: "pointer" }}>
                Cart({cartNumber ? cartNumber : 0})
              </span>
            ),
            style: { width: "100px" },
          },
          {
            key: "addRestaurant",
            icon: <PlusOutlined />,
            label: "Add Restaurant",
            style: { width: "150px" },
          },
          user && {
            key: "logout",
            icon: <LogoutOutlined />,
            label: (
              <Button
                type="text"
                onClick={logout}
                style={{ color: "inherit", background: "none", padding: 0 }}
              >
                Logout
              </Button>
            ),
            style: { width: "100px" },
          },
          {
            key: "deliverypartner",
            icon: <CarOutlined />,
            label: (
              <Link
                href="/deliverypartner"
                style={{ color: "inherit", textDecoration: "none" }}
              >
                Delivery Partner
              </Link>
            ),
            style: { width: "140px" },
          },
          user && {
            key: "profile",
            icon: <ProfileOutlined />,
            label: (
              <Link
                href="/myprofile"
                style={{ color: "inherit", textDecoration: "none" }}
              >
                {user.name}
              </Link>
            ),
            style: { width: "100px" },
          },
          !user && {
            key: "login",
            icon: <LoginOutlined />,
            label: (
              <>
                <Link
                  href="/user-auth"
                  style={{ color: "inherit", textDecoration: "none" }}
                >
                  Login
                </Link>
              </>
            ),
            style: { width: "100px" },
          },
          !user && {
            key: "signup",
            icon: <UserOutlined />,
            label: (
              <Link
                href="/user-auth"
                style={{ color: "inherit", textDecoration: "none" }}
              >
                SignUp
              </Link>
            ),
            style: { width: "100px" },
          },
        ]}
      />
    </Header>
  );
};

export default CustomerHeader;
