import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import { UserCircleIcon, PencilAltIcon, UserAddIcon, CollectionIcon, HomeIcon, CashIcon, KeyIcon, DocumentTextIcon, DocumentIcon, SaveIcon, PencilIcon, LogoutIcon } from '@heroicons/react/solid';

const Header = () => {
    const token = localStorage.getItem('authToken');
    const userRole = token ? JSON.parse(atob(token.split('.')[1])).role : null;

    const [userInfo, setUserInfo] = useState(null);
    const [isProfileHovered, setIsProfileHovered] = useState(false);
    const [isProfileInfoHovered, setIsProfileInfoHovered] = useState(false);

    useEffect(() => {
        if (isProfileHovered && token) {
            const fetchUserInfo = async () => {
                try {
                    const response = await fetch('http://localhost:5000/api/auth/user-info', {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                        },
                    });

                    if (!response.ok) {
                        throw new Error('Failed to fetch user info');
                    }

                    const data = await response.json();
                    setUserInfo(data);
                } catch (error) {
                    console.error('Error fetching user info:', error);
                }
            };

            fetchUserInfo();
        }
    }, [isProfileHovered, token]);

    return (
        <header className="bg-gradient-to-t from-blue-300 to-blue-500 text-white py-4 border-b-4 border-gray-300 shadow-md fixed top-0 left-0 w-full z-50">
            <div className="container mx-auto flex items-center justify-between">
                <div className="text-xl flex items-center">
                    <img src="/logo.png" alt="Logo" className="w-16 h-16 mr-4" />
                    <nav className="flex space-x-6 ml-12">
                        <Link to="/" className="hover:text-yellow-300 flex items-center space-x-2 text-base">
                            <HomeIcon className="h-5 w-5" />
                            <span>Trang chủ</span>
                        </Link>
                        <Link to="/bdsSelling?type=forSale" className="hover:text-yellow-300 flex items-center space-x-2 text-base">
                            <CashIcon className="h-5 w-5" />
                            <span>Mua bán</span>
                        </Link>
                        <Link to="/bdsSelling?type=forRent" className="hover:text-yellow-300 flex items-center space-x-2 text-base">
                            <KeyIcon className="h-5 w-5" />
                            <span>Cho thuê</span>
                        </Link>
                        <Link to="/pricetable" className="hover:text-yellow-300 flex items-center space-x-2 text-base">
                            <DocumentTextIcon className="h-5 w-5" />
                            <span>Bảng giá dịch vụ</span>
                        </Link>
                    </nav>
                </div>

                <nav className="flex space-x-6">
                    {userRole === 'user' && (
                        <Link to="#gioi-thieu" className="hover:text-yellow-300 flex items-center space-x-2 text-base">
                            <UserCircleIcon className="h-5 w-5" />
                            <span>Trang Quản Lý</span>
                        </Link>
                    )}
                    <Link to="#tin-tuc" className="hover:text-yellow-300 flex items-center space-x-2 text-base">
                        <UserCircleIcon className="h-5 w-5" />
                        <span>Tin tức</span>
                    </Link>
                    {userRole === 'user' && (
                        <Link to="/payment-choice" className="bg-yellow-500 text-black px-4 py-2 rounded hover:bg-yellow-600 flex items-center space-x-2 text-base">
                            <PencilAltIcon className="h-5 w-5" />
                            <span>Đăng tin</span>
                        </Link>
                    )}
                    {userRole === 'admin' && (
                        <Link to="/dashboard" className="hover:text-yellow-300 flex items-center space-x-2 text-base">
                            <CollectionIcon className="h-5 w-5" />
                            <span>Dashboard</span>
                        </Link>
                    )}
                    {token ? (
                        <>
                            <div
                                onMouseEnter={() => setIsProfileHovered(true)}
                                onMouseLeave={() => setIsProfileHovered(false)}
                                className="relative flex items-center space-x-2"
                            >
                                <Link to="/user-profile" className="hover:text-yellow-300 flex items-center space-x-2 text-base">
                                    <UserCircleIcon className="h-5 w-5" />
                                    <span>Profile</span>
                                </Link>

                                {isProfileHovered && userInfo && (
                                    <div
                                        onMouseEnter={() => setIsProfileInfoHovered(true)}
                                        onMouseLeave={() => setIsProfileInfoHovered(false)}
                                        className={`profile-popup-wrapper ${isProfileHovered || isProfileInfoHovered ? 'show' : ''}`}
                                    >
                                        <div
                                            onMouseEnter={() => setIsProfileHovered(true)}
                                            onMouseLeave={() => setIsProfileHovered(false)}
                                            className="profile-popup shadow-lg rounded-lg bg-white p-6 w-72 md:w-96 transition-all duration-300 ease-in-out transform"
                                        >
                                            {/* Avatar Container */}
                                            <div className="flex justify-center items-center mb-6">
                                                <img
                                                    src="/images/avartar_default.jpg"
                                                    alt="User Avatar"
                                                    className="h-20 w-20 rounded-full border-2 border-blue-500 shadow-md"
                                                />
                                            </div>
                                            <p className="text-center text-xl font-semibold text-gray-800 mb-2">{userInfo.name}</p>
                                            {/* Dòng mới thêm vào và căn giữa */}
                                            <p className="text-center text-sm text-blue-600 hover:underline">
                                                <Link to="/user-profile">Trang cá nhân</Link>
                                            </p>
                                            <div className="mt-6 space-y-4">
                                                <Link
                                                    to="/dashboard"
                                                    className="block text-gray-700 hover:text-blue-600 font-medium text-sm py-2 px-3 rounded-md transition duration-200 hover:bg-gray-100"
                                                >
                                                    <HomeIcon className="h-5 w-5 inline-block mr-2" />
                                                    Trang quản lý
                                                </Link>
                                                <Link
                                                    to="/manage-listing"
                                                    className="block text-gray-700 hover:text-blue-600 font-medium text-sm py-2 px-3 rounded-md transition duration-200 hover:bg-gray-100"
                                                >
                                                    <DocumentIcon className="h-5 w-5 inline-block mr-2" />
                                                    Quản lý tin đăng
                                                </Link>
                                                <Link
                                                    to="/saved-listings"
                                                    className="block text-gray-700 hover:text-blue-600 font-medium text-sm py-2 px-3 rounded-md transition duration-200 hover:bg-gray-100"
                                                >
                                                    <SaveIcon className="h-5 w-5 inline-block mr-2" />
                                                    Tin đăng đã lưu
                                                </Link>
                                                <Link
                                                    to="/profile-edit"
                                                    className="block text-gray-700 hover:text-blue-600 font-medium text-sm py-2 px-3 rounded-md transition duration-200 hover:bg-gray-100"
                                                >
                                                    <PencilIcon className="h-5 w-5 inline-block mr-2" />
                                                    Sửa thông tin cá nhân
                                                </Link>
                                                <button
                                                    onClick={() => {
                                                        localStorage.removeItem('authToken');
                                                        window.location.reload();
                                                    }}
                                                    className="block text-gray-700 hover:text-blue-600 font-medium text-sm py-2 px-3 rounded-md transition duration-200 hover:bg-gray-100 w-full text-left"
                                                >
                                                    <LogoutIcon className="h-5 w-5 inline-block mr-2" />
                                                    Đăng xuất
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <button
                                onClick={() => {
                                    localStorage.removeItem('authToken');
                                    window.location.reload();
                                }}
                                className="hover:text-yellow-300 flex items-center space-x-2 text-base"
                            >
                                <UserAddIcon className="h-5 w-5" />
                                <span>Đăng xuất</span>
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/signup" className="hover:text-yellow-300 flex items-center space-x-2 text-base">
                                <UserAddIcon className="h-5 w-5" />
                                <span>Đăng ký</span>
                            </Link>
                            <Link to="/login" className="hover:text-yellow-300 flex items-center space-x-2 text-base">
                                <UserAddIcon className="h-5 w-5" />
                                <span>Đăng nhập</span>
                            </Link>
                        </>
                    )}
                </nav>
            </div>
        </header>
    );
};

export default Header;
