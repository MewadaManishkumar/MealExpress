"use client";
import { Input, Button, message } from "antd";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import DeliveryHeader from "../DeliveryHeader";
import { baseUrl } from "../Utils";

const Page = () => {
  const [loginMobile, setLoginMobile] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [mobile, setMobile] = useState("");
  const router = useRouter();
  const messageDisplayedRef = useRef(false);
  const [error, setError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [showLogin, setShowLogin] = useState(true);

  useEffect(() => {
    const delivery = JSON.parse(localStorage?.getItem("delivery"));
    if (delivery && !messageDisplayedRef.current) {
      message.info("Delivery Partner Already Logged In");
      messageDisplayedRef.current = true;
      router.push("/deliverydashboard");
    }
  }, []);

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      setPasswordError(true);
      return false;
    } else {
      setPasswordError(false);
    }
    if (
      !name ||
      !mobile ||
      !password ||
      !confirmPassword ||
      !city ||
      !address
    ) {
      setError(true);
      return false;
    } else {
      setError(false);
    }
    try {
      let response = await fetch(`${baseUrl}api/deliverypartners/signup`, {
        method: "POST",
        body: JSON.stringify({ name, mobile, password, city, address }),
      });
      response = await response?.json();
      if (response.success) {
        const { result } = response;
        delete result.password;
        localStorage.setItem("delivery", JSON.stringify(result));
        message.success("Signup Successfully");
        router.push("/deliverydashboard");
      } else {
        message.error("Signup failed");
      }
    } catch (error) {
      message.error("Something went wrong, please try again later.");
    }
  };

  const loginHandle = async () => {
    try {
      let response = await fetch(`${baseUrl}api/deliverypartners/login`, {
        method: "POST",
        body: JSON.stringify({ mobile: loginMobile, password: loginPassword }),
      });
      response = await response?.json();

      if (response.success) {
        const { result } = response;
        delete result.password;
        localStorage?.setItem("delivery", JSON.stringify(result));
        message.success("Login Successfully");
        router.push("/deliverydashboard");
      } else {
        message.error(
          "Failed to login. Please try again with valid mobile and password"
        );
      }
    } catch (error) {
      message.error("Something went wrong, please try again later.");
    }
  };

  return (
    <div className="container">
      <DeliveryHeader />
      <h1>Delivery Partner</h1>
      {showLogin ? (
        <div>
          <h2>Login Page</h2>
          <div className="input-wrapper">
            <Input
              type="text"
              placeholder="Enter mobile"
              value={loginMobile}
              onChange={(event) => setLoginMobile(event.target.value)}
              className="input-field"
              style={{ border: "1px solid #595959" }}
            />
            {error && !loginMobile && (
              <span className="input-error">Please enter a valid mobile</span>
            )}
          </div>
          <div className="input-wrapper">
            <Input.Password
              placeholder="Enter password"
              value={loginPassword}
              onChange={(event) => setLoginPassword(event.target.value)}
              className="input-field"
              style={{ border: "1px solid #595959" }}
            />
            {error && !loginPassword && (
              <span className="input-error">Please enter a valid password</span>
            )}
          </div>
          <div className="input-wrapper">
            <Button
              type="primary"
              className="antd-button"
              onClick={loginHandle}
            >
              Login
            </Button>
          </div>
          <div>
            <button
              className="button-link"
              onClick={() => setShowLogin(!showLogin)}
            >
              {showLogin
                ? "Do not have account? SignUp"
                : "Already have Account? Login"}
            </button>
          </div>
        </div>
      ) : (
        <div>
          <h2>Signup Page</h2>
          <div className="input-wrapper">
            <Input
              type="text"
              placeholder="Enter name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="input-field"
              style={{ border: "1px solid #595959" }}
            />
            {error && !name && (
              <span className="input-error">Please enter a valid name</span>
            )}
          </div>
          <div className="input-wrapper">
            <Input
              type="text"
              placeholder="Enter mobile"
              value={mobile}
              onChange={(event) => setMobile(event.target.value)}
              className="input-field"
              style={{ border: "1px solid #595959" }}
            />
            {error && !mobile && (
              <span className="input-error">Please enter a valid mobile</span>
            )}
          </div>

          <div className="input-wrapper">
            <Input.Password
              placeholder="Enter password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="input-field"
              style={{ border: "1px solid #595959" }}
            />
            {passwordError && (
              <span className="input-error">
                Password and Confirm password do not match
              </span>
            )}
            {error && !password && (
              <span className="input-error">Please enter a valid password</span>
            )}
          </div>
          <div className="input-wrapper">
            <Input.Password
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              className="input-field"
              style={{ border: "1px solid #595959" }}
            />
            {passwordError && (
              <span className="input-error">
                Password and Confirm password do not match
              </span>
            )}
            {error && !confirmPassword && (
              <span className="input-error">
                Please enter a valid confirm password
              </span>
            )}
          </div>
          <div className="input-wrapper">
            <Input
              type="text"
              placeholder="Enter city"
              value={city}
              onChange={(event) => setCity(event.target.value)}
              className="input-field"
              style={{ border: "1px solid #595959" }}
            />
            {error && !city && (
              <span className="input-error">Please enter a valid city</span>
            )}
          </div>
          <div className="input-wrapper">
            <Input
              type="text"
              placeholder="Enter address"
              value={address}
              onChange={(event) => setAddress(event.target.value)}
              className="input-field"
              style={{ border: "1px solid #595959" }}
            />
            {error && !address && (
              <span className="input-error">Please enter a valid address</span>
            )}
          </div>

          <div className="input-wrapper">
            <Button
              type="primary"
              className="antd-button"
              onClick={handleSignUp}
            >
              Signup
            </Button>
          </div>
          <div>
            <button
              className="button-link"
              onClick={() => setShowLogin(!showLogin)}
            >
              {showLogin
                ? "Do not have account? SignUp"
                : "Already have Account? Login"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
