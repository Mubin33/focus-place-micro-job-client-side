import React, { useContext } from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../../Components/Loading/Loading';
import { AuthContext } from '../../../Authintication/AuthProvider/AuthProvider';
import WorkerSubmissionCard from '../../../Components/WorkerComponents/WorkerSubmissionCard';

const WorkerMySubmissions = () => {
    const {user, loading} = useContext(AuthContext)


    const axiosSecure = useAxiosSecure()
    
        const { data:mySubmissions=[], isPending ,refetch  } = useQuery({
            queryKey: ['mySubmissions' ,user?.email], 
            enabled:!loading,
            queryFn: async() =>{
                const {data} = await axiosSecure.get(`/apply/task/${user?.email}`)
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
              <th>Task info</th>
              <th>Buyer info</th>
              <th>Amount</th>  
              <th>Status</th> 
            </tr>
          </thead>
          <tbody className="">
            {/* row 1 */}
            {
                mySubmissions.map(item=> <WorkerSubmissionCard key={item._id} refetch={refetch} item={item}/>)
            }
            
            
            {/* row 2 */}
            
          </tbody> 
        </table>
      </div>
    </div>
    );
};

export default WorkerMySubmissions;