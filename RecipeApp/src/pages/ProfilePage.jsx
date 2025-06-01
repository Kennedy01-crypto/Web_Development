import React, { useEffect, useState } from "react";
import { auth, db } from "../components/firebase";
import { getDoc, doc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { toast } from "react-toastify";

export const ProfilePage = () => {
  const [userDetails, setUserDetails] = useState(null);

  // const fetchUserData = async () => {
  //   auth.onAuthStateChanged(async (user) => {
  //     if (!user) {
  //       console.log("User is not logged in");
  //       setUserDetails(null);
  //       return;
  //     }
  //     console.log(user);
  //     const docRef = doc(db, "Users", user.uid);
  //     const docSnap = await getDoc(docRef);
  //     if (docSnap.exists()) {
  //       setUserDetails(docSnap.data());
  //       console.log(docSnap.data());
  //     } else {
  //       console.log("User is not logged in");
  //     }
  //   });
  // };

  const fetchUserData = async () => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setUserDetails(null);
        console.log("User is not logged in");
        console.log(user);
        return;
      }
      const docRef = doc(db, "Users", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUserDetails(docSnap.data());
        console.log(docSnap.data());
      } else {
        console.log("User document doesn't exist");
      }
    });
    return () => unsubscribe();
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  async function handleLogout() {
    try {
      await auth.signOut();
      window.location.href = "/log-in";
      console.log("Logged Out successfully");
    } catch (err) {
      console.log(err.message);
    }
  }

  return (
    <main className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      <div className="flex items-center justify-between px-6 pt-6">
        <h2 className="text-lg font-semibold mx-auto">Profile</h2>
        <button className="absolute right-6 top-6">
          {/* Example moon icon for dark mode toggle */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-black"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z"
            />
          </svg>
        </button>
      </div>
      {userDetails ? (
        <>
          {/* Profile Avatar and Info */}
          <div className="flex flex-col items-center mt-8">
            <img
              src="https://img.icons8.com/?size=256&id=2325296&format=png"
              alt="Profile"
              className="w-32 h-32 rounded-full bg-orange-100 object-cover"
            />
            <h3 className="mt-6 text-xl font-semibold">{userDetails.name}</h3>
            <p className="text-orange-500 mt-1">{userDetails.email}</p>
          </div>

          {/* Log Out Button */}
          <div className="flex-grow" />
          <div className="px-4 pb-24 mt-10">
            <button
              onClick={handleLogout}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-lg transition"
            >
              Log Out
            </button>
          </div>
        </>
      ) : (
        <p>Loading ....</p>
      )}

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 flex justify-between px-2 py-2">
        <a href="#" className="flex flex-col items-center flex-1 text-gray-500">
          <svg
            className="w-6 h-6 mb-1"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0h6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="text-xs">Home</span>
        </a>
        <a href="#" className="flex flex-col items-center flex-1 text-gray-500">
          <svg
            className="w-6 h-6 mb-1"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              d="M8 17l4-4 4 4m0 0V7m0 10H8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="text-xs">About</span>
        </a>
        <a href="#" className="flex flex-col items-center flex-1 text-gray-500">
          <svg
            className="w-6 h-6 mb-1"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              d="M4 6h16M4 10h16M4 14h16M4 18h16"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="text-xs">Recipes</span>
        </a>
        <a href="#" className="flex flex-col items-center flex-1 text-gray-500">
          <svg
            className="w-6 h-6 mb-1"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              d="M5 13l4 4L19 7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="text-xs">Favorites</span>
        </a>
        <a
          href="#"
          className="flex flex-col items-center flex-1 text-orange-500"
        >
          <svg
            className="w-6 h-6 mb-1"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <circle
              cx="12"
              cy="8"
              r="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M6 20v-2a4 4 0 014-4h0a4 4 0 014 4v2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="text-xs font-semibold">Profile</span>
        </a>
      </nav>
    </main>
  );
};
