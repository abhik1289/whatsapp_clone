import { Route, Routes } from "react-router-dom";
import HomePage from "@/pages/Home";
import LoginPage from "./pages/Login";
import SignUpPage from "./pages/Signup";
export default function App() {
  return (
    <div className="dark">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
      </Routes>
    </div>
  );
}
