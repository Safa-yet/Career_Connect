import JobDetailsPage from '@/Components/Common Sec/JobDetailsPage';
import { getJobs } from '@/lib/Api/CallFuntion';
import { getJobDetails } from '@/lib/Api/Jobs';
import { getUserSession } from '@/lib/ReuseableFunc/session';
import React from 'react';

const jobDetails = async({params}) => {
    const {id}  = await params;
    const user = await getUserSession();

    const job = await getJobDetails(id)

    
    return (
        <div  >
            <JobDetailsPage job={job} user={user}></JobDetailsPage>
        </div>
    );
};

export default jobDetails;