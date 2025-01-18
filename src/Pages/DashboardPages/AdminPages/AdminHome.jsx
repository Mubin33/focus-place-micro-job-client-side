import React from 'react';
import AdminWithdrawApprovel from '../../../Components/AdminComponents/AdminWithdrawApprovel';
import AdminHomeStates from '../../../Components/AdminComponents/AdminHomeStates';

const AdminHome = () => {
    return (
        <div>
            <div><AdminHomeStates/></div>
            <div>
                <AdminWithdrawApprovel/>
            </div>
        </div>
    );
};

export default AdminHome;