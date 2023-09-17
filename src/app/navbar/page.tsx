import React from 'react';
import Link from "next/link"

const Navbar = () => {
  return (
    <nav className="text-lg flex justify-between items-center w-4/5 mx-auto">
      <Link href="/" className="navbar-brand">
        Job Portal
      </Link>
      <div className="navbar-end">
        <ul className="flex list-none">
          <li className="mr-2">
            <Link href="/login">Login</Link>
          </li>
          <li>
            <Link href="/signup">Signup</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

