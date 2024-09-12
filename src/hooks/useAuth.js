import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const useAuth = () => {
  const navigate = useNavigate();

  //Register
  const registerUser = (data) => {
    const frontBaseUrl = `${location.protocol}//${location.host}/#/users/verify`;
    const body = { ...data, frontBaseUrl };
    const url = "https://lyrics-backed-app.onrender.com/users";
    axios
      .post(url, body)
      .then((res) => {
        console.log(res.data);
        navigate("/login");
        Swal.fire({
          title: "Good job!",
          text: `✅User created, please verified your account ${res.data.email}`,
          icon: "success",
        });
      })
      .catch((err) => console.log(err));
    }
  //Login
  const loginUser = (data) => {
    const url = "https://lyrics-backed-app.onrender.com/users/login";
    axios
      .post(url, data)
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        navigate("/");
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Created an account",
        });
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      });
  };

  return { registerUser, loginUser };
};

export default useAuth;
