import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const VerifyEmail = () => {
  const navigate = useNavigate();
  const { code: code } = useParams();

  const [isVerified, setIsVerified] = useState("loading");
  console.log(isVerified);

  useEffect(() => {
    const url = `http://localhost:8080/users/verify/${code}`;
    axios
      .get(url)
      .then(() => {
        setIsVerified("verified");
        navigate("/login");
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          },
        });
        Toast.fire({
          icon: "success",
          title: "Verified in successfully",
        });
      })
      .catch(() => {
        setIsVerified("noVerified");
      });
  }, [code]); // Dependencia correcta

  return (
    <div>
      {isVerified === "loading" && <p>Loading...</p>}
      {isVerified === "verified" && <p>Email verified successfully!</p>}
      {isVerified === "noVerified" && (
        <p>Verification failed. Please try again.</p>
      )}
    </div>
  );
};

export default VerifyEmail;
