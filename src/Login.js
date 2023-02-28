import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [credentials, setCredentials] = useState({
    Username: "",
    email: "",
    password: "",
  });
  const [response, setResponse] = useState(null);

  useEffect(() => {
    if (response) {
      console.log(response);
    }
  }, [response]);
  const navigate = useNavigate();
  function handleInputChange(event) {
    const { name, value } = event.target;
    setCredentials({ ...credentials, [name]: value });
  }

  const loginhandler = () => {
    axios
      .post("http://localhost:3000/API/login", {
        email: credentials.email,
        password: credentials.password,
      })
      .then((response) => {
        // Cookies.set("token", response.data.token);
        localStorage.setItem("token", response.data.token);
        setResponse(response);
        navigate("/Welcome");
      })
      .catch((error) => {
        alert("Invalid pwd or Email");
      });
  };

  function handleSubmit(event) {
    event.preventDefault();
    loginhandler();
  }
  const style = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    width: "40%",
    margin: "100px auto",
  };
  return (
    <form onSubmit={handleSubmit}>
      <div style={style}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={credentials.email}
          onChange={handleInputChange}
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={credentials.password}
          onChange={handleInputChange}
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <button type="submit">Submit</button>
        </div>
      </div>
    </form>
  );
};
export default Login;
