import React, { useContext } from 'react';
import { AuthContext } from '../../../Authintication/AuthProvider/AuthProvider';
import useAxiosSecure from '../../../Hooks/useAxiosSecure/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import BuyerMyTaskCard from '../../../Components/BuyerComponents/BuyerMyTaskCard';
import Loading from '../../../Components/Loading/Loading';
import Title from '../../../Components/Title/Title';
import LottiEmpty from '../../../Components/LottiEmpty/LottiEmpty';
import { Helmet } from "react-helmet-async";

const BuyerMyTask = () => {  
    const {user} = useContext(AuthContext)

    const axiosSecure = useAxiosSecure()
    
        const { data:myTask=[], isPending ,refetch  } = useQuery({
            queryKey: ['myTask', user?.email ], 
            queryFn: async() =>{
                const {data} = await axiosSecure.get(`/my-task/${user?.email}`)
                return data
            }
          })
        //   //console.log(myTask)

          if(isPending) return <Loading/>
    return (
      <>
      <Helmet>
      <title>My-Task || Focus-Place</title>
      </Helmet>
      <Title title={'My task'} subtitle={'checking'}/>
        <div className="md:px-1 lg:px-16 px-0">
          {
            myTask.length === 0 ?<LottiEmpty title="task"/> :<div className="overflow-x-auto ">
        <table className="md:table gap-3">
          {/* head */}
          <thead >
            <tr>
              <th>-Name & Date-</th>
              <th>-Workers & coin-</th> 
              <th>-Action-</th> 
            </tr>
          </thead>
          <tbody className="">
            {/* row 1 */}
            {
                myTask.map(item=> <BuyerMyTaskCard key={item._id} refetchi={refetch} item={item}/>)
            }
            
            
            {/* row 2 */}
            
          </tbody> 
        </table>
      </div>
          }
      
    </div>
      </>
    );
};

export default BuyerMyTask;