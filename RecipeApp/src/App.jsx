import "./App.css";
import SignUpPage from "./pages/SignUpPage";
import { LoginPage } from "./pages/LoginPage";
import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { ProfilePage } from "./pages/ProfilePage";
import { auth } from "./components/firebase";
import { useEffect, useState } from "react";
import { Favorites } from "./pages/Favorites";
import { Recipe } from "./pages/Recipe";
import { Home } from "./pages/Home";
import { About } from "./pages/about";
import { Footer } from "./components/Footer";

function App() {
  const [user, setUser] = useState();
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
    });
  }, [user]);

  // Determine if the current path should hide the footer
  const hideFooterPaths = ["/", "/log-in", "/sign-up"];
  const shouldHideFooter = hideFooterPaths.includes(location.pathname);

  return (
    <div className="relative pb-[50px] lg:pb-[72px]">
      <Routes>
        <Route
          path="/"
          element={user ? <Navigate to="/profile" /> : <LoginPage />}
        />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/log-in" element={<LoginPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/home" element={<Home />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/recipe" element={<Recipe />} />
      </Routes>

      {/* Conditionally render the Footer */}
      {!shouldHideFooter && <Footer className="fixed bottom-0 right-0" />}
      <ToastContainer />
    </div>
  );
}

export default App;
