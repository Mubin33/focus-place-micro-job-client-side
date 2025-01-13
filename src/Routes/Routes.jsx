import { createBrowserRouter } from "react-router-dom";
import PublicHome from './../Pages/PublicHome/PublicHome';
import Login from "../Authintication/Login/Login";
import Register from "../Authintication/Register/Register";
import PublicLayout from "../Layouts/PublicLayout/PublicLayout";
import Dashboard from "../Layouts/Dashboard/Dashboard";
import DashboardHome from "../Pages/DashboardPages/DashboardHome/DashboardHome";
import AdminManageTask from './../Pages/DashboardPages/AdminPages/AdminManageTask';
import AdminManageUsers from './../Pages/DashboardPages/AdminPages/AdminManageUsers';
import BuyerAddNewTasks from './../Pages/DashboardPages/BuyerPages/BuyerAddNewTasks';
import BuyerMyTask from './../Pages/DashboardPages/BuyerPages/BuyerMyTask';
import BuyerPaymentHistory from './../Pages/DashboardPages/BuyerPages/BuyerPaymentHistory';
import BuyerPurchaseCoin from './../Pages/DashboardPages/BuyerPages/BuyerPurchaseCoin';
import WorkerTaskList from './../Pages/DashboardPages/WorkerPages/WorkerTaskList';
import WorkerMySubmissions from './../Pages/DashboardPages/WorkerPages/WorkerMySubmissions';
import WorkerWithdrawals from './../Pages/DashboardPages/WorkerPages/WorkerWithdrawals';


export const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout />,
    // errorElement: <Error />,
    children: [
        {path:'/', element:<PublicHome/>},
        {path:'/dashboard', element:<Dashboard/>, children:[
          {path:'home', element:<DashboardHome/>},
          // admin routes
          {path:'adminmanagetask', element:<AdminManageTask/>},
          {path:'adminmanageusers', element:<AdminManageUsers/>}, 
          // buyer routes
          {path:'addnewtask', element:<BuyerAddNewTasks/>},
          {path:'mytask', element:<BuyerMyTask/>},
          {path:'paymenthistory', element:<BuyerPaymentHistory/>},
          {path:'purchasecoin', element:<BuyerPurchaseCoin/>}, 
          // worker routes
          {path:'tasklist', element:<WorkerTaskList/>}, 
          {path:'mysubmition', element:<WorkerMySubmissions/>}, 
          {path:'withdraw', element:<WorkerWithdrawals/>}, 
        ]},
    ]},
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
]);
