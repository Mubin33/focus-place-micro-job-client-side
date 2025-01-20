import React from "react";
import useAxiosPublic from "../../Hooks/useAxiosPublic/useAxiosPublic";
import Loading from "../Loading/Loading";
import { useQuery } from "@tanstack/react-query";

const TopWorker = () => {
  const axiosPublic = useAxiosPublic();

  const { data: users = [], isLoading, isError, error } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const { data } = await axiosPublic.get(`/top/worker`);
      return data;
    },
  });

  if (isLoading) return <Loading />;

  if (isError) {
    return (
      <div className="text-center text-red-500">
        <p>Failed to load top workers. Please try again later.</p>
        <p>{error.message}</p>
      </div>
    );
  }

  return (
    <div className="py-8 px-4 ">
      <h2 className="text-2xl font-bold text-center mb-6">Top Workers</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((user) => (
          <div
            key={user._id}
            className="p-6 bg-white shadow rounded-lg hover:shadow-xl transform transition-transform duration-300 hover:scale-105"
          >
            <img
              src={user.image || "/default-avatar.png"} // Default avatar if no image
              alt={user.name}
              className="w-20 h-20 rounded-full mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold text-center">{user.name}</h3>
            <p className="text-center text-gray-500">{user.role}</p>
            <p className="text-center text-sky-500 font-bold">
              Earned: {user.amount?.toFixed(2)} Coins
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopWorker;
