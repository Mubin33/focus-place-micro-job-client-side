import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { imageUpload } from "../../../api/utlis";
import useAxiosSecure from "../../../Hooks/useAxiosSecure/useAxiosSecure";
import useUserData from "../../../Hooks/useUserData/useUserData";
import Loading from "../../../Components/Loading/Loading";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";




const BuyerAddNewTasks = () => { 
    const [imagePreview, setImagePreview] = useState(null);
    const [imageInfo, setImageInfo] = useState(null);
    const axiosSecure = useAxiosSecure()
    const [userData, isPending,refetch] = useUserData()
    const navigate = useNavigate()

    

    const {amount, email, name, image}=userData


    const {
        reset,
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();


    const today = new Date();
  const minDate = new Date(today.setDate(today.getDate() + 1))
    .toISOString()
    .split("T")[0]; 
  
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = () => {
            setImagePreview(reader.result);
          };
          reader.readAsDataURL(file);
      
          setImageInfo({ name: file.name, size: (file.size / 1024).toFixed(2) + " KB" });
        } else {
          setImagePreview(null);
          setImageInfo(null);
        }
      }; 




    
    
      const onSubmit =async (data) => {
        const imageFile = data.image[0];
        const taskImage = await imageUpload(imageFile) 
        let perTaskAmount = parseFloat(data.payable_amount)
        let totalWorker = parseInt(data.required_workers)
        let totalAmount = parseFloat(perTaskAmount*totalWorker)
        let afterAmount = (amount-totalAmount)
        try{
            if(amount< totalAmount){
                Swal.fire({
                    icon:"error",
                    title:"Opps, you do not have insufeciant Balance"
                })
            }else{
                await axiosSecure.post('/task', {
                    taskImage:taskImage,
                    submission_info:data.submission_info,
                    completion_date:data.completion_date,
                    perTaskAmount:parseFloat(data.payable_amount), 
                    totalAmountPay:totalAmount,
                    required_workers:totalWorker,
                    task_detail:data.task_detail,
                    task_title :data.task_title,
                    buyerEmail:email,
                    buyerName:name,
                    buyerImage:image,
                    status:"pending"
                })
                await axiosSecure.patch(`/users/amount/update/${email}`,{amount:afterAmount})
                Swal.fire({
                    icon:"success",
                    title:"Wow! successfully published your task"
                })
                navigate('/dashboard/mytask')
            }
        }catch(err){
            console.log(err)
        }finally{
            reset();  
            refetch()
        }
      
      };
      

      if(isPending) return <Loading/>


    return (
        <div >
            <div className="max-w-xl mx-auto mt-10 p-6 bg-gray-100 border border-gray-300 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-700 mb-6 text-center">
        Create a Task
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Task Title */}
        <div>
          <label className="block text-gray-600 font-medium mb-2">
            Task Title
          </label>
          <input
            type="text"
            {...register("task_title", { required: "Task title is required" })}
            placeholder="Ex: Watch my YouTube video and make a comment"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
          />
          {errors.task_title && (
            <p className="text-red-500 text-xs mt-1">{errors.task_title.message}</p>
          )}
        </div>

        {/* Task Detail */}
        <div>
          <label className="block text-gray-600 font-medium mb-2">
            Task Detail
          </label>
          <textarea
            {...register("task_detail", {
              required: "Task detail is required",
            })}
            placeholder="Provide a detailed description of the task"
            rows="4"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
          ></textarea>
          {errors.task_detail && (
            <p className="text-red-500 text-xs mt-1">{errors.task_detail.message}</p>
          )}
        </div>

        {/* Required Workers */}
        <div>
          <label className="block text-gray-600 font-medium mb-2">
            Required Workers
          </label>
          <input
            type="number"
            {...register("required_workers", {
              required: "Number of workers is required",
              min: { value: 1, message: "At least 1 worker is required" },
            })}
            placeholder="Ex: 100"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
          />
          {errors.required_workers && (
            <p className="text-red-500 text-xs mt-1">{errors.required_workers.message}</p>
          )}
        </div>

        {/* Payable Amount */}
        <div>
          <label className="block text-gray-600 font-medium mb-2">
            Payable Amount (per worker)
          </label>
          <input
            type="number"
            {...register("payable_amount", {
              required: "Payable amount is required",
              min: { value: 1, message: "Amount must be at least 1" },
            })}
            placeholder="Ex: 10"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
          />

          {errors.payable_amount && (
            <p className="text-red-500 text-xs mt-1">{errors.payable_amount.message}</p>
          )}
        </div>

        {/* Completion Date */}
        <div>
          <label className="block text-gray-600 font-medium mb-2">
            Completion Date
          </label>
          <input
            type="date"
            min={minDate} // Set the minimum selectable date
            {...register("completion_date", {
              required: "Completion date is required",
            })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
          />
          {errors.completion_date && (
            <p className="text-red-500 text-xs mt-1">
              {errors.completion_date.message}
            </p>
          )}
        </div>

        {/* Submission Info */}
        <div>
          <label className="block text-gray-600 font-medium mb-2">
            Submission Info
          </label>
          <input
            type="text"
            {...register("submission_info", {
              required: "Submission info is required",
            })}
            placeholder="Ex: Upload a screenshot or proof"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
          />
          {errors.submission_info && (
            <p className="text-red-500 text-xs mt-1">{errors.submission_info.message}</p>
          )}
        </div>

        {/* Task Image */} 
        <div className="  flex justify-between">
            <div>
            
  <label className="label">
    <span className="label-text">Task Image</span>
  </label>
  <input
    type="file"
    id="image"
    accept="image/*"
    {...register("image", { required: "Task image is required" })}
    onChange={(e) => {
      handleImageChange(e); // Preview the image
    }}
    className="file-input file-input-bordered w-full max-w-xs"
  />
  </div>
  <div>

  {imagePreview && (
      <div className="mt-4">
    <p className="text-gray-500 text-sm">Image Preview:</p>
    <img src={imagePreview} alt="Preview" className="w-32 h-32 object-cover mt-2" />
    <p className="text-gray-500 text-sm">Name: {imageInfo?.name}</p>
    <p className="text-gray-500 text-sm">Size: {imageInfo?.size}</p>
  </div>
)}
</div>
      </div>
  {errors.image && (
    <p className="text-red-500 text-xs mt-1">{errors.image.message}</p>
  )}


        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-sky-400 text-white py-3 rounded-lg font-medium hover:bg-blue-600 transition"
        >
          Submit Task
        </button>
      </form>
    </div>
        </div>
    );
};

export default BuyerAddNewTasks;