import React from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";

interface MenuItemProps {
  href: string;
  children: React.ReactNode;
}

export const MenuItem: React.FC<MenuItemProps> = ({ href, children }) => {
  return (
    <Link href={href} className="text-white hover:text-gray-300 py-2 px-3">
      {children}
    </Link>
  );
};

const DesktopMenu: React.FC = () => {
  return (
    <div className="hidden md:flex space-x-4">
      <MenuItem href="/">Home</MenuItem>
      <MenuItem href="/inventory">Inventory</MenuItem>
      <MenuItem href="/price-lists">Price Lists</MenuItem>
      <MenuItem href="/clients">Clients</MenuItem>
      <MenuItem href="/quoting">Quoting</MenuItem>
      <li className="text-white list-none py-2 px-3" onClick={signOut}>Logout</li>
      {/* Add more menu items as needed */}
    </div>
  );
};

export default DesktopMenu;