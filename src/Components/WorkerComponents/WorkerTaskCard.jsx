import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight } from "react-icons/fa";

const WorkerTaskCard = ({ item }) => {
  const {
    _id,
    completion_date,
    buyerName,
    task_title,
    required_workers,
    perTaskAmount,
    taskImage,
  } = item;
 
  const today = new Date().toISOString().split("T")[0];
 
  const isHidden = new Date(completion_date) < new Date(today) || required_workers === 0;
 
  if (isHidden) return null;

  return (
    <Link to={`/dashboard/taskdetails/${_id}`}>
      <div className='p-2 shadow-md shadow-green-500 rounded-xl h-full'>
        <div className='h-32 rounded-xl border-[1px] border-sky-400'>
          <img className='h-full w-full rounded-xl' src={taskImage} alt="" />
        </div>
        <p className='text-sm text-center mt-2 font-semibold'>{task_title}</p>
        <p className='text-xs text-gray-500'>{buyerName}</p>
        <p className='space-x-5 mt-2 text-xs font-semibold '>
          <span>Value: {" "}{perTaskAmount}$</span>
          <span>Remaining: {" "}{required_workers}</span>
        </p>
        <p className='text-xs font-semibold text-gray-600'>Last Date: {" "}{completion_date}</p>
        <div className='flex justify-end px-3'><FaArrowRight /></div>
      </div>
    </Link>
  );
};

export default WorkerTaskCard;
