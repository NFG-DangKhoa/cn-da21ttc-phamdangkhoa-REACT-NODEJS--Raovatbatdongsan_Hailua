import React, { useState, useTransition } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaChevronDown, FaCheckSquare, FaRegSquare } from 'react-icons/fa';

const SecondaryHeader = () => {
    const [openDropdown, setOpenDropdown] = useState(null); // Trạng thái để theo dõi dropdown mở
    const [selectedItem, setSelectedItem] = useState('Tất Cả');
    const [selectedSize, setSelectedSize] = useState('Tất Cả');
    const [selectedTransaction, setSelectedTransaction] = useState('Tất Cả');
    const [selectedPrice, setSelectedPrice] = useState('Tất Cả');

    const navigate = useNavigate();
    const [isPending, startTransition] = useTransition();

    const toggleDropdown = (dropdown) => {
        setOpenDropdown((prev) => (prev === dropdown ? null : dropdown));
    };

    const handleNavigate = (path, item, setter) => {
        setter(item);
        setTimeout(() => {
            startTransition(() => {
                navigate(path);
            });
        }, 500);
    };

    const dropdownItems = [
        { label: 'Tất Cả', path: '/' },
        { label: 'Đất nền', path: '/bdsSelling?type=forSale' },
        { label: 'Nhà', path: '/house' },
        { label: 'Căn hộ', path: '/apartment' },
        { label: 'Biệt thự', path: '/villa' },
    ];

    const transactionItems = [
        { label: 'Tất Cả', path: '/' },
        { label: 'Bán', path: '/bdsSelling?type=forSale' },
        { label: 'Cho thuê', path: '/bdsSelling?type=forRent' },
    ];

    const sizeItems = [
        { label: 'Tất Cả', path: '/' },
        { label: 'Dưới 50m²', path: '/size/under50' },
        { label: '50m² - 100m²', path: '/size/50-100' },
        { label: 'Trên 100m²', path: '/size/above100' },
    ];

    const priceItems = [
        { label: 'Tất Cả', path: '/' },
        { label: 'Dưới 1 tỷ', path: '/price/under1billion' },
        { label: '1 tỷ - 5 tỷ', path: '/price/1-5billion' },
        { label: 'Trên 5 tỷ', path: '/price/above5billion' },
    ];

    return (
        <header className="bg-gradient-to-t from-blue-100 to-blue-300 text-gray-800 py-3 border-b-4 border-gray-300 shadow-md fixed top-16 left-0 w-full z-40">
            <div className="container mx-auto flex items-center justify-between">
                <div className="ml-32 flex space-x-4">
                    {/* Loại bất động sản */}
                    <div className="relative">
                        <button
                            className="bg-white text-gray-700 text-sm px-4 py-2 rounded-lg shadow hover:shadow-lg flex flex-col items-start space-y-1"
                            onClick={() => toggleDropdown('loai')}
                        >
                            <div className="flex items-center space-x-2">
                                <span>Loại</span>
                                <FaChevronDown
                                    className={`transition-transform ${openDropdown === 'loai' ? 'rotate-180' : ''}`}
                                />
                            </div>
                            <div className="mt-1 text-sm text-red-500">{selectedItem}</div>
                            {openDropdown === 'loai' && (
                                <ul className="absolute left-0 mt-2 w-48 bg-white border border-gray-300 rounded shadow-lg">
                                    {dropdownItems.map((item) => (
                                        <li
                                            key={item.label}
                                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center space-x-2"
                                            onClick={() => handleNavigate(item.path, item.label, setSelectedItem)}
                                        >
                                            {selectedItem === item.label ? (
                                                <FaCheckSquare className="text-red-500" />
                                            ) : (
                                                <FaRegSquare className="text-red-500" />
                                            )}
                                            <span>{item.label}</span>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </button>
                    </div>

                    {/* Giao dịch */}
                    <div className="relative">
                        <button
                            className="bg-white text-gray-700 text-sm px-4 py-2 rounded-lg shadow hover:shadow-lg flex flex-col items-start space-y-1"
                            onClick={() => toggleDropdown('giaoDich')}
                        >
                            <div className="flex items-center space-x-2">
                                <span>Giao dịch</span>
                                <FaChevronDown
                                    className={`transition-transform ${openDropdown === 'giaoDich' ? 'rotate-180' : ''}`}
                                />
                            </div>
                            <div className="mt-2 text-sm text-red-500">{selectedTransaction}</div>
                            {openDropdown === 'giaoDich' && (
                                <ul className="absolute left-0 mt-2 w-48 bg-white border border-gray-300 rounded shadow-lg">
                                    {transactionItems.map((item) => (
                                        <li
                                            key={item.label}
                                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center space-x-2"
                                            onClick={() =>
                                                handleNavigate(item.path, item.label, setSelectedTransaction)
                                            }
                                        >
                                            {selectedTransaction === item.label ? (
                                                <FaCheckSquare className="text-red-500" />
                                            ) : (
                                                <FaRegSquare className="text-red-500" />
                                            )}
                                            <span>{item.label}</span>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </button>
                    </div>

                    {/* Diện tích */}
                    <div className="relative">
                        <button
                            className="bg-white text-gray-700 text-sm px-4 py-2 rounded-lg shadow hover:shadow-lg flex flex-col items-start space-y-1"
                            onClick={() => toggleDropdown('dienTich')}
                        >
                            <div className="flex items-center space-x-2">
                                <span>Diện tích</span>
                                <FaChevronDown
                                    className={`transition-transform ${openDropdown === 'dienTich' ? 'rotate-180' : ''}`}
                                />
                            </div>
                            <div className="mt-2 text-sm text-red-500">{selectedSize}</div>
                            {openDropdown === 'dienTich' && (
                                <ul className="absolute left-0 mt-2 w-48 bg-white border border-gray-300 rounded shadow-lg">
                                    {sizeItems.map((item) => (
                                        <li
                                            key={item.label}
                                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center space-x-2"
                                            onClick={() => handleNavigate(item.path, item.label, setSelectedSize)}
                                        >
                                            {selectedSize === item.label ? (
                                                <FaCheckSquare className="text-red-500" />
                                            ) : (
                                                <FaRegSquare className="text-red-500" />
                                            )}
                                            <span>{item.label}</span>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </button>
                    </div>

                    {/* Khoảng giá */}
                    <div className="relative">
                        <button
                            className="bg-white text-gray-700 text-sm px-4 py-2 rounded-lg shadow hover:shadow-lg flex flex-col items-start space-y-1"
                            onClick={() => toggleDropdown('gia')}
                        >
                            <div className="flex items-center space-x-2">
                                <span>Khoảng giá</span>
                                <FaChevronDown
                                    className={`transition-transform ${openDropdown === 'gia' ? 'rotate-180' : ''}`}
                                />
                            </div>
                            <div className="mt-2 text-sm text-red-500">{selectedPrice}</div>
                            {openDropdown === 'gia' && (
                                <ul className="absolute left-0 mt-2 w-48 bg-white border border-gray-300 rounded shadow-lg">
                                    {priceItems.map((item) => (
                                        <li
                                            key={item.label}
                                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center space-x-2"
                                            onClick={() => handleNavigate(item.path, item.label, setSelectedPrice)}
                                        >
                                            {selectedPrice === item.label ? (
                                                <FaCheckSquare className="text-red-500" />
                                            ) : (
                                                <FaRegSquare className="text-red-500" />
                                            )}
                                            <span>{item.label}</span>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default SecondaryHeader;
