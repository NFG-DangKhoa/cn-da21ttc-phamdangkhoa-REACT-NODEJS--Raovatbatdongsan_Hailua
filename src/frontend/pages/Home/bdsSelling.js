import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';  // Import useLocation
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRulerCombined, faMapMarkerAlt, faClock, faMoneyBill, faAngleRight } from '@fortawesome/free-solid-svg-icons';

const BdsSelling = () => {
    const [bdsForSale, setBdsForSale] = useState([]); // Danh sách BĐS đang bán hoặc cho thuê
    const [sortOption, setSortOption] = useState('default'); // Lựa chọn sắp xếp
    const [forSaleCount, setForSaleCount] = useState(0);
    const [forRentCount, setForRentCount] = useState(0); // Thêm state cho số lượng cho thuê
    const [areas, setAreas] = useState([]); // Lưu các khu vực
    const location = useLocation();  // Lấy đối tượng location từ URL
    const queryParams = new URLSearchParams(location.search);
    const type = queryParams.get('type'); // Lấy tham số type từ URL

    useEffect(() => {
        // Lấy số lượng bất động sản từ API tùy theo type
        fetch('http://localhost:5000/api/bds/count')
            .then((res) => res.json())
            .then((data) => {
                if (type === 'forSale') {
                    setForSaleCount(data.forSaleCount);
                } else if (type === 'forRent') {
                    setForRentCount(data.forRentCount);
                }
            });
    }, [type]); // Chạy lại khi type thay đổi

    useEffect(() => {
        const fetchBDS = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/bds/all');
                const data = type === 'forSale' ? response.data.forSale : response.data.forRent;

                const dataForSale = data.map((bds) => ({
                    ...bds,
                    images: bds.images.map((img) => `http://localhost:5000/${img}`), // Thêm tiền tố vào URL
                }));

                setBdsForSale(dataForSale); // Lưu dữ liệu BĐS vào state

                // Tạo danh sách các khu vực (tỉnh thành) từ dữ liệu BĐS
                const uniqueAreas = Array.from(new Set(data.map((bds) => getProvince(bds.location))));
                setAreas(uniqueAreas); // Lưu danh sách các khu vực vào state
            } catch (error) {
                console.error('Error fetching BDS:', error);
            }
        };

        fetchBDS();
    }, [type]); // Chạy lại khi type thay đổi

    // Hàm tính thời gian đã qua
    const timeAgo = (timestamp) => {
        const now = new Date();
        const postedAt = new Date(timestamp);
        const diffInSeconds = Math.floor((now - postedAt) / 1000); // Tính tổng giây đã trôi qua
        const diffInMinutes = Math.floor(diffInSeconds / 60);
        const diffInHours = Math.floor(diffInMinutes / 60);
        const diffInDays = Math.floor(diffInHours / 24);

        if (diffInMinutes < 1) return 'Vừa xong';
        if (diffInMinutes < 60) return `${diffInMinutes} phút trước`;
        if (diffInHours < 24) return `${diffInHours} giờ trước`;
        return `${diffInDays} ngày trước`;
    };

    // Hàm sắp xếp
    const handleSort = (option) => {
        const sortedData = [...bdsForSale];
        switch (option) {
            case 'newest':
                sortedData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                break;
            case 'priceLow':
                sortedData.sort((a, b) => a.price - b.price);
                break;
            case 'priceHigh':
                sortedData.sort((a, b) => b.price - a.price);
                break;
            case 'areaSmall':
                sortedData.sort((a, b) => a.area - b.area);
                break;
            case 'areaLarge':
                sortedData.sort((a, b) => b.area - a.area);
                break;
            default:
                break;
        }
        setBdsForSale(sortedData);
    };

    useEffect(() => {
        handleSort(sortOption);
    }, [sortOption]);

    // Hàm lấy tỉnh thành từ location (phần tử sau dấu phẩy cuối cùng)
    const getProvince = (location) => {
        const parts = location.split(','); // Tách thành các phần tử bằng dấu phẩy
        return parts[parts.length - 1].trim(); // Lấy phần tử sau dấu phẩy cuối cùng và loại bỏ khoảng trắng
    };

    return (
        <div className="flex justify-center items-start mt-48 space-x-8">
            {/* Div bên trái hiển thị danh sách bất động sản */}
            <div className="bds-left w-[45%] flex flex-col">
                <h2 className="text-xl font-medium mb-6 flex justify-between">
                    <span className="text-3xl pl-20 font-sans">{type === 'forSale' ? 'Bất động sản đang bán' : 'Bất động sản cho thuê'}</span>
                </h2>
                <div className="mb-4 flex items-center justify-between space-x-4">
                    {/* Div sắp xếp */}
                    <div className="flex items-center space-x-4">
                        <span className="font-medium">Sắp xếp:</span>
                        <select
                            value={sortOption}
                            onChange={(e) => setSortOption(e.target.value)}
                            className="border px-2 py-1 rounded-md"
                        >
                            <option value="default">Mặc định</option>
                            <option value="newest">Tin mới đăng</option>
                            <option value="priceLow">Giá thấp</option>
                            <option value="priceHigh">Giá cao</option>
                            <option value="areaSmall">Diện tích nhỏ</option>
                            <option value="areaLarge">Diện tích lớn</option>
                        </select>
                    </div>

                    {/* Hiển thị tổng số bất động sản */}
                    <div className="text-gray-600">
                        <p>{type === 'forSale' ? forSaleCount : forRentCount} tin {type === 'forSale' ? 'bán' : 'cho thuê'} bất động sản</p>
                    </div>
                </div>

                {bdsForSale.length > 0 ? (
                    <div className="flex flex-col gap-y-4">
                        {bdsForSale.map((bds) => (
                            <div
                                key={bds._id}
                                className="p-0 border rounded-lg shadow transform transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-gray-500 w-full relative flex"
                            >
                                {/* Ảnh bất động sản */}
                                {bds.images && bds.images.length > 0 ? (
                                    <div className="overflow-hidden w-1/3">
                                        <img
                                            src={bds.images[0]}
                                            alt={`Hình ảnh của ${bds.title}`}
                                            className="rounded-lg w-full h-48 object-cover"
                                        />
                                    </div>
                                ) : (
                                    <p>Không có hình ảnh.</p>
                                )}

                                {/* Thông tin bất động sản */}
                                <div className="mt-4 px-4 w-2/3 h-full">
                                    <h3 className="font-bold text-blue-500">{bds.title}</h3>
                                    <p>
                                        <FontAwesomeIcon icon={faMoneyBill} className="mr-2" />
                                        <span className="text-green-500">{bds.price.toLocaleString()} VND</span>
                                    </p>
                                    <p>
                                        <FontAwesomeIcon icon={faRulerCombined} className="text-blue-500 mr-2" />
                                        {bds.area} m²
                                    </p>
                                    <p>
                                        <FontAwesomeIcon icon={faMapMarkerAlt} className="text-red-500 mr-2" />
                                        {bds.location}
                                    </p>
                                    {/* Thời gian hiển thị */}
                                    <div className="absolute bottom-2 right-2 bg-black bg-opacity-60 text-white text-sm p-2 rounded flex items-center">
                                        <FontAwesomeIcon icon={faClock} className="mr-2" />
                                        {timeAgo(bds.createdAt)}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>Không có bất động sản nào.</p>
                )}
            </div>

            {/* Div bên phải: Thông tin liên quan */}
            <div className="bds-right w-[25%] p-6 bg-gray-100 rounded-lg shadow flex flex-col mt-16">
                <h2 className="text-2xl font-bold mb-4">
                    {type === 'forRent' ? 'Cho thuê nhà đất theo khu vực' : 'Mua bán nhà đất theo khu vực'}
                </h2>
                <ul className="mt-4 list-none flex-grow">
                    {areas.map((area) => (
                        <li key={area} className="mb-2">
                            <a
                                href="#"
                                className="flex items-center text-blue-500 hover:underline"
                            >
                                <FontAwesomeIcon icon={faAngleRight} className="mr-2 text-blue-500" />
                                {type === 'forRent' ? `Cho thuê nhà đất ${area}` : `Mua bán nhà đất ${area}`}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default BdsSelling;
