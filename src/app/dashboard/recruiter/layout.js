import { requirRole } from '@/lib/ReuseableFunc/session';
import React from 'react';

const RecruiterLayout =async ({children}) => {
     await requirRole('recruiter');

    return (
       children
    );
};

export default RecruiterLayout;