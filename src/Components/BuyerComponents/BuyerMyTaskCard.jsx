import React from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure/useAxiosSecure";
import Swal from "sweetalert2";
import useUserData from "./../../Hooks/useUserData/useUserData";
import Loading from "../Loading/Loading";
import { Link } from "react-router-dom";

const BuyerMyTaskCard = ({ item, refetchi }) => {
  const axiosSecure = useAxiosSecure();
  const [userData, isPending, refetch] = useUserData();
  const { amount, email, name, image } = userData;

  const {
    _id,
    completion_date,
    task_title,
    required_workers,
    perTaskAmount,
    taskImage,
  } = item;

  const handleDelete = async (id) => {
    let totalAmount = parseFloat(required_workers * perTaskAmount);
    let afterAmount = parseFloat(amount + totalAmount);
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await axiosSecure.delete(`/task/delete/${id}`);
          await axiosSecure.patch(`/users/amount/update/${email}`, {
            amount: afterAmount,
          });
          refetch();
          refetchi();
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
        }
      });
    } catch (err) {
      //console.log(err);
    }
  };

  if (isPending) return <Loading />;

  return (
    <tr className="border-t-[1px]  md:border-none ">
      <td>
        <div className="flex items-center gap-1 md:gap-3">
          <div className="hidden md:block  avatar">
            <div className="hidden md:block  mask mask-squircle h-12 w-12">
              <img src={taskImage} alt="Avatar Tailwind CSS Component" />
            </div>
          </div>
          <div>
            <div className="text-[10px] md:text-xs px-2 md:px-0  md:font-bold">
              {task_title}
            </div>
            <div className="text-[10px] md:text-xs px-2 md:px-0  opacity-50">
              {completion_date}
            </div>
          </div>
        </div>
      </td>
      <td className="text-xs">
        workers--{required_workers}
        <br />
        <span className="text-[10px] md:text-xs px-2 md:px-0  opacity-50 ">
          {perTaskAmount}coin
        </span>
      </td>
      <td
        onClick={() => handleDelete(_id)}
        className="text-[10px] md:btn btn-sm md:p-3 mr-1 md:text-xs"
      >
        Delete
      </td>
      <Link to={`/dashboard/updatetask/${_id}`}>
        <td className="text-[10px] md:btn btn-sm md:p-3  md:text-xs">Edit</td>
      </Link>
    </tr>
  );
};

export default BuyerMyTaskCard;
