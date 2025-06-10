import {
  Hamburger,
  Home,
  Lightbulb,
  Heart,
  Moon,
  UserRound,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import React from "react";

export const Footer = () => {
  return (
    <footer className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 shadow-md z-50">
      <nav className=" md:hidden left-0 w-full bg-white border-t border-gray-200 flex justify-between px-2 py-2">
        <NavLink
          to="/home"
          className={({ isActive }) =>
            `flex flex-col items-center flex-1 text-gray-500 ${
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
            `flex flex-col items-center flex-1 text-gray-500 ${
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
      </nav>
    </footer>
  );
};
