"use client";
import { Layout, Menu, Image, Button } from "antd";
import { HomeOutlined, CarOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import Link from "next/link";

const { Header } = Layout;

const DeliveryHeader = (props) => {
  const router = useRouter();

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
          width={100}
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
        ]}
      />
    </Header>
  );
};

export default DeliveryHeader;
