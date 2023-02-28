import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [response, setResponse] = useState(null);
  //Use Effect
  useEffect(() => {
    if (response) {
      alert("Sign Up Successfull...Now You may Log in");
    }
  }, [response]);

  const [credentials, setCredentials] = useState({
    Username: "",
    email: "",
    password: "",
  });

  function handleInputChange(event) {
    const { name, value } = event.target;
    setCredentials({ ...credentials, [name]: value });
  }

  function signup() {
    axios
      .post("http://localhost:3000/API/signup", {
        email: credentials.email,
        password: credentials.password,
        Username: credentials.Username,
      })
      .then((response) => {
        setResponse(response);
        localStorage.setItem("token", response.data.token);
        navigate("/Welcome");
      })
      .catch((error) => {
        if (error) {
          alert("User Already exist...Change Email");
        }
      });
  }

  function handleSubmit(event) {
    event.preventDefault();
    signup();
  }
  const style = {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    height: "100vh",
    width: "40%",
    margin: "100px auto",
  };
  return (
    <div>
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

          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={credentials.email}
            onChange={handleInputChange}
            required={true}
          />

          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={credentials.password}
            onChange={handleInputChange}
            required={true}
          />

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
