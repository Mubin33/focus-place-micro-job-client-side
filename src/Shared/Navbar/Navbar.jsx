import React, { useContext } from "react";
import { AuthContext } from "../../Authintication/AuthProvider/AuthProvider";
import { Link, useLocation } from "react-router-dom";
import { FaSackDollar } from "react-icons/fa6";
import useUserData from './../../Hooks/useUserData/useUserData';
import Swal from "sweetalert2"; 
import useAxiosSecure from "../../Hooks/useAxiosSecure/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const Navbar = () => {
  const { user, loading,logoutUser } = useContext(AuthContext);  
  const [userData, isPending] = useUserData() 
  const location = useLocation();  
  const {name, email, image, amount, role}=userData
  const axiosSecure = useAxiosSecure()
  const fixedAmount = (amount) => {
    return parseFloat(amount).toFixed(2);
  };


  const handleLogout=()=>{
     Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, Logout!"
              }).then((result) => {
                if (result.isConfirmed) {
                  logoutUser()
                  .then((result)=>{
                    //console.log(result)
                  })
                  .catch((error)=>{
                    //console.log(error)
                  })
                  Swal.fire({
                    title: "Deleted!",
                    text: "Your account Logout",
                    icon: "success"
                  });
                }
              });
  }


  const { data: myNotification = [], isLoading} = useQuery({
    queryKey: ['myNotification', role === 'admin' ? undefined : email],
    enabled: !isPending && !!email, // Wait for userData to be available
    queryFn: async () => {
        const endpoint = role === 'admin' ? `/notification` : `/notification/${email}`;
        const { data } = await axiosSecure.get(endpoint);
        return data;
    },
});
const newNoti = myNotification.filter(item => item.status === 'pending')
const newNotiLength = newNoti.length

  const handleNoti=async()=>{
    if(role === 'admin'){
      try{
      await axiosSecure.patch(`/update/notification`)
    }catch(err){
      //console.log(err)
    }
    }else{
      try{
        await axiosSecure.patch(`/update/notification/${email}`)
      }catch(err){
        //console.log(err)
      }
    }
    
  }





 

  const navItems = (
    <>
      <Link to="/dashboard/home">
        <li>
          <p
            className={`text-sm ${
                location.pathname.startsWith("/dashboard") ? "hidden" : ""
              }`}
          >
            Dashboard
          </p>
        </li>
      </Link>
      <Link target="_blank" to="https://github.com/Programming-Hero-Web-Course4/b10a12-client-side-Mubin33">
        <li>
          <p className="text-sm">Join as Developer</p>
        </li>
      </Link>
      <li>
        <p className="font-bold uppercase">{role}</p>
      </li>
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
          </div>
          {user ? <Link to="/dashboard/home">
            <p className="btn btn-ghost text-xl">Focus Place</p>
          </Link> :<Link to="/">
            <p className="btn btn-ghost text-xl">Focus Place</p>
          </Link>}
          
        </div>

        {user ? (
          <div className="navbar-end ">
            <div className="  hidden lg:flex">
              <ul className="menu menu-horizontal px-1">{navItems}</ul>
            </div>
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle"
            >
              <div className="indicator">
                <FaSackDollar className="text-yellow-500" size={20} />
                <span className="badge badge-sm indicator-item ">{fixedAmount(amount)} C</span>
              </div>
            </div>
            <Link to="/dashboard/notification">
            <button onClick={handleNoti} className="btn btn-ghost btn-circle">
              <div className="indicator">
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
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
                {
                  newNotiLength ?<span className="badge badge-sm bg-red-500 text-black indicator-item">{newNotiLength}</span> : ''
                }
                
              </div>
            </button>
            </Link>
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src={image}
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
              > 
                <li>
                  <button onClick={handleLogout}>Logout</button>
                </li>
              </ul>
            </div>
          </div>
        ) : (
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
        )}
      </div>
    </div>
  );
};

export default Navbar;
