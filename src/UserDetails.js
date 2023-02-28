import { useEffect, useState } from "react";
import axios from "axios";
const UserDetails = () => {
  let [response, setResponse] = useState({
    Username: "",
    email: "",
    password: "",
    profile: "",
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

    setResponse(res.data.user);
    console.log("data", res);
  };
  useEffect(() => {
    getInfo();
  }, []);

  const styles = {
    border: "1px solid #ccc",
    borderRadius: "50%",
    boxShadow: "1px 1px 2px #ccc",
    width: "100px",
    height: "100px",
    objectFit: "cover",
    marginLeft: "50px",
  };

  return (
    <div>
      <img src={response.profile} alt="" style={styles} />
      <h2>Welcome {response.Username}</h2>
      <h3>Email: {response.email}</h3>
    </div>
  );
};
export default UserDetails;
