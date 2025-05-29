import React from "react";
import loginImg from "../assets/login-image.jpg";

export const LoginPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-400">
      {/* Main container: column on mobile, row on large screens */}
      <div className="flex flex-col md:flex-row max-xs:h-screen md:w-full max-w-5xl m-0 xs:m-[6%] sm:m-[10%] md:m-[5%] bg-white rounded-lg shadow-md border border-black/20 md:overflow-hidden">
        {/* Left: Login Form */}
        <div className="w-full md:w-1/2 flex flex-col justify-center">
          <form className="px-6 py-6 md:px-12 md:py-10">
            <div className="md:hidden ">
              <img
                src={loginImg}
                className="border w-ful rounded-lg aspect-[4/2] object-cover scale-100"
                alt="login image"
              />
            </div>
            {/* Welcome */}
            <h2 className="text-2xl font-semibold mb-1 max-md:my-5 flex items-center">
              Welcome Back <span className="ml-2 text-xl">👋</span>
            </h2>
            <p className="text-sm text-black mb-5">
              Today is a new day. It’s your day. You shape it. <br /> Sign in to
              start managing your projects.
            </p>

            {/* Email */}
            <label className="block text-sm font-medium mb-1" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              placeholder="Example@email.com"
              className="w-full px-3 py-2 border border-orange-300  rounded-lg mb-3 focus:outline focus:ring-2 focus:ring-orange-400  bg-white"
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
              type="password"
              required
              min={8}
              placeholder="At least 8 characters"
              className="w-full px-3 py-2 border border-orange-300  rounded-lg mb-3 focus:outline focus:ring-2 focus:ring-orange-400  bg-white"
            />
            <div className="flex justify-end mb-3 ">
              <a
                href="#"
                className="text-xs text-orange-500  md:text-blue-700 font-semibold hover:underline"
              >
                Forgot Password?
              </a>
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              className="w-full bg-orange-500 cursor-pointer hover:bg-orange-600 text-white font-semibold py-2 rounded-lg mb-4 transition"
            >
              Sign in
            </button>

            {/* Divider */}
            <div className="flex items-center my-4">
              <div className="flex-grow h-px bg-orange-500"></div>
              <span className="mx-3 text-gray-400 text-sm">Or</span>
              <div className="flex-grow h-px bg-orange-500"></div>
            </div>

            {/* Social Buttons */}
            <div className="flex flex-row md:flex-col gap-3 mb-4">
              <button className="flex items-center gap-2 w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 rounded-lg border border-gray-300 justify-center">
                <img
                  src="https://img.icons8.com/?size=100&id=17949&format=png&color=000000"
                  style={{ width: 24, height: 24 }}
                />
                <p>
                  <span className="max-md:hidden">Sign in with</span> Google
                </p>
              </button>
              <button className="flex items-center gap-2 w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 rounded-lg border border-gray-300 justify-center">
                <img
                  src="https://img.icons8.com/?size=100&id=p62ASPK2Kpqp&format=png&color=000000"
                  style={{ width: 24, height: 24 }}
                />
                <p>
                  <span className="max-md:hidden">Sign in with</span> Facebook
                </p>
              </button>
            </div>

            {/* Sign up link */}
            <div className="text-center text-sm">
              Don&apos;t you have an account?{" "}
              <a
                href="#"
                className="text-blue-600 font-semibold hover:underline"
              >
                Sign up
              </a>
            </div>
          </form>
          {/* Footer */}
          <div className="text-center text-xs text-gray-400 pb-4">
            © 2025 ALL RIGHTS RESERVED
          </div>
        </div>
        {/* Right: Image (hidden on mobile) */}
        <div className="hidden md:block w-1/2">
          <img
            src={loginImg}
            alt="Login Image of A dish"
            className="w-full h-full object-cover bg-black scale-100 rounded-r-md"
          />
        </div>
      </div>
    </div>
  );
};
