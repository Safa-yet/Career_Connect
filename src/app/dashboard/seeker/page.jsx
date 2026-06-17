import React from 'react';

const SeekerDashboard = () => {
    return (
        <div>
            This is Seeker Dashboard
            
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <h3 className="text-gray-500 text-sm font-medium">Total Applications</h3>
                    <p className="text-3xl font-bold text-[#091E21] mt-2">0</p>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <h3 className="text-gray-500 text-sm font-medium">Shortlisted</h3>
                    <p className="text-3xl font-bold text-[#00B96D] mt-2">0</p>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <h3 className="text-gray-500 text-sm font-medium">Saved Jobs</h3>
                    <p className="text-3xl font-bold text-blue-600 mt-2">0</p>
                </div>
            </div>
            <div className="mt-8 bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-[#091E21]">Recent Applications</h3>
                    <button className="text-[#00B96D] font-medium hover:underline text-sm">View All</button>
                </div>
                
                <div className="text-center py-10">
                    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-2xl">📄</span>
                    </div>
                    <p className="text-gray-500">No applications found. Start applying to jobs!</p>
                </div>
            </div>
            


        </div>
    );
};

export default SeekerDashboard;