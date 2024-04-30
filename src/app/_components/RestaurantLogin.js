import { Input, Button, message } from "antd";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { baseUrl } from "../Utils";

const { Password } = Input;

const RestaurantLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    if (!email || !password) {
      setError(true);
      return false;
    } else {
      setError(false);
    }
    try {
      let response = await fetch(`${baseUrl}api/restaurant`, {
        method: "POST",
        body: JSON.stringify({ email, password, login: true }),
      });
      response = await response.json();

      if (response.success) {
        const { result } = response;
        delete result.password;
        localStorage.setItem("restaurantUser", JSON.stringify(result));
        router.push("/restaurant/dashboard");
      } else {
        message.error("Login failed!!");
      }
    } catch (error) {
      message.error("Something went wrong, please try again later.");
    }
  };

  return (
    <>
      <h2>Login Page</h2>
      <div>
        <div className="input-wrapper">
          <Input
            className="input-field"
            type="text"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {error && !email && (
            <span className="input-error">Please enter a valid email </span>
          )}
        </div>
        <div className="input-wrapper">
          <Password
            className="input-field"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && !password && (
            <span className="input-error">Please enter a valid password </span>
          )}
        </div>
        <div className="input-wrapper">
          <Button className="antd-button" onClick={handleLogin} type="primary">
            Login
          </Button>
        </div>
      </div>
    </>
  );
};

export default RestaurantLogin;
