import React from 'react';

const JobDetails =async({params}) => {
    const {id} =await params;

    console.log(id);
    return (
        <div>
            This is details
            
        </div>
    );
};

export default JobDetails;