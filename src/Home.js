import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const redirectToSignup = () => {
    navigate("/Signup");
  };
  const redirectToLogin = () => {
    navigate("/Login");
  };
  const style = {
    display: "flex",

    justifyContent: "center",
  };
  return (
    <>
      <div
        style={{
          width: "35%",
          margin: "0 auto",
          marginTop: "200px",
        }}
      >
        <h2>Hello What Would u like to do: </h2>
        <div style={style}>
          <button onClick={redirectToSignup} style={{ margin: "20px" }}>
            Signup
          </button>
          <button onClick={redirectToLogin}>Login</button>
        </div>
      </div>
    </>
  );
};
export default Home;
