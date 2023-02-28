import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PostProfile = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);

  const handleFileInputChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    getData();
  };
  let formData;
  const token = localStorage.getItem("token");

  //Fetch Data
  const getData = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/API/images",
        formData,
        {
          headers: {
            token: `${token}`,
          },
        }
      );
      console.log(response.data);
      navigate("/Welcome");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (file) {
      formData = new FormData();
      formData.append("image", file);
    }
  }, [file]);

  const style = {
    border: "solid 2px #ccc",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    height: "50vh",
    width: "40%",
    margin: "100px auto",
  };
  return (
    <form>
      <div style={style}>
        <input type="file" onChange={handleFileInputChange} />
        <div style={{ margin: "30px 30px" }}>
          <button type="submit" onClick={handleSubmit}>
            Upload
          </button>
        </div>
      </div>
    </form>
  );
};

export default PostProfile;
