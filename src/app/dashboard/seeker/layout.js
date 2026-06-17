import { requirRole } from '@/lib/ReuseableFunc/session';
import React from 'react';

const SeekerLayout =async ({children}) => {
     await requirRole('seeker');

    return (
       children
    );
};

export default SeekerLayout;