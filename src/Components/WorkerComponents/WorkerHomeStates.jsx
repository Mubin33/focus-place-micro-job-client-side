import React from 'react';
import useUserData from '../../Hooks/useUserData/useUserData';
import useAxiosSecure from '../../Hooks/useAxiosSecure/useAxiosSecure';
import { useQuery } from '@tanstack/react-query'; 

const WorkerHomeStates = () => {
    const [userData, isPending] = useUserData()

    const axiosSecure = useAxiosSecure()
    
    const {email, name, amount, role} = userData


    const { data:myPendingSubmissions=[]} = useQuery({
        queryKey: ['myPendingSubmissions' , email], 
        enabled:!isPending,
        queryFn: async() =>{
            const {data} = await axiosSecure.get(`/apply/task/${email}`)
            return data
        }
      }) 

      const pendingSubmissions = myPendingSubmissions.filter(submission => submission.status === 'pending');

      const totalSubmission = myPendingSubmissions.length
      const totalPendingSubmission = pendingSubmissions.length
      const totalEarning = (amount-10)


      const fixedAmount = (amount) => {
        return parseFloat(amount).toFixed(2);
      };


    return (
        <div className=" ">
  <h1 className="text-3xl font-bold underline my-2">States</h1>
  <div className="stats shadow bg-base-300 mx-10 flex flex-wrap justify-center gap-6">
    {/* Total Task Count */}
    <div className="stat place-items-center w-full sm:w-1/3 md:w-1/4 flex-grow">
      <div className="stat-title">Total Task Submission</div>
      <div className="stat-value">{totalSubmission}</div>
    </div>

    {/* Pending Tasks */}
    <div className="stat place-items-center w-full sm:w-1/3 md:w-1/4 flex-grow">
      <div className="stat-title">Pending Submission</div>
      <div className="stat-value text-secondary">{totalPendingSubmission}</div>
   </div>

    {/* Total Payment */}
    <div className="stat place-items-center w-full sm:w-1/3 md:w-1/4 flex-grow">
      <div className="stat-title">Total Earning</div>
      <div className="stat-value">{fixedAmount(totalEarning)}coin</div> 
    </div>
  </div>
</div>
    );
};

export default WorkerHomeStates;