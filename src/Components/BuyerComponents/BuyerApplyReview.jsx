import React, { useContext } from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Loading from '../Loading/Loading';
import { AuthContext } from '../../Authintication/AuthProvider/AuthProvider';
import BuyerReviewCard from './BuyerReviewCard';

const BuyerApplyReview = () => {
    const {user, loading} = useContext(AuthContext)
    const axiosSecure = useAxiosSecure()
    
    const { data:allTask=[], isPending ,refetch  } = useQuery({
        queryKey: ['allTask',user?.email ],
        enabled:!loading, 
        queryFn: async() =>{
            const {data} = await axiosSecure.get(`/buyer/apply/task/${user?.email}`)
            return data
        }
      })
      if(isPending) return <Loading/>


return (
<div className="md:px-1 lg:px-16 px-0">
  <div className="overflow-x-auto">
    <table className="md:table">
      {/* head */}
      <thead >
        <tr>
          <th>Worker info</th>
          <th>Task info</th>
          <th>Submission details</th> 
          <th>Action</th> 
        </tr>
      </thead>
      <tbody className="">
        {/* row 1 */}
        {
            allTask.map(item=> <BuyerReviewCard key={item._id} refetchi={refetch} item={item}/>)
        }
        
        
        {/* row 2 */}
        
      </tbody> 
    </table>
  </div>
</div>
);
};

export default BuyerApplyReview;