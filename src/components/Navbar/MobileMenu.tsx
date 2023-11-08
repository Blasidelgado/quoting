import React, { useState } from "react";
import { MenuItem } from "./DesktopMenu";
import { signOut } from "next-auth/react";

const MobileMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleSignOutClick = async () => {
    await signOut({ redirect: false, callbackUrl: "/" });
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button onClick={toggleMenu} className="text-white focus:outline-none">
        <svg
          className={`w-6 h-6 ${isOpen ? "transform rotate-180" : ""}`}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M6 9l6 6 6-6"></path>
        </svg>
      </button>
      {isOpen && (
        <div className="absolute top-0 right-0 mt-5 bg-gray-800 rounded shadow-lg py-4 px-6 w-56 flex flex-col items-center transition-all duration-500 ease-in-out">
          <MenuItem href="/">Home</MenuItem>
          <MenuItem href="/inventory">Inventory</MenuItem>
          <MenuItem href="/price-lists">Price Lists</MenuItem>
          <MenuItem href="/clients">Clients</MenuItem>
          <MenuItem href="/quoting">Quoting</MenuItem>
          <li className="text-white list-none py-2 px-3" onClick={handleSignOutClick}>Logout</li>
        </div>
      )}
    </div>
  );
};

export default MobileMenu;
