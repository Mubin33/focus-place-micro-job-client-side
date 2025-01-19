import React from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure/useAxiosSecure";
import Swal from "sweetalert2";
import useUserData from './../../Hooks/useUserData/useUserData';

const AdminReviewWithdraw = ({ item, refetch }) => {
  // noti 1
  const [userData] = useUserData()
  const {email, name,role} = userData
  
  const axiosSecure = useAxiosSecure();
  const {
    _id,
    coin,
    dollar,
    method,
    number,
    workerEmail,
    workerAmount,
    status,
    currentDate,
  } = item;

  const afterAmount = parseFloat(workerAmount - coin);


  // noti 2
  const currentDateTime = new Date(); 
console.log("Current Date and Time:", currentDateTime); 
const formattedDateTime = `${currentDateTime.getFullYear()}-${String(currentDateTime.getMonth() + 1).padStart(2, '0')}-${String(currentDateTime.getDate()).padStart(2, '0')} ${String(currentDateTime.getHours()).padStart(2, '0')}:${String(currentDateTime.getMinutes()).padStart(2, '0')}:${String(currentDateTime.getSeconds()).padStart(2, '0')}`;


  const handleStatusChange = async (id, previousStatus, updateStatus) => {

    // noti 3
    const massage = `${role}: ${updateStatus} your Withdraw request, your amount ${coin}coin/ ${dollar}$ `
    const notificationInfo = {
      fromRole:role,
      fromEmail:email, 
      toEmail:workerEmail,
      toRole:'worker',
      massage,
      time:formattedDateTime,
      status:'pending',
      goToPage:'/dashboard/withdraw'
    }




    if (previousStatus === updateStatus) {
      return console.log("sorry");
    }
    try {
      await axiosSecure.patch(`/withdraw/status/update/${id}`, {
        status: updateStatus,
      });

      if (updateStatus === "accept") {
        await axiosSecure.patch(`/users/amount/update/${workerEmail}`, {
          amount: afterAmount,
        });
      }
      // noti 4
      await axiosSecure.post(`/notification`, notificationInfo);
      Swal.fire({
        title: "Wow!",
        text: "You update user status",
        icon: "success",
      });
    } catch (error) {
      console.log(error);
    } finally {
      refetch();
    }
  };

  return (
    <tr className="border-t-[1px] md:border-none ">
      <td>
        <div className="flex items-center gap-1 md:gap-3">
          <div>
            <div className="text-[10px] md:text-xs px-2 md:px-0  md:font-bold">
              {workerEmail}
            </div>
            <div className="text-[10px] md:text-xs px-2 md:px-0  opacity-50">
              {number}
            </div>
          </div>
        </div>
      </td>
      <td className="text-xs">
        {method}
        <br />
        <span className="text-[10px] md:text-xs px-2 md:px-0  opacity-50 ">
          {currentDate}coin
        </span>
      </td>
      <td className="text-xs">
        {dollar}
        <br />
        <span className="text-[10px] md:text-xs px-2 md:px-0  opacity-50 ">
          {coin}
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

export default AdminReviewWithdraw;
