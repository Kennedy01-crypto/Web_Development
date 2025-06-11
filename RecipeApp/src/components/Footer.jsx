import {
  Hamburger,
  Home,
  Lightbulb,
  Heart,
  Moon,
  UserRound,
  SearchIcon,
  ChefHat,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { motion } from "motion/react";
import React from "react";

export const Footer = () => {
  return (
    <footer className="fixed bottom-0 flex flex-row justify-between items-center md:top-0 md:right-0 h-fit w-full md:p-1 bg-white border-t border-gray-200 shadow-md z-50">
      {/* logo */}
      <motion.div
        initial={{ opacity: 0, rotate: 360 }}
        animate={{ opacity: 1, rotate: 0 }}
        transition={{ duration: 1.5, ease: "easeOut", delay: 0.9 }}
        className="max-md:hidden flex items-center justify-center w-16 h-16 bg-orange-500 rounded-full mx-3 "
      >
        <ChefHat className="w-12 h-12 text-white" />
      </motion.div>
      {/* Search Bar */}
      <div className="p-3 max-md:hidden bg-gray-100 flex md:w-1/2 items-center rounded-md mx-3 ">
        <SearchIcon className="w-5 h-5 text-gray-500 mr-2" />
        <input
          type="text"
          placeholder="Search recipes"
          className="bg-transparent focus:outline-none w-full text-lg"
        />
      </div>
      <nav className=" left-0 w-full md:w-1/4 bg-white max-md:border-t border-gray-200 flex items-center justify-between px-2 py-2">
        <NavLink
          to="/home"
          className={({ isActive }) =>
            `flex flex-col items-center flex-1 text-gray-700 ${
              isActive ? "text-orange-500 font-semibold" : ""
            }`
          }
        >
          <Home />
          <span className="text-xs">Home</span>
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            `flex flex-col items-center flex-1 text-gray-700 ${
              isActive ? "text-orange-500 font-semibold" : ""
            }`
          }
        >
          <Lightbulb />
          <span className="text-xs">About</span>
        </NavLink>
        {/* ... similar NavLinks for other items */}
        <NavLink
          to="/recipe"
          className={({ isActive }) =>
            `flex flex-col items-center flex-1 text-gray-500 ${
              isActive ? "text-orange-500 font-semibold" : ""
            }`
          }
        >
          <Hamburger />
          <span className="text-xs">Recipes</span>
        </NavLink>
        <NavLink
          to="/favorites"
          className={({ isActive }) =>
            `flex flex-col items-center flex-1 text-gray-500 ${
              isActive ? "text-orange-500 font-semibold" : ""
            }`
          }
        >
          <Heart />
          <span className="text-xs">Favorites</span>
        </NavLink>
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `flex flex-col items-center flex-1 text-gray-500 ${
              isActive ? "text-orange-500 font-semibold" : ""
            }`
          }
        >
          <UserRound />
          <span className="text-xs">Profile</span>
        </NavLink>
        <button className="max-md:hidden ml-3">
          {/* Example moon icon for dark mode toggle */}
          <Moon className="" />
          {/* <span className="text-xs">Dark</span> */}
        </button>
      </nav>
    </footer>
  );
};
