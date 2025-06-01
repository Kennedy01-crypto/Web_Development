import "./App.css";
import SignUpPage from "./pages/SignUpPage";
import { LoginPage } from "./pages/LoginPage";
import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { ProfilePage } from "./pages/ProfilePage";
import { auth } from "./components/firebase";
import { useEffect, useState } from "react";

function App() {
  const [user, setUser] = useState();
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
    });
  });

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={user ? <Navigate to="/profile" /> : <LoginPage />}
        />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/log-in" element={<LoginPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
