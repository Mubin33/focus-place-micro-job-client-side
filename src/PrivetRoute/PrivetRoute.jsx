import React, { useContext } from 'react';
import { AuthContext } from '../Authintication/AuthProvider/AuthProvider';
import { Navigate } from 'react-router-dom';
import Loading from '../Components/Loading/Loading';

const PrivetRoute = ({children}) => {
    const {user,loading} = useContext(AuthContext)
    if(loading){
        return <Loading/>
    }
    if(user){
        return children
    }
    return <Navigate to='/login'></Navigate>
};

export default PrivetRoute;