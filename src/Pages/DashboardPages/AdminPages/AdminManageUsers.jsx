import React from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../../Components/Loading/Loading';
import AdminUserCard from '../../../Components/AdminComponents/AdminUserCard';

const AdminManageUsers = () => {

    const axiosSecure = useAxiosSecure()
    
        const { data:allUsers=[], isPending ,refetch  } = useQuery({
            queryKey: ['allUsers' ], 
            queryFn: async() =>{
                const {data} = await axiosSecure.get(`/users`)
                return data
            }
          })
        //   console.log(allUsers)

          if(isPending) return <Loading/>


    return (
        <div className="md:px-1 lg:px-16 px-0">
      <div className="overflow-x-auto">
        <table className="md:table">
          {/* head */}
          <thead >
            <tr>
              <th>User info</th>
              <th>Role & coin</th>
              <th>Delete</th>  
              <th>Action</th> 
            </tr>
          </thead>
          <tbody className="">
            {/* row 1 */}
            {
                allUsers.map(item=> <AdminUserCard key={item._id} refetch={refetch} item={item}/>)
            }
            
            
            {/* row 2 */}
            
          </tbody> 
        </table>
      </div>
    </div>
    );
};

export default AdminManageUsers;