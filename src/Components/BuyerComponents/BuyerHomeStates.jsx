import React, { useContext } from "react";
import { AuthContext } from "../../Authintication/AuthProvider/AuthProvider";
import useAxiosSecure from "../../Hooks/useAxiosSecure/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../Loading/Loading";

const BuyerHomeStates = () => {
  const { user, loading } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const {
    data: myTask = [],
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["myTask", user?.email],
    enabled: !loading,
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/my-task/${user?.email}`);
      return data;
    },
  });

  if (isPending) return <Loading />;

  // Calculating total task count, pending task count (sum of required_workers), and total payment
  const totalTaskCount = myTask.length;
  const totalRequiredWorkers = myTask.reduce((total, task) => total + task.required_workers, 0);
  const totalPayment = myTask.reduce((total, task) => total + task.totalAmountPay, 0);

  const fixedAmount = (amount) => {
    return parseFloat(amount).toFixed(2);
  };


  return (
    <div className=" ">
  <h1 className="text-3xl font-bold underline my-2">States</h1>
  <div className="stats shadow bg-base-300 mx-10 flex flex-wrap justify-center gap-6">
    {/* Total Task Count */}
    <div className="stat place-items-center w-full sm:w-1/3 md:w-1/4 flex-grow">
      <div className="stat-title">Total Task Count</div>
      <div className="stat-value">{totalTaskCount}</div>
      <div className="stat-desc">Total tasks added by you</div>
    </div>

    {/* Pending Tasks */}
    <div className="stat place-items-center w-full sm:w-1/3 md:w-1/4 flex-grow">
      <div className="stat-title">In Pending Task</div>
      <div className="stat-value text-secondary">{totalRequiredWorkers}</div>
      <div className="stat-desc text-secondary">Total required workers for pending tasks</div>
    </div>

    {/* Total Payment */}
    <div className="stat place-items-center w-full sm:w-1/3 md:w-1/4 flex-grow">
      <div className="stat-title">Total Payment</div>
      <div className="stat-value">{fixedAmount(totalPayment)}coin</div>
      <div className="stat-desc">Total amount paid by you</div>
    </div>
  </div>
</div>

  );
};

export default BuyerHomeStates;
