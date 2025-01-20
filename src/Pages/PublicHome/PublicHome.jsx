import React from 'react'; 
import StaticHomeSection from './StaticHomeSection';
import TopWorker from '../../Components/PublicHome/TopWorker';
import { Helmet } from "react-helmet-async";
import ReviewSection from '../../Components/ReviewSection/ReviewSection';

const PublicHome = () => {
    return (
        <div >
            <Helmet>
      <title>Home || Focus-Place</title>
      </Helmet>
            <StaticHomeSection/>
            <TopWorker/>
            <ReviewSection/>
        </div>
    );
};

export default PublicHome;