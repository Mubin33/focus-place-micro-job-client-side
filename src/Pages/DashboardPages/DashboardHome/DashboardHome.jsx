import React from 'react'; 
import BuyerHome from '../BuyerPages/BuyerHome';
import WorkerHome from '../WorkerPages/WorkerHome';
import AdminHome from '../AdminPages/AdminHome';
import useUserData from '../../../Hooks/useUserData/useUserData';

const DashboardHome = () => {
    const [userData, isPending] = useUserData()
    const {role} = userData
    return (
        <div> 
            {role === 'admin' && <AdminHome/>}
            {role === 'buyer' &&  <BuyerHome/>}
            {role === 'worker' &&  <WorkerHome/>}
            
            
            

        </div>
    );
};

export default DashboardHome;