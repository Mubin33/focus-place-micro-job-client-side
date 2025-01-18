import React from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure/useAxiosSecure';
import Swal from 'sweetalert2';
import { useQuery } from '@tanstack/react-query';
import Loading from '../Loading/Loading';

const BuyerReviewCard = ({ item, refetchi }) => {

    const axiosSecure = useAxiosSecure()
    const {
      _id,
      task_id,
      task_title,
      perTaskAmount,
      worker_email,
      submission_details,
      worker_name,
      buyerEmail,
      buyerName,
      current_date,
      status,
    } = item;

 
    const { data: { workerUser = [], task = [] } = {}, isPending, refetch } = useQuery({
      queryKey: ['workerUser', worker_email, task_id], // Add all relevant keys
      queryFn: async () => {
        const workerResponse = await axiosSecure.get(`/user/${worker_email}`);
        const taskResponse = await axiosSecure.get(`/per/task/${task_id}`);
        return {
          workerUser: workerResponse.data,
          task: taskResponse.data,
        };
      },
    });
    if(isPending) return <Loading/>
    const workerAmount = workerUser?.amount
    let afterAmount = parseFloat(workerAmount+perTaskAmount)

    const required_workers = task.required_workers
    let after_required_workers = parseInt(required_workers + 1)  



    


      const handleStatusChange = async (id, previousStatus, updateStatus) => {
              if (previousStatus === updateStatus) {
                return console.log("sorry");
              }
              try {
                await axiosSecure.patch(`/apply/task/status/update/${id}`,{ status: updateStatus, } );
 
                if(updateStatus === 'accept'){
                  await axiosSecure.patch(`/users/amount/update/${worker_email}`,{amount:afterAmount})
                }else if(updateStatus === 'reject'){
                  await axiosSecure.patch(`/task/worker/update/${task_id}`, { after_required_workers });
                }
                Swal.fire({
                  title: "Wow!",
                          text: "You update user status",
                          icon: "success"
                })
              } catch (error) {
                console.log(error);
              }finally{
                refetchi()
                refetch()
              }
            };



    return (
        <tr className="border-t-[1px] md:border-none ">
      <td>
        <div className="flex items-center gap-1 md:gap-3"> 
          <div>
            <div className="text-[10px] md:text-xs px-2 md:px-0  md:font-bold">
              {worker_name}
            </div>
            <div className="text-[10px] md:text-xs px-2 md:px-0  opacity-50">
              {worker_email}
            </div>
          </div>
        </div>
      </td>
      <td className="text-xs">
        {task_title}
        <br />
        <span className="text-[10px] md:text-xs px-2 md:px-0  opacity-50 ">
          {perTaskAmount}coin
        </span>
      </td>
      <td className="text-xs">
        {submission_details}
        <br />
        <span className="text-[10px] md:text-xs px-2 md:px-0  opacity-50 ">
          {current_date}
        </span>
      </td>
      <td className="text-[10px] px-2 md:px-0  md:text-xs">
      <select
  className="select select-bordered select-xs"
  onChange={(e) => {
    const newStatus = e.target.value;
    handleStatusChange(_id, status, newStatus);
  }}
  defaultValue={status}
  disabled={status === "accept" || status === "reject"} // Disable conditionally
>
  <option value="pending">Pending</option>
  <option value="accept">Accept</option>
  <option value="reject">Reject</option>
</select>
      </td>
      {/* <td onClick={()=>handleDelete(_id)} className="text-[10px] md:btn btn-sm md:p-3  md:text-xs">X</td> */}
    
    </tr>
    );
};

export default BuyerReviewCard;