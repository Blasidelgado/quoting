import React from "react";
import Link from "next/link";
import { useMediaQuery } from "react-responsive";
import MobileMenu from "./MobileMenu";
import DesktopMenu from "./DesktopMenu";

const Navbar: React.FC = () => {
  const isMobile = useMediaQuery({ maxWidth: 767 });

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-white text-xl font-bold">
          Rusina system
        </Link>
        {isMobile ? <MobileMenu /> : <DesktopMenu />}
      </div>
    </nav>
  );
};

export default Navbar;
