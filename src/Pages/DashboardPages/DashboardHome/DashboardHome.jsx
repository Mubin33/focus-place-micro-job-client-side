import React from 'react'; 
import BuyerHome from '../BuyerPages/BuyerHome';
import WorkerHome from '../WorkerPages/WorkerHome';
import AdminHome from '../AdminPages/AdminHome';

const DashboardHome = () => {
    return (
        <div>
            dashboard home all
            <AdminHome/>
            <BuyerHome/>
            <WorkerHome/>

        </div>
    );
};

export default DashboardHome;