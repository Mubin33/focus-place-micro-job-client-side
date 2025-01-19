import React from 'react';
import { useLoaderData, useParams } from 'react-router-dom';
import Title from '../../../Components/Title/Title';

const SubmissionDetails = () => {
    const data = useLoaderData();
    console.log(data);

    const {
        _id,
        current_date,
        perTaskAmount,
        status,
        submission_details,
        task_id,
        task_title,
        worker_email,
        worker_name,
    } = data;

    return (
        <div className="p-6 min-h-screen">
            <Title title={'Submission Details'} />

            <div className="max-w-3xl mx-auto p-6 bg-base-300 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">Submission Details</h2>

                <p className="mb-4"><strong className="font-semibold text-black">Submission ID:</strong> {_id}</p>
                <p className="mb-4"><strong className="font-semibold text-black">Date:</strong> {current_date}</p>
                <p className="mb-4"><strong className="font-semibold text-black">Task Title:</strong> {task_title}</p>
                <p className="mb-4"><strong className="font-semibold text-black">Task ID:</strong> {task_id}</p>
                <p className="mb-4"><strong className="font-semibold text-black">Worker Name:</strong> {worker_name}</p>
                <p className="mb-4"><strong className="font-semibold text-black">Worker Email:</strong> {worker_email}</p>
                <p className="mb-4"><strong className="font-semibold text-black">Status:</strong> {status}</p>
                <p className="mb-4"><strong className="font-semibold text-black">Per Task Amount:</strong> ${perTaskAmount}</p>

                <div className="mt-6">
                    <h3 className="text-xl font-semibold text-gray-700 mb-3">Submission Details:</h3>
                    <p className="text-gray-600 leading-relaxed">{submission_details}</p>
                </div>
            </div>
        </div>
    );
};

export default SubmissionDetails;
