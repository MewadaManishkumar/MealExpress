import { Input, Button, message } from "antd";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { baseUrl } from "../Utils";

const UserLogin = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const router = useRouter();
  
  useEffect(() => {
    // Log the query parameters and props for debugging
    console.log("Router Query:", router.query);
    console.log("Props in Userlogin page:", props);
  }, [router.query, props]);

  const loginHandle = async () => {
    if (!email || !password) {
      setError(true);
      return false;
    } else {
      setError(false);
    }

    try {
      let response = await fetch(`${baseUrl}api/user/login`, {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
      response = await response.json();

      if (response.success) {
        const { result } = response;
        delete result.password;
        localStorage.setItem("user", JSON.stringify(result));
        if (props?.redirect?.order) {
          router.push("/order");
        } else {
          router.push("/");
        }
      } else {
        message.error("Failed to login. Please try again with valid email and password");
      }
    } catch (error) {
      message.error("Something went wrong, please try again later.");
    }
  };

  return (
    <>
      <div>
        <div className="input-wrapper">
          <Input
            className="input-field"
            type="text"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{border: "1px solid #595959"}}
          />
          {error && !email && <span className="input-error">Please enter a valid email</span>}
        </div>
        <div className="input-wrapper">
          <Input.Password
            className="input-field"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{border: "1px solid #595959"}}
          />
          {error && !password && <span className="input-error">Please enter a valid password</span>}
        </div>
        <div className="input-wrapper">
          <Button className="antd-button" onClick={loginHandle} type="primary">
            Login
          </Button>
        </div>
      </div>
    </>
  );
};

export default UserLogin;