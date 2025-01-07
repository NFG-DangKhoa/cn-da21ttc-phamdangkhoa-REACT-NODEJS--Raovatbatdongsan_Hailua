import React from 'react';
import { Link } from 'react-router-dom';
import { HomeIcon, UserGroupIcon, CurrencyDollarIcon, DocumentReportIcon } from '@heroicons/react/outline';

const Sidebar = () => {
    return (
        <div className="sidebar w-64 bg-black text-white h-full fixed top-0 left-0 py-4 shadow-2xl transition-all duration-300 ease-in-out hover:translate-x-1">
            {/* Logo - khi nhấn vào logo sẽ chuyển về trang home */}
            <div className="text-center mb-6">
                <Link to="/">  {/* Link đến trang Home */}
                    <img src="/logo.png" alt="Logo" className="w-32 mx-auto" />
                </Link>
            </div>

            <ul className="space-y-4 divide-y divide-gray-700">
                <li>
                    <Link
                        to="/dashboard/StatisticsDashboard"
                        className="flex items-center px-4 py-2 rounded-md text-lg transition-all duration-300 ease-in-out hover:bg-gray-800 hover:shadow-lg hover:scale-105"
                    >
                        <HomeIcon className="w-6 h-6 mr-3" /> {/* Home Icon */}
                        Thống kê
                    </Link>
                </li>
                <li>
                    <Link
                        to="/dashboard"
                        className="flex items-center px-4 py-2 rounded-md text-lg transition-all duration-300 ease-in-out hover:bg-gray-800 hover:shadow-lg hover:scale-105"
                    >
                        <HomeIcon className="w-6 h-6 mr-3" /> {/* Home Icon */}
                        Dashboard
                    </Link>
                </li>
                <li>
                    <Link
                        to="/user-management"
                        className="flex items-center px-4 py-2 rounded-md text-lg transition-all duration-300 ease-in-out hover:bg-gray-800 hover:shadow-lg hover:scale-105"
                    >
                        <UserGroupIcon className="w-6 h-6 mr-3" /> {/* User Icon */}
                        Quản lý người dùng
                    </Link>
                </li>
                <li>
                    <Link
                        to="/property-management"
                        className="flex items-center px-4 py-2 rounded-md text-lg transition-all duration-300 ease-in-out hover:bg-gray-800 hover:shadow-lg hover:scale-105"
                    >
                        <DocumentReportIcon className="w-6 h-6 mr-3" /> {/* Property Icon */}
                        Quản lý bất động sản
                    </Link>
                </li>
                <li>
                    <Link
                        to="/payment-management"
                        className="flex items-center px-4 py-2 rounded-md text-lg transition-all duration-300 ease-in-out hover:bg-gray-800 hover:shadow-lg hover:scale-105"
                    >
                        <CurrencyDollarIcon className="w-6 h-6 mr-3" /> {/* CurrencyDollar Icon */}
                        Quản lý thanh toán
                    </Link>
                </li>
                <li>
                    <Link
                        to="/system-management"
                        className="flex items-center px-4 py-2 rounded-md text-lg transition-all duration-300 ease-in-out hover:bg-gray-800 hover:shadow-lg hover:scale-105"
                    >
                        <CurrencyDollarIcon className="w-6 h-6 mr-3" /> {/* Giả sử bạn thay thế bằng icon khác */}
                        Quản lý hệ thống
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
