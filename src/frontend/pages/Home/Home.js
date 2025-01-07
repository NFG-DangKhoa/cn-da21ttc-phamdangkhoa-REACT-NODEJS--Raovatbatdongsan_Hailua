import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRulerCombined, faMapMarkerAlt, faClock, faMoneyBill, faAngleRight, faUsers, faBookmark, faStar } from '@fortawesome/free-solid-svg-icons';
import { faHome, faBuilding } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';


const Home = () => {
    const [bdsForSale, setBdsForSale] = useState([]);  // Danh sách BĐS đang bán
    const [bdsForRent, setBdsForRent] = useState([]);  // Danh sách BĐS đang cho thuê
    const [bdsFeatured, setBdsFeatured] = useState([]);  // Danh sách BĐS nổi bật
    const [userCount, setuserCount] = useState([]);  // Danh sách số lượng user
    const [showAllForSale, setShowAllForSale] = useState(false); // Trạng thái hiển thị tất cả BĐS đang bán
    const [showAllForRent, setShowAllForRent] = useState(false); // Trạng thái hiển thị tất cả BĐS cho thuê
    const [showAllFeatured, setShowAllFeatured] = useState(false); // Trạng thái hiển thị tất cả BĐS nổi bật
    const [forSaleCount, setForSaleCount] = useState(0);
    const [forRentCount, setForRentCount] = useState(0);
    const [featuredCount, setFeaturedCount] = useState(0);

    useEffect(() => {
        // Lấy số lượng bất động sản từ API
        fetch('http://localhost:5000/api/bds/count')
            .then((res) => res.json())
            .then((data) => {
                setForSaleCount(data.forSaleCount);
                setForRentCount(data.forRentCount);
                setFeaturedCount(data.featuredCount); // Corrected to use featuredCount from API
            });
    }, []);

    // Hàm xử lý số liệu hiển thị
    const getDisplayCount = (count) => {
        if (count > 4) return '4+';
        if (count > 10) return '10+';
        if (count > 100) return '100+';
        return count;
    };

    useEffect(() => {
        fetch('http://localhost:5000/api/auth/user-count')
            .then((res) => res.json())
            .then((data) => {
                if (data && data.userCount !== undefined) {
                    setuserCount(data.userCount);
                } else {
                    console.error('Invalid data received:', data);
                }
            })
            .catch((error) => {
                console.error('Error fetching user count:', error);
            });
    }, []);

    useEffect(() => {
        const fetchBDS = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/bds/all');
                const { forSale, forRent, featured } = response.data;

                const dataForSale = forSale.map((bds) => ({
                    ...bds,
                    images: bds.images.map((img) => `http://localhost:5000/${img}`),
                }));

                const dataForRent = forRent.map((bds) => ({
                    ...bds,
                    images: bds.images.map((img) => `http://localhost:5000/${img}`),
                }));

                const dataFeatured = featured.map((bds) => ({
                    ...bds,
                    images: bds.images.map((img) => `http://localhost:5000/${img}`),
                }));

                setBdsForSale(dataForSale);
                setBdsForRent(dataForRent);
                setBdsFeatured(dataFeatured);  // Setting featured data
            } catch (error) {
                console.error('Error fetching BDS:', error);
            }
        };

        fetchBDS();
    }, []); // Chạy khi component mount

    // Lấy tối đa 4 BĐS đang bán
    const displayedBdsForSale = showAllForSale ? bdsForSale : bdsForSale.slice(0, 4);
    // Lấy tối đa 4 BĐS cho thuê
    const displayedBdsForRent = showAllForRent ? bdsForRent : bdsForRent.slice(0, 4);
    // Lấy tối đa 4 BĐS nổi bật
    const displayedBdsFeatured = showAllFeatured ? bdsFeatured : bdsFeatured.slice(0, 4);

    const remainingForSale = forSaleCount - displayedBdsForSale.length;
    const remainingForRent = forRentCount - displayedBdsForRent.length;
    const remainingFeatured = featuredCount - displayedBdsFeatured.length; // New line to track remaining featured properties

    const timeAgo = (timestamp) => {
        const now = new Date();
        const postedAt = new Date(timestamp);
        const diffInSeconds = Math.floor((now - postedAt) / 1000);
        const diffInMinutes = Math.floor(diffInSeconds / 60);
        const diffInHours = Math.floor(diffInMinutes / 60);
        const diffInDays = Math.floor(diffInHours / 24);

        if (diffInMinutes < 1) return 'Vừa xong';
        if (diffInMinutes < 60) return `${diffInMinutes} phút trước`;
        if (diffInHours < 24) return `${diffInHours} giờ trước`;
        return `${diffInDays} ngày trước`;
    };
    return (
        <div className="p-6 mt-48 flex flex-col items-center">
            {/* Đoạn văn bản tìm kiếm bất động sản */}
            <div className="w-[85vw] text-center mb-12">
                <h1 className="text-3xl font-semibold mb-4">Tìm kiếm bất động sản giá tốt</h1>
                <p className="text-lg font-light">BdsHailua là kênh bất động sản số 1 tại Trà Vinh. Hiện có 100+ tin rao mua bán & cho thuê BDS, nhà đất như: căn hộ, đất nền, nhà riêng. Đăng tin bất động sản hiệu quả với 100+ mỗi tháng.</p>
            </div>

            <div className="flex flex-wrap justify-between gap-6 mt-2">
                {/* Div bên trái */}
                <div className="w-[40vw] p-6 bg-white rounded-lg shadow-lg"> {/* Đặt chiều rộng cố định */}
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                        <FontAwesomeIcon icon={faHome} className="text-blue-500" /> Mua bán nhà đất
                    </h3>
                    <p>
                        Tìm kiếm thông tin mua bán nhà đất với nhiều loại diện tích, giá cả, đầy đủ hình ảnh, pháp lý minh bạch rõ ràng.
                    </p>
                    <ul className="mt-4 space-y-2">
                        <li className="flex items-center text-blue-600 cursor-pointer hover:underline">
                            <FontAwesomeIcon icon={faAngleRight} className="mr-2 text-blue-500" />
                            <a href="/ban-dat-nen">Bán đất nền</a>
                        </li>
                        <li className="flex items-center text-blue-600 cursor-pointer hover:underline">
                            <FontAwesomeIcon icon={faAngleRight} className="mr-2 text-blue-500" />
                            <a href="/chung-cu">Chung cư</a>
                        </li>
                    </ul>
                </div>

                {/* Div bên phải */}
                <div className="w-[40vw] p-6 bg-white rounded-lg shadow-lg"> {/* Đặt chiều rộng cố định */}
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                        <FontAwesomeIcon icon={faBuilding} className="text-green-500" /> Cho thuê nhà đất
                    </h3>
                    <p>
                        Hiện tại có rất nhiều tin đăng cho thuê, tha hồ để bạn tìm kiếm và lựa chọn sản phẩm phù hợp.
                    </p>
                    <ul className="mt-4 space-y-2">
                        <li className="flex items-center text-blue-600 cursor-pointer hover:underline">
                            <FontAwesomeIcon icon={faAngleRight} className="mr-2 text-blue-500" />
                            <a href="/cho-thue-can-ho">Cho thuê căn hộ</a>
                        </li>
                        <li className="flex items-center text-blue-600 cursor-pointer hover:underline">
                            <FontAwesomeIcon icon={faAngleRight} className="mr-2 text-blue-500" />
                            <a href="/cho-thue-phong-tro">Cho thuê phòng trọ</a>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="mt-20 w-full max-w-screen-xl">
                {/* Bất động sản nổi bật */}
                <h2 className="text-xl font-medium mb-6 flex justify-between items-center">
                    <span className="text-3xl pl-20 font-sans">Bất động sản nổi bật</span>
                </h2>
                <div className="flex flex-wrap justify-center gap-x-5 gap-y-6">
                    {bdsFeatured.length > 0 ? (
                        displayedBdsFeatured.map((bds) => (
                            <div
                                key={bds._id}
                                className="p-0 border rounded-lg shadow transform transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-gray-500 w-[260px] relative"
                            >
                                {/* Huy hiệu bookmark với ngôi sao */}
                                <div className="absolute top-2 left-2 w-12 h-12 flex items-center justify-center z-20">
                                    <FontAwesomeIcon
                                        icon={faBookmark}
                                        className="text-xl top-[20%] left-[20%] w-8 h-8"
                                        style={{
                                            maskImage: 'linear-gradient(to bottom, #FFF9C4, #FFEB3B)',  // Màu vàng nhẹ từ trên xuống dưới
                                            WebkitMaskImage: 'linear-gradient(to bottom, #FFF9C4, #FFEB3B)',  // Đảm bảo tương thích trên các trình duyệt khác nhau
                                            color: 'yellow '
                                        }}
                                    />
                                    <FontAwesomeIcon
                                        icon={faStar}
                                        className="absolute text-yellow-700 text-l top-[35%] left-[32%]" // Tăng kích thước và điều chỉnh vị trí
                                    />
                                </div>

                                {/* Vùng chứa ảnh */}
                                {bds.images && bds.images.length > 0 ? (
                                    <div className="overflow-hidden relative">
                                        <img
                                            src={bds.images[0]}
                                            alt={`Hình ảnh của ${bds.title}`}
                                            className="rounded-lg w-full h-48 object-cover"
                                        />
                                        {/* Thời gian hiển thị */}
                                        <div className="absolute bottom-2 right-2 bg-black bg-opacity-60 text-white text-xs p-1 rounded flex items-center z-10">
                                            <FontAwesomeIcon icon={faClock} className="mr-1 text-[10px]" />
                                            {timeAgo(bds.createdAt)}
                                        </div>
                                    </div>
                                ) : (
                                    <p>Không có hình ảnh.</p>
                                )}
                                {/* Vùng chứa thông tin */}
                                <div className="mt-4 px-4">
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
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>Không có bất động sản nào.</p>
                    )}
                </div>
            </div>

            <div className="mt-20 w-full max-w-screen-xl">
                {/* Bất động sản đang bán */}
                <h2 className="text-xl font-medium mb-6 flex justify-between items-center">
                    <span className="text-3xl pl-20 font-sans">Bất động sản đang bán</span>
                    {displayedBdsForSale.length < forSaleCount && !showAllForSale && (
                        <button className="text-blue-500" onClick={() => setShowAllForSale(true)}>
                            <span className="pr-40">
                                <Link to="/bdsSelling?type=forSale">
                                    Xem thêm {remainingForSale} bất động sản khác
                                    <FontAwesomeIcon icon={faAngleRight} className="mr-2 text-blue-500" />
                                </Link>
                            </span>
                        </button>
                    )}
                </h2>
                {bdsForSale.length > 0 ? (
                    <div className="flex flex-wrap justify-center gap-x-5 gap-y-6">
                        {displayedBdsForSale.map((bds) => (
                            <div
                                key={bds._id}
                                className="p-0 border rounded-lg shadow transform transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-gray-500 w-[260px] relative"
                            >
                                {/* Vùng chứa ảnh */}
                                {bds.images && bds.images.length > 0 ? (
                                    <div className="overflow-hidden relative">
                                        <img
                                            src={bds.images[0]}
                                            alt={`Hình ảnh của ${bds.title}`}
                                            className="rounded-lg w-full h-48 object-cover"
                                        />
                                        {/* Thời gian hiển thị */}
                                        <div className="absolute bottom-2 right-2 bg-black bg-opacity-60 text-white text-xs p-1 rounded flex items-center z-10">
                                            <FontAwesomeIcon icon={faClock} className="mr-1 text-[10px]" />
                                            {timeAgo(bds.createdAt)}
                                        </div>
                                    </div>
                                ) : (
                                    <p>Không có hình ảnh.</p>
                                )}
                                {/* Vùng chứa thông tin */}
                                <div className="mt-4 px-4">
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
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>Không có bất động sản nào.</p>
                )}

                {/* Bất động sản đang cho thuê */}
                <h2 className="text-xl font-medium mt-10 mb-6 flex justify-between items-center">
                    <span className="text-3xl pl-20 font-sans">Bất động sản đang cho thuê</span>
                    {displayedBdsForRent.length < forRentCount && !showAllForRent && (
                        <button
                            className="text-blue-500"
                            onClick={() => setShowAllForRent(true)}
                        >
                            <span className="pr-40">
                                <Link to="/bdsSelling?type=forRent">
                                    Xem thêm {remainingForRent} bất động sản khác
                                    <FontAwesomeIcon icon={faAngleRight} className="mr-2 text-blue-500" />
                                </Link>
                            </span>
                        </button>
                    )}
                </h2>

                {bdsForRent.length > 0 ? (
                    <div className="flex flex-wrap justify-center gap-x-5 gap-y-6">
                        {displayedBdsForRent.map((bds) => (
                            <div
                                key={bds._id}
                                className="p-0 border rounded-lg shadow transform transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-gray-500 w-[260px] relative"
                            >
                                {/* Vùng chứa ảnh */}
                                {bds.images && bds.images.length > 0 ? (
                                    <div className="overflow-hidden relative">
                                        <img
                                            src={bds.images[0]}
                                            alt={`Hình ảnh của ${bds.title}`}
                                            className="rounded-lg w-full h-48 object-cover"
                                        />
                                        {/* Thời gian hiển thị */}
                                        <div className="absolute bottom-2 right-2 bg-black bg-opacity-60 text-white text-xs p-1 rounded flex items-center z-10">
                                            <FontAwesomeIcon icon={faClock} className="mr-1 text-[10px]" />
                                            {timeAgo(bds.createdAt)}
                                        </div>
                                    </div>
                                ) : (
                                    <p>Không có hình ảnh.</p>
                                )}
                                {/* Vùng chứa thông tin */}
                                <div className="mt-4 px-4">
                                    <h3 className="text-blue-500 font-bold">{bds.title}</h3>
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
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>Không có bất động sản nào.</p>
                )}

                {/* Bất động sản theo khu vực */}
                <div className="mt-12 w-full bg-white p-6 rounded-lg shadow-lg">
                    <h3 className="text-xl font-bold mb-4">Bất động sản theo khu vực</h3>
                    <p>Chúng tôi có các lựa chọn bất động sản tại nhiều khu vực khác nhau. Dễ dàng tìm kiếm bất động sản phù hợp với nhu cầu của bạn.</p>
                </div>

                {/* Bản tin bất động sản */}
                <div className="mt-12 w-full bg-white p-6 rounded-lg shadow-lg">
                    <h3 className="text-xl font-bold mb-4">Bản tin bất động sản</h3>
                    <p>Theo dõi các tin tức mới nhất về thị trường bất động sản, giá cả và các xu hướng phát triển của khu vực.</p>
                </div>


                <div className="flex justify-center items-center mt-12 mx-auto">
                    {/* Div bên trái chứa hình ảnh */}
                    <div className="w-1/3 flex justify-center items-center mr-[-30px]"> {/* Thêm margin âm để kéo div bên trái qua gần div bên phải */}
                        <img src="/images/pngtree.jpg" alt="Description of the image" className="w-70 h-70 object-cover rounded-full" /> {/* Bo tròn góc của hình ảnh */}
                    </div>

                    {/* Div bên phải chứa nội dung */}
                    <div className="w-[40vw] flex flex-col items-center"> {/* Giữ nguyên chiều rộng của div bên phải */}
                        <div className="text-center mb-6">
                            <span className="text-lg font-semibold">
                                Bán và cho thuê cùng <span className="text-blue-600">BdsHaiLua.com</span> <br />
                                Nền tảng giao dịch bất động sản hàng đầu Trà Vinh
                            </span>
                        </div>

                        <div className="flex justify-center gap-2"> {/* Giảm gap giữa các card */}
                            <div className="max-w-xs flex-1 w-1/3 flex flex-col items-center mx-2 hover:scale-105 transition-transform duration-300 shadow-lg p-4">
                                <FontAwesomeIcon icon={faUsers} className="text-blue-500 text-4xl mb-2" />
                                <span className="text-xl font-bold">{getDisplayCount(userCount)}</span>
                                <span className="text-l whitespace-nowrap text-center">Người dùng</span>
                            </div>

                            <div className="max-w-xs flex-1 w-1/3 flex flex-col items-center mx-2 hover:scale-105 transition-transform duration-300 shadow-lg p-4">
                                <FontAwesomeIcon icon={faHome} className="text-green-500 text-4xl mb-2" />
                                <span className="text-xl font-bold">{getDisplayCount(forSaleCount)} </span>
                                <span className="text-l whitespace-nowrap text-center">Bất động sản bán</span>
                            </div>

                            <div className="max-w-xs flex-1 w-1/3 flex flex-col items-center mx-2 hover:scale-105 transition-transform duration-300 shadow-lg p-4">
                                <FontAwesomeIcon icon={faBuilding} className="text-orange-500 text-4xl mb-2" />
                                <span className="text-xl font-bold">{getDisplayCount(forRentCount)}</span>
                                <span className="text-l whitespace-nowrap text-center">Bất động sản cho thuê</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Khách hàng đánh giá */}
                <div className="mt-12 w-full bg-white p-6 rounded-lg shadow-lg">
                    <h3 className="text-xl font-bold mb-4">Khách hàng đánh giá về chúng tôi</h3>
                    <p>Chúng tôi luôn nỗ lực mang đến dịch vụ tốt nhất cho khách hàng. Dưới đây là những đánh giá từ khách hàng của chúng tôi.</p>
                </div>

                <div className="w-full flex justify-center items-center mt-12">
                    {/* Bảng chia làm 2 cột */}
                    <table className="w-full max-w-4xl">
                        <tbody>
                            <tr>
                                {/* Cột 1: Hình ảnh */}
                                <td className="w-1/2 p-4 text-center">
                                    <img
                                        src="/images/hotro.png"
                                        alt="Description of the image"
                                        className="w-80 h-80 object-cover rounded-full mx-auto shadow-lg"
                                    />
                                </td>

                                {/* Cột 2: Nội dung hỗ trợ */}
                                <td className="w-1/2 p-4 text-center">
                                    <h3 className="text-2xl font-semibold mb-4 text-blue-700">Bạn cần hỗ trợ?</h3>
                                    <p className="text-lg text-gray-700 mb-6">Chúng tôi luôn sẵn sàng hỗ trợ bạn. Liên hệ ngay với chúng tôi để được tư vấn miễn phí.</p>

                                    {/* Thông tin hỗ trợ */}
                                    <div className="space-y-4">
                                        <div>
                                            <h4 className="font-semibold text-lg text-blue-600">Hỗ trợ đăng tin</h4>
                                            <p className="text-gray-600">Điện thoại:
                                                <a href="tel:+0345476413" className="text-blue-500 hover:text-blue-700 transition duration-200"> 0345476413</a>
                                            </p>
                                            <p className="text-gray-600">Zalo:
                                                <a href="https://zalo.me/0345476413" className="text-blue-500 hover:text-blue-700 transition duration-200"> 0345476413</a>
                                            </p>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Home;
