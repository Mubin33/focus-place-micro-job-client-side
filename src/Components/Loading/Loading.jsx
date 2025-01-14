import React from 'react';
import { TbFidgetSpinner } from "react-icons/tb";

const Loading = () => {
    return (
        <div className='h-96 w-full flex justify-center items-center'>
            <TbFidgetSpinner className='text-black animate-spin' size={30}/>
        </div>
    );
};

export default Loading;