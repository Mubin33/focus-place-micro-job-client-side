import React from 'react';
import useUserData from '../../Hooks/useUserData/useUserData';
import useAxiosSecure from '../../Hooks/useAxiosSecure/useAxiosSecure';
import { useQuery } from '@tanstack/react-query'; 
import Loading from '../../Components/Loading/Loading';
import Title from '../../Components/Title/Title';
import NotificationCard from './NotificationCard';
import LottiEmpty from '../../Components/LottiEmpty/LottiEmpty';
import { Helmet } from "react-helmet-async";

const Notification = () => {
    const [userData, isPending] = useUserData();
    const { email, role } = userData || {}; // Handle userData being undefined
    const axiosSecure = useAxiosSecure();

    const { data: myNotification = [], isLoading: loading } = useQuery({
        queryKey: ['myNotification', role === 'admin' ? undefined : email],
        enabled: !isPending && !!email, // Wait for userData to be available
        queryFn: async () => {
            const endpoint = role === 'admin' ? `/notification` : `/notification/${email}`;
            const { data } = await axiosSecure.get(endpoint);
            return data;
        },
    });

    if (loading) return <Loading />;

    return (
        <div>
            <Helmet>
                  <title>Notification || Focus-Place</title>
                  </Helmet>
            <Title title="Notification" />
                {
                    myNotification.length === 0 ?<LottiEmpty title="notification"/> :<div className="md:px-10 lg:px-20 px-1">
            {[...myNotification].reverse().map((item) => (
                    <NotificationCard key={item._id} item={item} />
                ))}
            </div>
                }
            
        </div>
    );
};

export default Notification;
