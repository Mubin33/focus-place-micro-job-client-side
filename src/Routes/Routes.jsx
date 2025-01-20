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
import PrivetRoute from "../PrivetRoute/PrivetRoute";
import BuyerUpdateTask from "../Pages/DashboardPages/BuyerPages/BuyerUpdateTask";
import WorkerTaskDetails from "../Pages/DashboardPages/WorkerPages/WorkerTaskDetails";
// import PaymentForm from "../Pages/Payment/PaymentForm";
import PaymentReservation from "../Pages/Payment/PaymentReservation";
import AdminRoute from "./AdminRoute";
import BuyerRoute from "./BuyerRoute";
import WorkerRoute from "./WorkerRoute";
import SubmissionDetails from "../Pages/DashboardPages/BuyerPages/SubmissionDetails";
import Notification from "../Pages/Notification/Notification";
import ErrorElement from "../Pages/ErrorElement/ErrorElement";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout />,
    errorElement:<ErrorElement/>,
    // errorElement: <Error />,
    children: [
        {path:'/', element:<PublicHome/>},
        {path:'/dashboard', element:<PrivetRoute><Dashboard/> </PrivetRoute> , 
          children:[
          {path:'home', element:<DashboardHome/>},
          {path:'notification', element: <Notification/>},
          // admin routes
          {path:'adminmanagetask', element:<AdminRoute>  <AdminManageTask/></AdminRoute>},
          {path:'adminmanageusers', element:<AdminRoute>  <AdminManageUsers/></AdminRoute>}, 
          // buyer routes
          {path:'addnewtask', element:<BuyerRoute> <BuyerAddNewTasks/></BuyerRoute>},
          {path:'mytask', element:<BuyerRoute><BuyerMyTask/></BuyerRoute>},
          {path:'paymenthistory', element:<BuyerRoute><BuyerPaymentHistory/></BuyerRoute>},
          {path:'purchasecoin', element:<BuyerRoute><BuyerPurchaseCoin/></BuyerRoute>}, 
          {path:'buyerpaymentform/:tk', element:<BuyerRoute><PaymentReservation/></BuyerRoute>}, 
          {path:'updatetask/:id', element:<BuyerRoute><BuyerUpdateTask/></BuyerRoute>,
            loader:({params})=>fetch(`${import.meta.env.VITE_BASE_URL}/per/task/${params.id}`)
          }, 
          {path:'submission/:id', element:<BuyerRoute><SubmissionDetails/></BuyerRoute>,
            loader:({params})=>fetch(`${import.meta.env.VITE_BASE_URL}/submission/details/${params.id}`)
          }, 
          // worker routes
          {path:'tasklist', element:<WorkerRoute><WorkerTaskList/></WorkerRoute>}, 
          {path:'mysubmition', element:<WorkerRoute><WorkerMySubmissions/></WorkerRoute>}, 
          {path:'withdraw', element:<WorkerRoute><WorkerWithdrawals/></WorkerRoute>}, 
          {path:'taskdetails/:id', element:<WorkerRoute><WorkerTaskDetails/></WorkerRoute>,
            loader:({params})=>fetch(`${import.meta.env.VITE_BASE_URL}/per/task/${params.id}`)
          }, 
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
