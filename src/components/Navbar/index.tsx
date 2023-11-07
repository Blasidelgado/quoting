import React from "react";
import Link from "next/link";
import MobileMenu from "./MobileMenu";
import DesktopMenu from "./DesktopMenu";

const Navbar: React.FC = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-white text-xl font-bold">
          Rusina system
        </Link>
        <div className="md:hidden">
          <MobileMenu />
        </div>
        <div className="hidden md:flex space-x-4">
          <DesktopMenu />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
