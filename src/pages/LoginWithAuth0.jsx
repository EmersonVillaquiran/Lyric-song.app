import LoginButton from "@/components/LoginWithAuth0.js/LoginButton";
import LogoutButton from "@/components/LoginWithAuth0.js/LogoutButton";
import Profile from "@/components/LoginWithAuth0.js/Profile";
import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Loading from "@/components/LyricPage/Loading";
import { useNavigate } from "react-router-dom";

const LoginWithAuth0 = () => {
  const { isAuthenticated, isLoading } = useAuth0();
  const navigate = useNavigate(); // Inicializa el hook de navegación

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/"); // Redirige a la página de inicio cuando está autenticado
    }
  }, [isAuthenticated, navigate]);

  if (isLoading) return <Loading />;
  return (
    <div className="flex flex-col">
      <h1>LoginWithAuth0</h1>
      {isAuthenticated ? <LogoutButton /> : <LoginButton />}
      <Profile />
    </div>
  );
};

export default LoginWithAuth0;
