import React from 'react';

const Title = ({title, subtitle}) => {
    return (
        <div className='mt-5 mb-7 space-y-2'>
            <p className='text-center text-sm text-sky-400'>---{subtitle}---</p>
            <h1 className='text-center text-3xl bg-gray-300 font-semibold py-5 rounded-2xl border-y-4 border-gray-300'>{title}</h1>
        </div>
    );
};

export default Title;