import React from 'react';

const WorkerPendingSubmissionCard = ({item, refetch}) => {
    const {
        _id,
        task_id,
        task_title,
        perTaskAmount,
        worker_email,
        submission_details,
        worker_name,
        buyerEmail,
        buyerName,
        current_date,
        status,
      } = item;
    
      return (
        <tr className="border-t-[1px] md:border-none ">
          <td>
            <div className="flex items-center gap-1 md:gap-3">
              <div>
                <div className="text-[10px] md:text-xs px-2 md:px-0  md:font-bold">
                  {task_title}
                </div>
                <div className="text-[10px] md:text-xs px-2 md:px-0  opacity-50">
                  {current_date}
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
          <td className="text-[10px] px-2 md:px-0  md:text-xs">{perTaskAmount}Coin</td>
          
      <td className="text-[10px] px-2 md:px-0 text-green-700 md:text-xs">
        <span className="px-2 py-1 rounded-xl bg-green-100 ">{status}</span>
      </td>
        </tr>
      );
    };

export default WorkerPendingSubmissionCard;