import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../config/index.js";

export const SignUp = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  //this variable is for the dynamic connection to the server
  // const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5005";
  console.log("testing my .env", `${API_URL}/auth/signup`);

  const nav = useNavigate();
  //this is the onSubmit function
  const handleSignup = async (event) => {
    event.preventDefault();

    //this is where we create the form data and add all the properties to it
    const myFormData = new FormData();
    const image = event.target.image.files[0];
    myFormData.append("imageUrl", image);
    myFormData.append("userName", userName);
    myFormData.append("email", email);
    myFormData.append("password", password);

    // const userToCreate = { userName, email, password };
    try {
      const response = await axios.post(`${API_URL}/auth/signup`, myFormData);
      console.log("you created a user", response.data);
      //only if you create the new user, then you navigate to the login page
      nav("/login");
    } catch (err) {
      console.log(
        "there was an error signing up",
        err.response.data.errorMessage
      );
      setError(err.response.data.errorMessage);
    }
  };
  return (
    <div>
      <h2>Sign up with us</h2>
      <form onSubmit={handleSignup}>
        <label>
          User Name:
          <input
            type="text"
            value={userName}
            onChange={(e) => {
              setUserName(e.target.value);
            }}
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </label>
        <label>
          Profile Image:
          <input type="file" name="image" />
        </label>
        <button>Sign Up</button>
      </form>
      {error ? <h4 className="error-message">{error}</h4> : null}
    </div>
  );
};
