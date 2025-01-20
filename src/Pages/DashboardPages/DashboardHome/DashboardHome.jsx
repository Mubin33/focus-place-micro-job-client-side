import React from 'react'; 
import BuyerHome from '../BuyerPages/BuyerHome';
import WorkerHome from '../WorkerPages/WorkerHome';
import AdminHome from '../AdminPages/AdminHome';
import useUserData from '../../../Hooks/useUserData/useUserData';
import { Helmet } from "react-helmet-async";

const DashboardHome = () => {
    const [userData, isPending] = useUserData()
    const {role} = userData
    return (
        <div> 
            <Helmet>
      <title>Home-dashboard || Focus-Place</title>
      </Helmet>
            {role === 'admin' && <AdminHome/>}
            {role === 'buyer' &&  <BuyerHome/>}
            {role === 'worker' &&  <WorkerHome/>}
            
            
            

        </div>
    );
};

export default DashboardHome;