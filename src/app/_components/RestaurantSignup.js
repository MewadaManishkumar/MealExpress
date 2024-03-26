import { Input, Button, message } from 'antd';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const RestaurantSignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [c_password, setC_password] = useState('');
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [contact, setContact] = useState('');
  const router = useRouter();
  const [error, setError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handleSignup = async () => {
    if (password !== c_password) {
      setPasswordError(true);
      return false;
    } else {
      setPasswordError(false);
    }
    if (!email || !password || !c_password || !name || !city || !address || !contact) {
      setError(true);
      return false;
    } else {
      setError(false);
    }

    try {
      let response = await fetch('http://localhost:3000/api/restaurant', {
        method: 'POST',
        body: JSON.stringify({ email, password, name, city, address, contact }),
      });
      response = await response.json();
      console.log(response);
      if (response.success) {
        const { result } = response;
        delete result.password;
        localStorage.setItem('restaurantUser', JSON.stringify(result));
        router.push('/restaurant/dashboard');
      } else {
        message.error('Signup failed!!');
      }
    } catch (error) {
      console.error('Error:', error);
      message.error('Something went wrong, please try again later.');
    }
  };

  return (
    <>
      <h2>Signup Page</h2>
      <div>
        <div className="input-wrapper">
          <Input
            type="text"
            placeholder="Enter email id"
            className="input-field"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          {error && !email && <span className="input-error">Please enter a valid email </span>}
        </div>
        <div className="input-wrapper">
          <Input.Password
            placeholder="Enter password"
            className="input-field"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          {passwordError && <span className="input-error">Password and Confirm password do not match </span>}
          {error && !password && <span className="input-error">Please enter a valid password </span>}
        </div>
        <div className="input-wrapper">
          <Input.Password
            placeholder="Confirm password"
            className="input-field"
            value={c_password}
            onChange={(event) => setC_password(event.target.value)}
          />
          {passwordError && <span className="input-error">Password and Confirm password do not match </span>}
          {error && !c_password && <span className="input-error">Please enter a valid confirm password </span>}
        </div>
        <div className="input-wrapper">
          <Input
            type="text"
            placeholder="Enter restaurant name"
            className="input-field"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          {error && !name && <span className="input-error">Please enter a valid name </span>}
        </div>
        <div className="input-wrapper">
          <Input
            type="text"
            placeholder="Enter city"
            className="input-field"
            value={city}
            onChange={(event) => setCity(event.target.value)}
          />
          {error && !city && <span className="input-error">Please enter a valid city </span>}
        </div>
        <div className="input-wrapper">
          <Input
            type="text"
            placeholder="Enter full address"
            className="input-field"
            value={address}
            onChange={(event) => setAddress(event.target.value)}
          />
          {error && !address && <span className="input-error">Please enter a valid address </span>}
        </div>
        <div className="input-wrapper">
          <Input
            type="text"
            placeholder="Enter contact No"
            className="input-field"
            value={contact}
            onChange={(event) => setContact(event.target.value)}
          />
          {error && !contact && <span className="input-error">Please enter a valid contact </span>}
        </div>
        <div className="input-wrapper">
          <Button type="primary" className="antd-button" onClick={handleSignup}>
            Sign up
          </Button>
        </div>
      </div>
    </>
  );
};

export default RestaurantSignUp;
