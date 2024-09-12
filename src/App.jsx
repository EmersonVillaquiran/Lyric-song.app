import "./App.css";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import LyricPage from "./pages/LyricPage";
import RegisterPage from "./pages/RegisterPage";
import ProtectedRoutes from "./pages/ProtectedRoutes";
import VerifyEmail from "./pages/VerifyEmail";

function App() {
  return (
    <div className="h-screen dark">
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/users/verify/:code" element={<VerifyEmail />} />
        <Route path="/login" element={<LoginPage />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/" element={<LyricPage />} />
        </Route>
        <Route path="*" element={<h1>404 - Página No Encontrada</h1>} />
      </Routes>
    </div>
  );
}

export default App;
