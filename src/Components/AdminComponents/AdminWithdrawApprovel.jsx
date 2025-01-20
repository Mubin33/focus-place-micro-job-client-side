import React, { useContext } from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Loading from '../Loading/Loading';
import AdminReviewWithdraw from './AdminReviewWithdraw';
import { AuthContext } from '../../Authintication/AuthProvider/AuthProvider';
import LottiEmpty from '../LottiEmpty/LottiEmpty';

const AdminWithdrawApprovel = () => {
    const axiosSecure = useAxiosSecure()
    const {user} = useContext(AuthContext)
    
    const { data:allWithdraw=[], isPending ,refetch  } = useQuery({
        queryKey: ['allWithdraw'], 
        queryFn: async() =>{
            const {data} = await axiosSecure.get(`/withdraw`)
            return data
        }
      })
      if(isPending) return <Loading/>

      const filteringOnlyPending= allWithdraw.filter(item=> item.status === 'pending')



    return (
        <div className="md:px-1 lg:px-16 px-0">
          <h1 className='text-center text-3xl underline my-4 font-bold'>Send request for withdraw..</h1>
  {
    filteringOnlyPending.length === 0 ? <LottiEmpty title="withdraw request"/> :  <div className="overflow-x-auto">
    <table className="md:table">
      {/* head */}
      <thead >
        <tr>
          <th>Worker info</th>
          <th>Method & date</th>
          <th>Dollar & coin</th> 
          <th>Action</th> 
        </tr>
      </thead>
      <tbody className="">
        {/* row 1 */}
        {
            filteringOnlyPending.map(item=> <AdminReviewWithdraw key={item._id} refetch={refetch} item={item}/>)
        }
        
        
        {/* row 2 */}
        
      </tbody> 
    </table>
  </div>
  }
 
</div>
    );
};

export default AdminWithdrawApprovel;