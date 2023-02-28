import { useNavigate } from "react-router-dom";
import UserDetails from "./UserDetails";

const Welcome = () => {
  const navigate = useNavigate();

  const Logout = () => {
    localStorage.removeItem("token");
    navigate("/Login");
  };

  const postImage = () => {
    navigate("/images");
  };
  const Edit = () => {
    navigate("/changedata");
  };
  const style = {
    width: "30%",
    margin: "100px auto",
  };
  const style2 = {
    margin: "10px",
    borderColor: "#ccc",
  };
  return (
    <>
      <div style={style}>
        <UserDetails />

        <button onClick={Logout} style={style2}>
          Logout
        </button>
        <button onClick={postImage} style={style2}>
          PostImage
        </button>
        <button onClick={Edit} style={style2}>
          Edit Data
        </button>
      </div>
    </>
  );
};

export default Welcome;
