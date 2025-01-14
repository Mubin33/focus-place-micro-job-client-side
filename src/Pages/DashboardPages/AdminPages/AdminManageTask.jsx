import React from "react";
import AdminTaskCard from "../../../Components/AdminComponents/AdminTaskCard";
import useAxiosSecure from "../../../Hooks/useAxiosSecure/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../Components/Loading/Loading";

const AdminManageTask = () => {

    const axiosSecure = useAxiosSecure()
    
        const { data:allTask=[], isPending ,refetch  } = useQuery({
            queryKey: ['allTask' ], 
            queryFn: async() =>{
                const {data} = await axiosSecure.get(`/task`)
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
              <th>Quantity</th>  
              <th>Action</th> 
            </tr>
          </thead>
          <tbody className="">
            {/* row 1 */}
            {
                allTask.map(item=> <AdminTaskCard key={item._id} refetch={refetch} item={item}/>)
            }
            
            
            {/* row 2 */}
            
          </tbody> 
        </table>
      </div>
    </div>
  );
};

export default AdminManageTask;
