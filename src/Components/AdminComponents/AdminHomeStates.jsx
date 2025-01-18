import React, { useContext } from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Loading from '../Loading/Loading';
import { AuthContext } from '../../Authintication/AuthProvider/AuthProvider';

const AdminHomeStates = () => {
    const axiosSecure = useAxiosSecure()
    const {user} = useContext(AuthContext)
    
    const { data:{allUsers=[],allPayment=[]}={}, isPending   } = useQuery({
        queryKey: ['allUsers','allPayment' ], 
        queryFn: async() =>{
            const getUsers = await axiosSecure.get(`/users`)
            const getPayment = await axiosSecure.get(`/payment`)
            return {
                allUsers: getUsers.data,
                allPayment: getPayment.data
            }
        }
      }) 


      const workerFiltering = allUsers.filter(item => item.role === 'worker')
      const totalWorker = workerFiltering.length
      
      const buyerFiltering = allUsers.filter(item => item.role === 'buyer')
      const totalBuyer = buyerFiltering.length


      const totalCoin = allUsers.reduce((first, second)=> first + second.amount,0)


      const totalPayment = allPayment.reduce((first, second)=> first + second.payAmount,0)


      if(isPending) return <Loading/>

      const fixedAmount = (amount) => {
        return parseFloat(amount).toFixed(2);
      };




    return (
        <div className="container mx-auto px-4">
  <h1 className="text-3xl font-bold underline my-4  ">States</h1>
  <div className="stats shadow bg-base-300 p-4 sm:p-6 flex flex-wrap justify-center gap-6">
    {/* Total Worker */}
    <div className="stat place-items-center w-full sm:w-1/2 lg:w-1/4">
      <div className="stat-title text-center">Total Worker</div>
      <div className="stat-value text-center">{totalWorker}</div>
    </div>

    {/* Total Buyer */}
    <div className="stat place-items-center w-full sm:w-1/2 lg:w-1/4">
      <div className="stat-title text-center">Total Buyer</div>
      <div className="stat-value text-secondary text-center">{totalBuyer}</div>
    </div>

    {/* Available Coin */}
    <div className="stat place-items-center w-full sm:w-1/2 lg:w-1/4">
      <div className="stat-title text-center">Available Coin</div>
      <div className="stat-value text-center">{fixedAmount(totalCoin)} coin</div>
    </div>

    {/* Total Payment */}
    <div className="stat place-items-center w-full sm:w-1/2 lg:w-1/4">
      <div className="stat-title text-center">Total Payment</div>
      <div className="stat-value text-center">{fixedAmount(totalPayment)} $</div>
    </div>
  </div>
</div>

    );
};

export default AdminHomeStates;