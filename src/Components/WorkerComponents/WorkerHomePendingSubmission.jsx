import React, { useContext } from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Loading from '../Loading/Loading';
import { AuthContext } from '../../Authintication/AuthProvider/AuthProvider';
import WorkerSubmissionCard from './WorkerSubmissionCard';
import LottiEmpty from '../LottiEmpty/LottiEmpty';

const WorkerHomePendingSubmission = () => {
    const {user, loading} = useContext(AuthContext)
    const axiosSecure = useAxiosSecure()
    
    const { data:myPendingSubmissions=[], isPending ,refetch  } = useQuery({
        queryKey: ['myPendingSubmissions' ,user?.email], 
        enabled:!loading,
        queryFn: async() =>{
            const {data} = await axiosSecure.get(`/apply/task/${user?.email}`)
            return data
        }
      })
      if(isPending) return <Loading/>


      const pendingSubmissions = myPendingSubmissions.filter(submission => submission.status === 'accept');



    return (
        <div>
             <h1 className='text-center text-3xl underline my-4 font-bold'>Your all approve submission..</h1>
            <div className="md:px-1 lg:px-16 px-0">
      {
        pendingSubmissions.length === 0 ?<LottiEmpty title={'approve submission'}/>:<div className="overflow-x-auto">
        <table className="md:table">
          {/* head */}
          <thead >
            <tr>
              <th>Task info</th>
              <th>Buyer info</th>
              <th>Amount</th>  
              <th>Status</th> 
            </tr>
          </thead>
          <tbody className="">
            {/* row 1 */}
            {
                pendingSubmissions.map(item=> <WorkerSubmissionCard key={item._id} refetch={refetch} item={item}/>)
            }
            
            
            {/* row 2 */}
            
          </tbody> 
        </table>
      </div>
      }
      
    </div>
        </div>
    );
};

export default WorkerHomePendingSubmission;