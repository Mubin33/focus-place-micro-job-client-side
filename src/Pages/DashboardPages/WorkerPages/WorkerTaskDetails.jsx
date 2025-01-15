import React, { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure/useAxiosSecure";
import useUserData from "../../../Hooks/useUserData/useUserData";

const WorkerTaskDetails = () => {
    const navigate = useNavigate()
    const axiosSecure = useAxiosSecure()
    const [userData, isPending] = useUserData() 
    const [isSubmitting, setIsSubmitting] = useState(false);
 const {amount ,
    email ,
    image ,
    name ,
    role,} = userData
  const data = useLoaderData();
  const {
    buyerEmail,
    buyerImage,
    buyerName,
    completion_date,
    perTaskAmount,
    required_workers,
    submission_info,
    taskImage,
    task_detail,
    task_title,
    _id,
  } = data;


   
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');  
    const day = String(today.getDate()).padStart(2, '0');  
    const applyDate =  `${year}-${month}-${day}`; 

  

    let after_required_workers = parseInt(required_workers - 1) 






    const handleForm = async (e) => {
      e.preventDefault();
  
      setIsSubmitting(true);
      let worker_apply_info = e.target.worker_apply_info.value;
  
      if (after_required_workers < 0) {
          Swal.fire({
              icon: "error",
              title: "Error!",
              text: "No more workers are required for this task.",
          });
          return;
      }
  
      const applyInfo = {
          task_id: _id,
          task_title,
          perTaskAmount,
          worker_email: email,
          submission_details: worker_apply_info,
          worker_name: name,
          buyerEmail,
          buyerName,
          current_date: applyDate,
          status: 'pending',
      };
  
      try {
          await axiosSecure.post(`/worker/apply/task`, applyInfo);
          await axiosSecure.patch(`/task/worker/update/${_id}`, { after_required_workers });
          Swal.fire({
              icon: "success",
              title: "Wow! Successfully Updated",
          });
          navigate("/dashboard/mysubmition");
      } catch (err) {
          console.error(err);
          Swal.fire({
              icon: "error",
              title: "Error!",
              text: "Something went wrong, please try again later.",
          });
      }finally{
        setIsSubmitting(false);
      }
  };









  // const handleForm=async(e)=>{
  //   e.preventDefault()
    

  //   let worker_apply_info = e.target.worker_apply_info.value 
  //   const applyInfo = {
  //       task_id:_id,
  //       task_title,
  //       perTaskAmount,
  //       worker_email:email,
  //       submission_details:worker_apply_info,
  //       worker_name:name,
  //       buyerEmail,
  //       buyerName,
  //       current_date:applyDate,
  //       status:'pending',
  //   } 
  //   console.log(applyInfo)

  //   try {
  //        await axiosSecure.post(`/worker/apply/task`, applyInfo);
  //        await axiosSecure.patch(`/task/worker/update/${_id}`, after_required_workers);
  //         Swal.fire({
  //           icon: "success",
  //           title: "Wow! Successfully Updated",
  //         });
  //         navigate("/dashboard/mysubmition");
  //       } catch (err) {
  //         console.error(err);
  //       }


  // }

  return (
    <div className="bg-base-300 min-h-screen py-10 px-5">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
        {/* Task Title */}
        <h1 className="text-2xl md:text-3xl font-bold mb-4 text-gray-800 text-center">
          {task_title}
        </h1>

        {/* Task Image */}
        <img
          src={taskImage}
          alt="Task"
          className="w-full border-2 border-sky-500 h-64 md:h-80 object-cover rounded-lg mb-4"
        />

        {/* Task Detail */}
        <p className="text-gray-600 text-lg md:text-xl mb-6 text-justify">
          {task_detail}
        </p>

        {/* Buyer and Task Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Buyer Information */}
          <div>
            <h2 className="font-bold text-gray-700 underline text-lg mb-2">
              Buyer Information
            </h2>
            <div className="flex items-center">
              <img
                src={buyerImage}
                alt="Buyer"
                className="w-12 h-12 md:w-14 md:h-14 rounded-full mr-4"
              />
              <div>
                <p className="text-gray-800 font-semibold">{buyerName}</p>
                <p className="text-gray-600">{buyerEmail}</p>
              </div>
            </div>
          </div>

          {/* Task Details */}
          <div>
            <h2 className="font-bold text-gray-700 underline text-lg mb-2">
              Task Details
            </h2>
            <p className="mt-2">
              <span className="font-semibold">Per Task Amount:</span> $
              {perTaskAmount}
            </p>
            <p>
              <span className="font-semibold">Completion Date:</span>{" "}
              {completion_date}
            </p>
          </div>
        </div>

        {/* Submission Info */}
        <div className="mt-6">
          <h2 className="font-bold text-gray-700 text-lg underline mb-2">
            Submission Info
          </h2>
          <p className="text-gray-600 mt-2">
            {submission_info || "No submissions yet."}
          </p>
        </div>
        {/* form */}

        <form onSubmit={handleForm}>
          <div className="mt-6">
            <h2 className="font-bold text-gray-700 text-lg underline mb-2">
              Submission Details
            </h2>
            <textarea
            required
            name="worker_apply_info"
              placeholder="Submit your work"
              className="textarea textarea-bordered textarea-info textarea-md w-full "
            ></textarea>
           <button
    type="submit"
    className="w-full text-sm bg-sky-400 text-white py-3 rounded-lg font-medium hover:bg-blue-600 transition"
    disabled={isSubmitting}
>
    {isSubmitting ? "Submitting..." : "Apply in this task"}
</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WorkerTaskDetails;
