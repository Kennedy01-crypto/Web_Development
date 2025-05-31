import "./App.css";
import SignUpPage from "./pages/SignUpPage";
import { LoginPage } from "./pages/LoginPage";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
function App() {
  return (
    <>
      <Routes>
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/log-in" element={<LoginPage />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
