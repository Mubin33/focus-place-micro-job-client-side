import React, { useState, useEffect } from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import WorkerTaskCard from '../../../Components/WorkerComponents/WorkerTaskCard';
import Loading from '../../../Components/Loading/Loading';
import Title from '../../../Components/Title/Title';
import { Helmet } from "react-helmet-async";



const WorkerTaskList = () => {
    const [itemsPerPage, setItemsPerPage] = useState(15);
    const [currentPage, setCurrentPage] = useState(0);

    const axiosSecure = useAxiosSecure();

    // Fetch tasks
    const { data: allTask = [], isLoading, error, refetch } = useQuery({
        queryKey: ['allTask', currentPage, itemsPerPage],
        queryFn: async () => {
            const response = await axiosSecure.get(`/task`); ///task?page=${currentPage}&size=${itemsPerPage}
            return response.data;
        },
    });

    // Fetch pagination count
    const { data: forPagination = {}, isLoading: paginationLoading } = useQuery({
        queryKey: ['forPagination'],
        queryFn: async () => {
            const response = await axiosSecure.get(`/pagination/count`);
            return response.data;
        },
    });

    const count = forPagination?.count || 0;
    const numberOfPage = Math.ceil(count / itemsPerPage);
    // const page = [...Array(numberOfPage).keys()];

    // const handleItemsPerPage=(e)=>{
    //     const val = parseInt(e.target.value)
    //     setCurrentPage(0)
    //     //console.log(val)
    //     setItemsPerPage(val)
    // }


    // const handlePrev=()=>{
    //     if(currentPage>0){
    //         setCurrentPage(currentPage - 1)
    //     }
    // }
    // const handleNext=()=>{
    //     if(currentPage !== (numberOfPage - 1)){
    //         setCurrentPage(currentPage + 1)
    //     }
    // }

    useEffect(() => {
        refetch();
    }, [currentPage, itemsPerPage]);

    if (isLoading || paginationLoading) return <Loading />;
    if (error) {
        return (
            <div className="text-red-500 text-center">
                Error loading data. Please try again later. <br />
                {error.message && <span>Details: {error.message}</span>}
            </div>
        );
    }

    return (
        <>
        <Helmet>
      <title>All-Task || Focus-Place</title>
      </Helmet>
            <Title title="All Task" />
            <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-5 md:px-7 lg:px-4 px-3">
                {allTask.map((item) => (
                    <WorkerTaskCard key={item._id} item={item} />
                ))}
            </div>
            {/* <div className="flex space-x-2 justify-center my-8">
            <button className='btn btn-outline bg-base-300 btn-sm '  onClick={handlePrev}>Prev</button>
                {
                    page.map(page => <button 
                        className={`btn btn-outline bg-base-300 btn-sm ${currentPage === page? "bg-sky-500" : ""} `}
                        onClick={()=> setCurrentPage(page)}
                        key={page}
                        >{page + 1}</button>)
                    }
                    <button className='btn btn-outline bg-base-300 btn-sm ' onClick={handleNext}>Next</button>
                <select className='btn btn-outline bg-base-300 btn-sm ' value={itemsPerPage} onChange={handleItemsPerPage}>
                    <option value='9'>9</option>
                    <option value='15'>15</option> 
                </select>
            </div> */}
        </>
    );
};

export default WorkerTaskList;




// <div className="flex space-x-2 justify-center my-8">
//                 <button onClick={handlePrev} disabled={currentPage === 1}>
//                     Prev
//                 </button>
//                 {page.map((pageNumber) => (
//                     <button
//                         className={`btn btn-outline bg-base-300 btn-sm ${currentPage === pageNumber + 1 ? "bg-sky-500" : ""}`}
//                         key={pageNumber}
//                         onClick={() => setCurrentPage(pageNumber + 1)}
//                     >
//                         {pageNumber + 1}
//                     </button>
//                 ))}
//                 <button onClick={handleNext} disabled={currentPage === numberOfPage}>
//                     Next
//                 </button> 
//             </div>





// ----------------------------=-=-