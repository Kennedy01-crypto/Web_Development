import React, { useEffect, useState } from "react";
import { auth, db } from "../components/firebase";
import { getDoc, doc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { toast } from "react-toastify";
import {
  Hamburger,
  Home,
  Lightbulb,
  Heart,
  Moon,
  UserRound,
} from "lucide-react";

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
      <div className="flex items-center justify-between px-6 py-4 ">
        <h2 className="text-lg font-semibold mx-auto">Profile</h2>
        <button className="absolute right-4 top-4">
          {/* Example moon icon for dark mode toggle */}
          <Moon />
        </button>
      </div>
      {/* UserDetails */}
      {userDetails ? (
        <>
          {/* Profile Avatar and Info */}
          <div className="flex  flex-col md:flex-row h-full items-center py-6 gap-5 ">
            <UserRound
              alt="Profile"
              className="w-32 h-32 md:w-50 md:h-50 rounded-full bg-orange-100 object-cover"
            />
            <div className="flex flex-col gap-3">
              <div className="flex flex-col items-center md:items-start">
                <h3 className="mt-6 text-xl font-semibold">
                  {userDetails.name}
                </h3>
                <p className="text-orange-500 mt-1">{userDetails.email}</p>
              </div>

              {/* Log Out Button */}
              <div className=" flex w-full  justify-center ">
                <button
                  onClick={handleLogout}
                  className="w-3/4 md:w-full max-md:absolute  max-md:bottom-18   bg-orange-500 hover:bg-orange-600  text-white font-semibold py-2 rounded-lg transition"
                >
                  Log Out
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <p>Loading ....</p>
      )}

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 flex justify-between px-2 py-2">
        <a href="#" className="flex flex-col items-center flex-1 text-gray-500">
          <Home />
          <span className="text-xs">Home</span>
        </a>
        <a href="#" className="flex flex-col items-center flex-1 text-gray-500">
          <Lightbulb />
          <span className="text-xs">About</span>
        </a>
        <a href="#" className="flex flex-col items-center flex-1 text-gray-500">
          <Hamburger />
          <span className="text-xs">Recipes</span>
        </a>
        <a href="#" className="flex flex-col items-center flex-1 text-gray-500">
          <Heart />
          <span className="text-xs">Favorites</span>
        </a>
        <a
          href="#"
          className="flex flex-col items-center flex-1 text-orange-500"
        >
          <UserRound />
          <span className="text-xs font-semibold">Profile</span>
        </a>
      </nav>
    </main>
  );
};
