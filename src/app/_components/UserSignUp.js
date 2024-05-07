import { Input, Button, message } from "antd";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { baseUrl } from "../Utils";

const UserSignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [mobile, setMobile] = useState("");
  const router = useRouter();
  const [error, setError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      setPasswordError(true);
      return false;
    } else {
      setPasswordError(false);
    }
    if (
      !email ||
      !password ||
      !confirmPassword ||
      !name ||
      !city ||
      !address ||
      !mobile
    ) {
      setError(true);
      return false;
    } else {
      setError(false);
    }

    try {
      let response = await fetch(`${baseUrl}api/user`, {
        method: "POST",
        body: JSON.stringify({ name, email, password, city, address, mobile }),
      });
      response = await response.json();

      if (response.success) {
        const { result } = response;
        delete result.password;
        localStorage.setItem("user", JSON.stringify(result));
        router.push("/");
      } else {
        message.error("Signup failed!!");
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
            type="text"
            placeholder="Enter name"
            className="input-field"
            value={name}
            onChange={(event) => setName(event.target.value)}
            style={{border: "1px solid #595959"}}
          />
          {error && !name && (
            <span className="input-error">Please enter a valid name</span>
          )}
        </div>
        <div className="input-wrapper">
          <Input
            type="text"
            placeholder="Enter email"
            className="input-field"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            style={{border: "1px solid #595959"}}
          />
          {error && !email && (
            <span className="input-error">Please enter a valid email</span>
          )}
        </div>
        <div className="input-wrapper">
          <Input.Password
            placeholder="Enter password"
            className="input-field"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            style={{border: "1px solid #595959"}}
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
            className="input-field"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            style={{border: "1px solid #595959"}}
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
            className="input-field"
            value={city}
            onChange={(event) => setCity(event.target.value)}
            style={{border: "1px solid #595959"}}
          />
          {error && !city && (
            <span className="input-error">Please enter a valid city</span>
          )}
        </div>
        <div className="input-wrapper">
          <Input
            type="text"
            placeholder="Enter address"
            className="input-field"
            value={address}
            onChange={(event) => setAddress(event.target.value)}
            style={{border: "1px solid #595959"}}
          />
          {error && !address && (
            <span className="input-error">Please enter a valid address</span>
          )}
        </div>
        <div className="input-wrapper">
          <Input
            type="text"
            placeholder="Enter mobile"
            className="input-field"
            value={mobile}
            onChange={(event) => setMobile(event.target.value)}
            style={{border: "1px solid #595959"}}
          />
          {error && !mobile && (
            <span className="input-error">Please enter a valid mobile</span>
          )}
        </div>
        <div className="input-wrapper">
          <Button type="primary" className="antd-button" onClick={handleSignUp}>
            Sign up
          </Button>
        </div>
      </div>
    </>
  );
};

export default UserSignUp;
