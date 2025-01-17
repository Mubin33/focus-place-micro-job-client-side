import React from 'react';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../Hooks/useAxiosSecure/useAxiosSecure';

const AdminUserCard = ({item, refetch}) => {
    const {_id, image, role, name, amount, email} = item
    const axiosSecure = useAxiosSecure()



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
                    axiosSecure.delete(`/user/delete/${id}`)
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



      const handleRoleChange = async (id, previousRole, updateRole) => {
        if (previousRole === updateRole) {
          return console.log("sorry");
        }
        try {
          await axiosSecure.patch(`/user/role/update/${id}`,{ role: updateRole, } );
          refetch()
          Swal.fire({
            title: "Wow!",
                    text: "You update user role",
                    icon: "success"
          })
        } catch (error) {
          console.log(error);
        }
      };





    return (
        <tr className="border-t-[1px] md:border-none ">
      <td>
        <div className="flex items-center gap-1 md:gap-3">
          <div className="hidden md:block  avatar">
            <div className="hidden md:block  mask mask-squircle h-12 w-12">
              <img src={image} alt="Avatar Tailwind CSS Component" />
            </div>
          </div>
          <div>
            <div className="text-[10px] md:text-xs px-2 md:px-0  md:font-bold">
              {name}
            </div>
            <div className="text-[10px] md:text-xs px-2 md:px-0  opacity-50">
              {email}
            </div>
          </div>
        </div>
      </td>
      <td className="text-xs">
        {role}
        <br />
        <span className="text-[10px] md:text-xs px-2 md:px-0  opacity-50 ">
          {amount}coins
        </span>
      </td>
      <td onClick={()=>handleDelete(_id)} className="text-[10px] md:btn btn-sm md:p-3  md:text-xs">X</td>
      <td className="text-[10px] px-2 md:px-0 md:text-xs">
      <select
                className="select select-bordered select-xs  "
                onChange={(e) => {
                  const newRole = e.target.value;
                  handleRoleChange(_id, role, newRole);
                }}
                defaultValue={role}
              >
                <option value="worker">
                  Worker
                </option>
                <option value="buyer">Buyer</option>
                <option value="admin">Admin</option>
              </select>
</td>
    </tr>
    );
};

export default AdminUserCard;