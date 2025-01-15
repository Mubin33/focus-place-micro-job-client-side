import React from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure/useAxiosSecure";
import Swal from "sweetalert2";

const AdminTaskCard = ({ item, refetch }) => {
    const axiosSecure = useAxiosSecure()
  const {
    _id,
    buyerName,
    buyerEmail,
    task_title,
    required_workers,
    perTaskAmount,
    taskImage,
  } = item;


  const handleDelete=async(id)=>{
    try{
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/task/delete/${id}`)
                refetch()
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
              });
            }
          });
    }catch(err){
        console.log(err)
    }
  }

  return (
    <tr className="border-t-[1px] md:border-none ">
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
              ${perTaskAmount}
            </div>
          </div>
        </div>
      </td>
      <td className="text-xs">
        {buyerName}
        <br />
        <span className="text-[10px] md:text-xs px-2 md:px-0  opacity-50 ">
          {buyerEmail}
        </span>
      </td>
      <td className="text-[10px] px-2 md:px-0  md:text-xs">
        {required_workers}
      </td>
      <td onClick={()=>handleDelete(_id)} className="text-[10px] md:btn btn-sm md:p-3  md:text-xs">X</td>
    
    </tr>
  );
};

export default AdminTaskCard;
