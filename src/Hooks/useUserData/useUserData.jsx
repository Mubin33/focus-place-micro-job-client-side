import React, { useContext } from 'react';
import { AuthContext } from '../../Authintication/AuthProvider/AuthProvider'; 
import { 
    useQuery,
  } from '@tanstack/react-query' 
import useAxiosSecure from '../useAxiosSecure/useAxiosSecure';

const useUserData = () => {
    const {user, loading} = useContext(AuthContext)
    const axiosSecure =  useAxiosSecure()

    const { data:userData=[], isPending ,refetch  } = useQuery({
        queryKey: ['userData', user?.email],
        enabled:!loading,
        queryFn: async() =>{
            const {data} = await axiosSecure.get(`/user/${user?.email}`)
            return data
        }
      })


    return [userData, isPending,refetch]
};

export default useUserData;