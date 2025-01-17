import React from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import WorkerTaskCard from '../../../Components/WorkerComponents/WorkerTaskCard';
import Loading from '../../../Components/Loading/Loading';
import Title from '../../../Components/Title/Title';

const WorkerTaskList = () => {

    const axiosSecure = useAxiosSecure()
    
        const { data:allTask=[], isPending ,refetch  } = useQuery({
            queryKey: ['allTask' ], 
            queryFn: async() =>{
                const {data} = await axiosSecure.get(`/task`)
                return data
            }
          })
          if(isPending) return <Loading/>

    return (
        <>
        <Title title={'All Task'} />
        <div className='grid grid-cols-2  gap-5 md:grid-cols-3 lg:grid-cols-5 md:px-7 lg:px-4 px-3'>
            {
                allTask.map(item=> <WorkerTaskCard key={item._id} item={item}/>)
            }
        </div>
            </>
    );
};

export default WorkerTaskList;