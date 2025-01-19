import React from 'react';

const Title = ({title, subtitle}) => {
    return (
        <div className='mt-5 mb-7 space-y-2'>
            <p className='text-center text-sm text-sky-400'>---{subtitle}---</p>
            <h1 className='text-center text-3xl bg-base-300 font-semibold py-5 rounded-2xl  '>{title}</h1>
        </div>
    );
};

export default Title;