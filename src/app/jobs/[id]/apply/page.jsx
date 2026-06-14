import ApplyJob from '@/Components/Apply Jobs/ApplyJob';
import { getJobDetails } from '@/lib/Api/Jobs';
import { getUserSession } from '@/lib/ReuseableFunc/session';
import { redirect } from 'next/navigation';
import React from 'react';

const ApplyPage = async({params}) => { 
    const {id} = await params;
    
    const user = await getUserSession();
    const job = await getJobDetails(id);


    if(!user){
redirect(`/auth/signin?redirect=/jobs/${id}/apply`)
    }
    return (
        <div>
            <ApplyJob job={job} user={user}></ApplyJob>
        </div>
    );
};

export default ApplyPage;