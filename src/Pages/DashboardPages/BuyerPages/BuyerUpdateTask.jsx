import React from "react";
import { useForm } from "react-hook-form";
import { useLoaderData, useNavigate } from "react-router-dom";  
import useAxiosSecure from "../../../Hooks/useAxiosSecure/useAxiosSecure";
import Swal from "sweetalert2";

const BuyerUpdateTask = () => {
    const axiosSecure = useAxiosSecure()
  const data = useLoaderData();
  const navigate = useNavigate()
 

  const {
    _id,
    completion_date,
    perTaskAmount,
    required_workers,
    submission_info,
    taskImage,
    task_detail,
    task_title,
    buyerEmail,
    buyerName,
    buyerImage,
    totalAmountPay,
    status,
  } = data;

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (formData) => {
    let updateInfo = {
      submission_info: formData.submission_info,
      task_detail: formData.task_detail,
      task_title: formData.task_title,
    };
  
    try {
     await axiosSecure.patch(`/task/update/${_id}`, updateInfo);
      Swal.fire({
        icon: "success",
        title: "Wow! Successfully Updated",
      });
      navigate("/dashboard/mytask");
    } catch (err) {
      console.error(err);
    }
  };
  
 

  return (
    <div>
      <div className="max-w-xl mx-auto mt-10 p-6 bg-gray-100 border border-gray-300 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-gray-700 mb-6 text-center">
          Update a Task
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Task Title */}
          <div>
            <label className="block text-gray-600 font-medium mb-2">
              Task Title
            </label>
            <input
              type="text"
              defaultValue={task_title}
              {...register("task_title", {
                required: "Task title is required",
              })}
              placeholder="Ex: Watch my YouTube video and make a comment"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            />
            {errors.task_title && (
              <p className="text-red-500 text-xs mt-1">
                {errors.task_title.message}
              </p>
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
              defaultValue={task_detail}
              placeholder="Provide a detailed description of the task"
              rows="4"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            ></textarea>
            {errors.task_detail && (
              <p className="text-red-500 text-xs mt-1">
                {errors.task_detail.message}
              </p>
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
              defaultValue={required_workers}
              disabled
              placeholder="Ex: 100"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            />
            {errors.required_workers && (
              <p className="text-red-500 text-xs mt-1">
                {errors.required_workers.message}
              </p>
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
              defaultValue={perTaskAmount}
              disabled
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            />

            {errors.payable_amount && (
              <p className="text-red-500 text-xs mt-1">
                {errors.payable_amount.message}
              </p>
            )}
          </div>

          {/* Completion Date */}
          <div>
            <label className="block text-gray-600 font-medium mb-2">
              Completion Date
            </label>
            <input
              type="date" // Set the minimum selectable date
              {...register("completion_date", {
                required: "Completion date is required",
              })}
              defaultValue={completion_date}
              disabled
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
              defaultValue={submission_info}
              placeholder="Ex: Upload a screenshot or proof"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            />
            {errors.submission_info && (
              <p className="text-red-500 text-xs mt-1">
                {errors.submission_info.message}
              </p>
            )}
          </div>

          {/* Task Image */}
          <div className="  flex justify-between">
            <div>
              <label className="label">
                <span className="label-text">Task Image</span>
              </label>

              <div className="mt-0">
                <img
                  src={taskImage}
                  alt="Preview"
                  className="w-32 h-32 object-cover mt-2"
                />
              </div>
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

export default BuyerUpdateTask;
