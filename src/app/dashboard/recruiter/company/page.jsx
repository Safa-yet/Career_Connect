import CreateCompanyPage from '@/Components/Dashboard/Comapny/CreateComapnyPage';
import { getUserSession } from '@/lib/ReuseableFunc/session';
import React from 'react';

const RecruiterCompanyPage = async() => {

    const user = await getUserSession()
    console.log(user);
    return (
        <div>
           <CreateCompanyPage user={user}></CreateCompanyPage>
        </div>
    );
};

export default RecruiterCompanyPage;