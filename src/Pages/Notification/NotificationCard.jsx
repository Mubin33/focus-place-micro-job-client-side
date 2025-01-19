import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const NotificationCard = ({ item }) => {
    const { 
        massage,
        time,
        status,
        goToPage
    } = item;

    const [bgStyle, setBgStyle] = useState(status === 'pending' ? 'bg-sky-100' : 'bg-base-200');

    useEffect(() => {
        let timer;
        if (status === 'pending') {
            timer = setTimeout(() => {
                setBgStyle('bg-base-200');
            }, 2000);  
        }
        return () => clearTimeout(timer);  
    }, [status]);

    return (
        <Link to={goToPage}>
            <div className={`my-2 md:py-2 rounded-2xl ${bgStyle} py-4 md:px-5 px-1`}>
                <p className='text-sm font-semibold'>{massage}</p>
                <p className='text-[10px] text-gray-600'>{time}</p>
                <p className='text-xs underline'>Go</p>
            </div>
        </Link>
    );
};

export default NotificationCard;
