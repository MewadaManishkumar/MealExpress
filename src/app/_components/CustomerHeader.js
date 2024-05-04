import { Layout, Menu, Image } from "antd";
import {
  HomeOutlined,
  UserOutlined,
  ShoppingCartOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

const { Header } = Layout;

const CustomerHeader = (props) => {
  const isLocalStorageAvailable = typeof localStorage !== 'undefined';
  const cartStorage = isLocalStorageAvailable ? JSON.parse(localStorage.getItem("cart")) : null;  
  const [cartNumber, setCartNumber] = useState(cartStorage?.length || 0);
  const [cartItem, setCartItem] = useState(cartStorage || []);
  const router = useRouter();

  useEffect(() => {
    if (props.cartData && isLocalStorageAvailable) {
      if (cartNumber) {
        if (cartItem[0]?.resto_id !== props.cartData.resto_id) {
          localStorage.removeItem("cart");
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
          src="https://i.ibb.co/MBLy2M8/Meal-Express.png"
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
            label:(
              <Link
                href='/'
                style={{ color: "inherit", textDecoration: "none" }}
              >
                Home
              </Link>
            ),
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
            label: (
              <Link
                href={cartNumber ? "/cart" : "#"}
                style={{ color: "inherit", textDecoration: "none" }}
              >
                Cart({cartNumber ? cartNumber : 0})
              </Link>
            ),
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
