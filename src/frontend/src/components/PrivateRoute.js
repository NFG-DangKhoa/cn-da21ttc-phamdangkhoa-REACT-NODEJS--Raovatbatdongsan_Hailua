// src/components/PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom'; // Sử dụng Navigate thay vì Redirect

const PrivateRoute = ({ children }) => {
    // Kiểm tra thông tin đăng nhập và quyền admin từ localStorage
    const token = localStorage.getItem('authToken');
    const userRole = localStorage.getItem('userRole');

    const isAuthenticated = token != null;
    const isAdmin = userRole === 'admin';

    if (!isAuthenticated || !isAdmin) {
        return <Navigate to="/login" />; // Chuyển hướng đến trang đăng nhập nếu chưa đăng nhập hoặc không phải admin
    }

    return children; // Trả về component con (chính là trang Dashboard)
};

export default PrivateRoute;
