"use client";
import { useEffect, useRef } from "react";
import DeliveryHeader from "../DeliveryHeader";
import { useRouter } from "next/navigation";
import { message } from "antd";

const Page = () => {
  const router = useRouter();
  const messageDisplayedRef = useRef(false);

  useEffect(() => {
    const delivery = JSON.parse(localStorage?.getItem("delivery"));
    if (!delivery && !messageDisplayedRef.current) {
      router.push("/deliverypartner");
      messageDisplayedRef.current = true;
      message.error("Delivery Partner Is Not Logged In");
    }
  }, []);

  return (
    <div>
      <DeliveryHeader />
      <h1>DeliveryDashboard page</h1>
    </div>
  );
};

export default Page;
