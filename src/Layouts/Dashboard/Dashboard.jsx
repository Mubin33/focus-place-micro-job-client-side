import { NavLink, Outlet, useLocation } from "react-router-dom";
import { IoMdHome } from "react-icons/io";
import { FaTasks } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { MdAddTask } from "react-icons/md";
import { BiTask } from "react-icons/bi";
import { TbCoinFilled } from "react-icons/tb";
import { MdOutlinePayment } from "react-icons/md";
import { SiGoogletasks } from "react-icons/si";
import { BsCashCoin } from "react-icons/bs";






const Dashboard = () => {
  const location = useLocation();
  return (
    <div>
      <div className="flex">
        <div className="w-11 md:w-40 lg:w-56 min-h-screen bg-base-300">
          <ul className="p-2 lg:p-4 mt-5 md:mt-10 space-y-3">
            {/* Admin routes */}
            <li
              className={`text-lg md:text-sm lg:text-lg   cursor-pointer p-1 lg:p-2 ${
                location.pathname === "/dashboard/home"
                  ? "text-white bg-black rounded-md"
                  : ""
              }`}
            >
              <NavLink className="flex gap-2 items-center" to="/dashboard/home">
                <IoMdHome />
                <span className="hidden md:block">Home</span>
              </NavLink>
            </li>{" "}
            <li
              className={`text-lg md:text-sm lg:text-lg     cursor-pointer p-1 lg:p-2 ${
                location.pathname === "/dashboard/adminmanagetask"
                  ? "text-white bg-black rounded-md"
                  : ""
              }`}
            >
              <NavLink
                className="flex gap-2 items-center"
                to="/dashboard/adminmanagetask"
              >
                <FaTasks />
                <span className="hidden md:block">Manage Task</span>
              </NavLink>
            </li>{" "}
            <li
              className={`text-lg md:text-sm lg:text-lg    cursor-pointer p-1 lg:p-2 ${
                location.pathname === "/dashboard/adminmanageusers"
                  ? "text-white bg-black rounded-md"
                  : ""
              }`}
            >
              <NavLink
                className="flex gap-2 items-center"
                to="/dashboard/adminmanageusers"
              >
                <FaUsers />
                <span className="hidden md:block">Manage Users</span>
              </NavLink>
            </li>{" "}
            {/*  */}

            {/* Buyer routes */}
            <li
              className={`text-lg md:text-sm lg:text-lg    cursor-pointer p-1 lg:p-2 ${
                location.pathname === "/dashboard/addnewtask"
                  ? "text-white bg-black rounded-md"
                  : ""
              }`}
            >
              <NavLink
                className="flex gap-2 items-center"
                to="/dashboard/addnewtask"
              >
                <MdAddTask />
                <span className="hidden md:block">Add Task</span>
              </NavLink>
            </li>{" "}
            <li
              className={`text-lg md:text-sm lg:text-lg    cursor-pointer p-1 lg:p-2 ${
                location.pathname === "/dashboard/mytask"
                  ? "text-white bg-black rounded-md"
                  : ""
              }`}
            >
              <NavLink
                className="flex gap-2 items-center"
                to="/dashboard/mytask"
              >
                <BiTask />
                <span className="hidden md:block">My Task</span>
              </NavLink>
            </li>{" "}
            <li
              className={`text-lg md:text-sm lg:text-lg    cursor-pointer p-1 lg:p-2 ${
                location.pathname === "/dashboard/purchasecoin"
                  ? "text-white bg-black rounded-md"
                  : ""
              }`}
            >
              <NavLink
                className="flex gap-2 items-center"
                to="/dashboard/purchasecoin"
              >
                <TbCoinFilled />
                <span className="hidden md:block">Purchase Coin</span>
              </NavLink>
            </li>{" "}
            <li
              className={`text-lg md:text-sm lg:text-lg    cursor-pointer p-1 lg:p-2 ${
                location.pathname === "/dashboard/paymenthistory"
                  ? "text-white bg-black rounded-md"
                  : ""
              }`}
            >
              <NavLink
                className="flex gap-2 items-center"
                to="/dashboard/paymenthistory"
              >
               <MdOutlinePayment />
                <span className="hidden md:block">Payment History</span>
              </NavLink>
            </li>{" "}
            {/*  */}

            {/* worker routes */}
            <li
              className={`text-lg md:text-sm lg:text-lg    cursor-pointer p-1 lg:p-2 ${
                location.pathname === "/dashboard/tasklist"
                  ? "text-white bg-black rounded-md"
                  : ""
              }`}
            >
              <NavLink
                className="flex gap-2 items-center"
                to="/dashboard/tasklist"
              >
               <FaTasks />
                <span className="hidden md:block">Task List</span>
              </NavLink>
            </li>{" "}
            <li
              className={`text-lg md:text-sm lg:text-lg    cursor-pointer p-1 lg:p-2 ${
                location.pathname === "/dashboard/mysubmition"
                  ? "text-white bg-black rounded-md"
                  : ""
              }`}
            >
              <NavLink
                className="flex gap-2 items-center"
                to="/dashboard/mysubmition"
              >
               <SiGoogletasks />
                <span className="hidden md:block">My Submissions</span>
              </NavLink>
            </li>{" "}
            <li
              className={`text-lg md:text-sm lg:text-lg    cursor-pointer p-1 lg:p-2 ${
                location.pathname === "/dashboard/withdraw"
                  ? "text-white bg-black rounded-md"
                  : ""
              }`}
            >
              <NavLink
                className="flex gap-2 items-center"
                to="/dashboard/withdraw"
              >
               <BsCashCoin />
                <span className="hidden md:block">Withdraw</span>
              </NavLink>
            </li>{" "}

          </ul>
        </div>
        <div className="flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
