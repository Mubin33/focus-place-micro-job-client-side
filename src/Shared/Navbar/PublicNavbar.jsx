import React from 'react';
import { Link } from 'react-router-dom';

const PublicNavbar = () => {
    const navItems = (
        <> 
          <Link target="_blank" to="https://github.com/Programming-Hero-Web-Course4/b10a12-client-side-Mubin33">
            <li>
              <p className="text-sm">Join as Developer</p>
            </li>
          </Link> 
        </>
      );
      return (
        <div>
          <div className="navbar bg-base-300 pr-1 md:pr-4">
            <div className="navbar-start">
              <div className="dropdown">
                <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h8m-8 6h16"
                    />
                  </svg>
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
                >
                  {navItems}
                </ul>
              </div>  <Link to="/">
                <p className="btn btn-ghost text-xl">Focus Place</p>
              </Link> 
              
            </div> 
              <div className="navbar-end gap-3">
                <Link to="/login">
                  <button className="btn btn-sm bg-white">Login</button>
                </Link>
                <Link to="/register">
                  <button className="btn btn-sm bg-black text-white">
                    Register
                  </button>
                </Link>
              </div> 
          </div>
        </div>
    );
};

export default PublicNavbar;