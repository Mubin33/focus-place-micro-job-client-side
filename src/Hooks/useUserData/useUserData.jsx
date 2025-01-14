import React, { useContext } from 'react';
import { AuthContext } from '../../Authintication/AuthProvider/AuthProvider'; 
import { 
    useQuery,
  } from '@tanstack/react-query'
import useAxiosPublic from '../useAxiosPublic/useAxiosPublic';

const useUserData = () => {
    const {user, loading} = useContext(AuthContext)
    const axiosPublic = useAxiosPublic()

    const { data:userData=[], isPending   } = useQuery({
        queryKey: ['userData', user?.email],
        enabled:!loading,
        queryFn: async() =>{
            const {data} = await axiosPublic.get(`/user/${user?.email}`)
            return data
        }
      })


    return [userData, isPending]
};

export default useUserData;