import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Changedata() {
  const navigate = useNavigate();
  const [credentials, setcredentials] = useState({
    Username: "",
    email: "",
    password: "",
  });
  const token = localStorage.getItem("token");
  const getInfo = async () => {
    const res = await axios.get(
      "http://localhost:3000/API/userDetails",

      {
        headers: {
          token: `${token}`,
        },
      }
    );

    setcredentials(res.data.user);
  };

  useEffect(() => {
    getInfo();
  }, []);

  const handleInputChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setcredentials({ [name]: value });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    updateData();
  };

  const updateData = async () => {
    axios
      .patch(
        "http://localhost:3000/API/changedata",
        {
          Username: credentials.Username,
          email: credentials.email,
          password: credentials.password,
        },
        {
          headers: {
            token: `${token}`,
          },
        }
      )
      .then((response) => {
        if (response) {
          localStorage.setItem("token", response.data.token);
          alert("Updated");
          navigate("/Welcome");
        }
      })
      .catch((error) => {
        if (error) {
          alert("User Already exist");
        }
      });
  };

  const style = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    width: "40%",
    margin: "100px auto",
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div style={style}>
          <label htmlFor="Username">Username:</label>
          <input
            type="text"
            id="Username"
            name="Username"
            value={credentials.Username}
            onChange={handleInputChange}
            required={true}
          />
          <label htmlFor="email">New Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={credentials.email}
            onChange={handleInputChange}
            required={true}
          />
          <label htmlFor="password">New Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={credentials.password}
            onChange={handleInputChange}
            required={true}
          />
          <button type="submit">Submit</button>
        </div>
      </form>
    </>
  );
}

export default Changedata;
