import React from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure/useAxiosSecure";
import Swal from "sweetalert2";

const AdminReviewWithdraw = ({ item, refetch }) => {
  
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

  const handleStatusChange = async (id, previousStatus, updateStatus) => {
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
