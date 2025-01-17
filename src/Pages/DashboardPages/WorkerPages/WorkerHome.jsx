import React from 'react';
import WorkerHomePendingSubmission from '../../../Components/WorkerComponents/WorkerHomePendingSubmission';
import WorkerHomeStates from '../../../Components/WorkerComponents/WorkerHomeStates';

const WorkerHome = () => {
    return (
        <div>
            <div>
                <WorkerHomeStates/>
            </div>
            <div>
                <WorkerHomePendingSubmission/>
            </div>
        </div>
    );
};

export default WorkerHome;