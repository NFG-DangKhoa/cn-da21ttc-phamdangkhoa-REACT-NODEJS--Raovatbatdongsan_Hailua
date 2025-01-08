import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import { UserCircleIcon, PencilAltIcon, UserAddIcon, CollectionIcon, HomeIcon, CashIcon, KeyIcon, DocumentTextIcon } from '@heroicons/react/solid';

const Header = () => {
    const token = localStorage.getItem('authToken');
    const userRole = token ? JSON.parse(atob(token.split('.')[1])).role : null;

    return (
        <header className="bg-gradient-to-t from-blue-300 to-blue-500 text-white py-4 border-b-4 border-gray-300 shadow-md fixed top-0 left-0 w-full z-50">
            <div className="container mx-auto flex items-center justify-between">
                <div className="text-xl flex items-center">
                    <img src="/logo.png" alt="Logo" className="w-16 h-16 mr-4" />
                    <nav className="flex space-x-6 ml-20">
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
                        <Link to="/bang-gia-dich-vu" className="hover:text-yellow-300 flex items-center space-x-2 text-base">
                            <DocumentTextIcon className="h-5 w-5" />
                            <span>Bảng giá dịch vụ</span>
                        </Link>
                    </nav>

                </div>

                <nav className="flex space-x-6">
                    <Link to="#gioi-thieu" className="hover:text-yellow-300 flex items-center space-x-2 text-base">
                        <UserCircleIcon className="h-5 w-5" />
                        <span>Giới thiệu</span>
                    </Link>
                    <Link to="#tin-tuc" className="hover:text-yellow-300 flex items-center space-x-2 text-base">
                        <UserCircleIcon className="h-5 w-5" />
                        <span>Tin tức</span>
                    </Link>
                    {userRole === 'user' && (
                        <Link to="payment-form" className="bg-yellow-500 text-black px-4 py-2 rounded hover:bg-yellow-600 flex items-center space-x-2 text-base">
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
                            <Link to="/user-profile" className="hover:text-yellow-300 flex items-center space-x-2 text-base">
                                <UserCircleIcon className="h-5 w-5" />
                                <span>Profile</span>
                            </Link>
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
