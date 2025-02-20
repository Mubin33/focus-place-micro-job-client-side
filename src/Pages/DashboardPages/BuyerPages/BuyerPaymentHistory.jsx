import React, { useContext } from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../../Components/Loading/Loading';
import BuyerPaymentCard from '../../../Components/BuyerComponents/BuyerPaymentCard';
import { AuthContext } from '../../../Authintication/AuthProvider/AuthProvider';
import Title from '../../../Components/Title/Title';
import LottiEmpty from '../../../Components/LottiEmpty/LottiEmpty';
import { Helmet } from "react-helmet-async";



const BuyerPaymentHistory = () => {
    const {user, loading} = useContext(AuthContext)
    const axiosSecure = useAxiosSecure()
    
    const { data:myPayment=[], isPending ,refetch  } = useQuery({
        queryKey: ['myPayment',user?.email ], 
        enabled:!loading,
        queryFn: async() =>{
            const {data} = await axiosSecure.get(`/payment/${user?.email}`)
            return data
        }
      })
      if(isPending) return <Loading/> 


return (
  <>
  <Helmet>
      <title>Payment-History || Focus-Place</title>
      </Helmet>
  <Title title={'Payment history'} subtitle={'pay'}/>
  {
    myPayment.length === 0 ?<LottiEmpty title="payment history"/> :<div className="md:px-1 lg:px-16 px-0">
  <div className="overflow-x-auto">
    <table className="md:table">
      {/* head */}
      <thead >
        <tr>
          <th>---Date & time---</th>
          <th>---Pay($)---</th>
          <th>---Coin---</th>   
        </tr>
      </thead>
      <tbody className="">
        {/* row 1 */}
        {
            myPayment.map(item=> <BuyerPaymentCard key={item._id} refetch={refetch} item={item}/>)
        }
        
        
        {/* row 2 */}
        
      </tbody> 
    </table>
  </div>
</div>
  }

  </>
    );
};

export default BuyerPaymentHistory;