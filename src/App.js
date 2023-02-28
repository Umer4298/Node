import Login from "./Login";
import PostProfile from "./PostProfile";
import Signup from "./Signup";
import Changedata from "./ChangeEmail";
import Home from "./Home";
import Welcome from "./Welcome";
import UserDetails from "./UserDetails";
import { Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/Signup" element={<Signup />}></Route>
        <Route path="/Login" element={<Login />}></Route>
        <Route path="/Welcome" element={<Welcome />}></Route>
        <Route path="/images" element={<PostProfile />}></Route>
        <Route path="/Changedata" element={<Changedata />}></Route>
        <Route path="/userDetails" element={<UserDetails />}></Route>
      </Routes>
    </>
  );
};

export default App;
