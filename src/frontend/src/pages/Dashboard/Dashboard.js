import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const Dashboard = () => {
    const token = localStorage.getItem('authToken');
    const userRole = token ? JSON.parse(atob(token.split('.')[1])).role : null;

    if (userRole !== 'admin') {
        return <Navigate to="/login" />;
    }

    return (
        <div className="dashboard-container flex">
            {/* Sidebar cố định bên trái */}
            <div className="sidebar w-64 bg-gray-800 text-white p-6">  {/* Chiều rộng cố định cho Sidebar */}
                <Sidebar />
            </div>

            {/* Phần nội dung bên phải */}
            <div className="dashboard-content flex-1 bg-gray-100 p-6 ml-18">  {/* Thêm ml-64 để đẩy nội dung chính ra khỏi sidebar */}
                <Outlet />
            </div>
        </div>
    );
};

export default Dashboard;
