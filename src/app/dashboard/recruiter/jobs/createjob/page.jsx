import CreateJobForm from '@/Components/Dashboard/Recruiter/CreateJobForm';
import { getMyCompany } from '@/lib/Api/Company';
import { getUserSession } from '@/lib/ReuseableFunc/session';
import React from 'react';

const Cratejobs = async() => {
      const user = await getUserSession();
    
      const company = await getMyCompany(user?.id);

    
    return (
        <div>
            <CreateJobForm  company={company} user={user}></CreateJobForm>
        </div>
    );
};

export default Cratejobs;