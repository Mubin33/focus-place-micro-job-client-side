import React from 'react';
import useUserData from '../Hooks/useUserData/useUserData';
import Loading from '../Components/Loading/Loading';
import { Navigate } from 'react-router-dom';

const WorkerRoute = ({children}) => {
    const [userData, isPending] = useUserData()
    const {role} = userData

    if (isPending) return <Loading />
    if (role === 'worker') return children
    return <Navigate to='/'   />
};

export default WorkerRoute;