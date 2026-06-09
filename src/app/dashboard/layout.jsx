// import Sidebar from '@/Components/Dashboard/SideBar';
import SideBar from '@/Components/Common Sec/SideBar';
import React from 'react';

const DashboardLayout = ({children}) => {
    return (
        <div className='py-22 min-h-screen max-w-7xl mx-auto lg:flex gap-10'>
            <SideBar></SideBar>
           
            {children}
            
        </div>
    );
};

export default DashboardLayout;