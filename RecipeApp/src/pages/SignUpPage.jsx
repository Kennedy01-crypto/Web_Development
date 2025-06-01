import React from "react";
import loginImg from "../assets/login-image.jpg";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../components/firebase";
import { setDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";

const SignUpPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      console.log(user);

      if (user) {
        await setDoc(doc(db, "Users", user.uid), {
          name: name,
          email: user.email,
        });
      }

      console.log("User Reistered successfully");
      toast.success("User Registerd successfully", { position: "top-center" });
    } catch (err) {
      console.log("Error;" + err.message);
      toast.error(err.message, { position: "top-center" });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="flex flex-col md:flex-row md:w-full max-w-5xl m-0 md:m-[5%] bg-white rounded-lg shadow-md border border-black/20 md:overflow-hidden">
        {/* Left: Form */}
        <div className="w-full md:w-1/2 flex flex-col justify-center">
          <form
            onSubmit={handleRegister}
            className="px-6 py-6 md:px-12 md:py-10"
          >
            <h2 className="text-2xl font-semibold mb-8 mt-8 md:mt-0">
              Create your account
            </h2>
            {/* Name */}
            <label className="block text-sm font-medium mb-1" htmlFor="name">
              Name
            </label>
            <input
              id="name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="ex: jon smith"
              className="w-full px-3 py-2 border border-orange-400 rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-orange-400 bg-[#f5e7e0]"
            />

            {/* Email */}
            <label className="block text-sm font-medium mb-1" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ex: jon.smith@email.com"
              className="w-full px-3 py-2 border border-orange-400 rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-orange-400 bg-[#f5e7e0]"
            />

            {/* Password */}
            <label
              className="block text-sm font-medium mb-1"
              htmlFor="password"
            >
              Password
            </label>
            <input
              id="password"
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="********"
              className="w-full px-3 py-2 border border-orange-400 rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-orange-400 bg-[#f5e7e0]"
            />

            {/* Confirm Password */}
            <label
              className="block text-sm font-medium mb-1"
              htmlFor="confirmPassword"
            >
              Confirm password
            </label>
            <input
              id="confirmPassword"
              type="password"
              required
              placeholder="********"
              className="w-full px-3 py-2 border border-orange-400 rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-orange-400 bg-[#f5e7e0]"
            />

            {/* Terms */}
            <div className="flex items-center mb-4">
              <input
                id="terms"
                type="checkbox"
                required
                className="accent-orange-500 mr-2"
              />
              <label htmlFor="terms" className="text-xs">
                I understood the{" "}
                <span className="text-orange-500 font-medium cursor-pointer hover:underline">
                  terms & policy.
                </span>
              </label>
            </div>

            {/* Sign Up Button */}
            <button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-lg mb-4 transition"
            >
              SIGN UP
            </button>

            {/* Divider */}
            <div className="flex items-center my-4">
              <div className="flex-grow h-px bg-orange-600"></div>
              <span className="mx-3 text-gray-400 text-sm">
                or sign up with
              </span>
              <div className="flex-grow h-px bg-orange-600"></div>
            </div>

            {/* Social Buttons */}
            <div className="flex gap-3 mb-4">
              <button className="flex items-center gap-2 w-1/2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 rounded-lg border border-gray-300 justify-center">
                <img
                  src="https://img.icons8.com/?size=100&id=17949&format=png&color=000000"
                  alt="Google"
                  className="w-6 h-6"
                />
                <span>Google</span>
              </button>
              <button className="flex items-center gap-2 w-1/2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 rounded-lg border border-gray-300 justify-center">
                <img
                  src="https://img.icons8.com/?size=100&id=p62ASPK2Kpqp&format=png&color=000000"
                  alt="Facebook"
                  className="w-6 h-6"
                />
                <span>Facebook</span>
              </button>
            </div>

            {/* Sign in link */}
            <div className="text-center text-sm">
              Have an account?{" "}
              <a
                href="#"
                className="text-blue-600 font-semibold hover:underline"
              >
                Sign in
              </a>
            </div>
          </form>
          {/* Footer */}
          <div className="text-center text-xs text-gray-400 pb-4">
            © 2025 ALL RIGHTS RESERVED
          </div>
        </div>
        {/* Right: Image (hidden on mobile) */}
        <div className="hidden md:block w-1/2 bg-black">
          {/* You can use the same image as LoginPage or another relevant image */}
          <img
            src={loginImg}
            alt="Sign up visual"
            className="w-full h-full object-cover rounded-r-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
