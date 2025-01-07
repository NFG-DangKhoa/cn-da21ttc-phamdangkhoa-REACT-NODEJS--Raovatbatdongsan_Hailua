import React, { useState } from 'react';
import axios from 'axios';

const SellerBDSForm = () => {
    // Các state cho thông tin bất động sản
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [area, setArea] = useState('');
    const [location, setLocation] = useState('');
    const [type, setType] = useState('');
    const [status, setStatus] = useState('bán');
    const [images, setImages] = useState([]);
    const [imageWarning, setImageWarning] = useState('');

    // Các state cho thông tin người bán
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');

    // Trạng thái hiển thị form
    const [showBDSForm, setShowBDSForm] = useState(false);  // Quản lý hiển thị form thông tin bất động sản
    const [formCompleted, setFormCompleted] = useState(false); // Quản lý trạng thái form người bán đã hoàn thành

    const [loading, setLoading] = useState(false);

    const handleFileChange = (e) => {
        const newImages = [...images, ...Array.from(e.target.files)];
        if (newImages.length > 3) {
            setImageWarning('Bạn chỉ có thể chọn tối đa 3 ảnh.');
        } else {
            setImageWarning('');
            setImages(newImages);  // Nối các ảnh mới với ảnh cũ
        }
    };

    // Kiểm tra nếu thông tin người bán đã hoàn tất
    const isSellerFormCompleted = () => {
        return name && phone && email && address;
    };

    const handleSellerFormSubmit = (e) => {
        e.preventDefault();
        if (isSellerFormCompleted()) {
            setShowBDSForm(true); // Hiển thị form thông tin bất động sản
            setFormCompleted(true); // Đánh dấu form người bán đã hoàn thành
        } else {
            alert('Vui lòng điền đầy đủ thông tin người bán.');
        }
    };

    const handleBackToSellerForm = () => {
        setShowBDSForm(false); // Quay lại form thông tin người bán
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Tạo FormData để gửi thông tin
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('area', area);
        formData.append('location', location);
        formData.append('type', type);
        formData.append('status', status);
        formData.append('name', name);
        formData.append('phone', phone);
        formData.append('email', email);
        formData.append('address', address);

        images.forEach((image) => {
            formData.append('images', image);
        });

        setLoading(true);

        try {
            const token = localStorage.getItem('authToken'); // Lấy token từ localStorage

            // Gửi dữ liệu đến API
            const response = await axios.post('http://localhost:5000/api/sellerbds/create', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`,
                },
            });

            // Sau khi tạo thành công, điều hướng về trang chủ
            alert('BĐS và thông tin người bán đã được tạo thành công!');
            window.location.href = '/';  // Chuyển hướng đến trang chủ
        } catch (error) {
            console.error('Có lỗi xảy ra!', error);
            alert('Có lỗi xảy ra, vui lòng thử lại!');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-4 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Tạo Bất Động Sản Mới</h2>

            {/* Form Thông Tin Người Bán */}
            {!showBDSForm && (
                <form onSubmit={handleSellerFormSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Tên người bán</label>
                        <input
                            type="text"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Số điện thoại</label>
                        <input
                            type="text"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Địa chỉ</label>
                        <input
                            type="text"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            required
                        />
                    </div>

                    {/* Nút Tiếp theo */}
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                        disabled={!isSellerFormCompleted()} // Chỉ cho nhấn khi form người bán đã hoàn tất
                    >
                        Tiếp theo
                    </button>
                </form>
            )}

            {/* Form Thông Tin Bất Động Sản */}
            {showBDSForm && (
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Tiêu đề</label>
                        <input
                            type="text"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Mô tả</label>
                        <textarea
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-4 grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Giá</label>
                            <input
                                type="number"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Diện tích</label>
                            <input
                                type="number"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                                value={area}
                                onChange={(e) => setArea(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="mb-4 grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Vị trí</label>
                            <input
                                type="text"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Loại BĐS</label>
                            <select
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                                value={type}
                                onChange={(e) => setType(e.target.value)}
                                required
                            >
                                <option value="">Hãy chọn</option>
                                <option value="Nhà">Nhà</option>
                                <option value="Căn hộ">Căn hộ</option>
                                <option value="Đất">Đất</option>
                            </select>
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Trạng thái</label>
                        <select
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            required
                        >
                            <option value="">Hãy chọn</option>
                            <option value="bán">Bán</option>
                            <option value="cho thuê">Cho thuê</option>
                        </select>
                    </div>

                    {/* Chọn ảnh */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Chọn ảnh (tối đa 3 ảnh)</label>
                        <input
                            type="file"
                            accept="image/*"
                            multiple
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                            onChange={handleFileChange}
                            required
                        />
                        {imageWarning && <p className="text-red-500 text-xs mt-1">{imageWarning}</p>}
                        <div className="flex mt-2 space-x-2">
                            {images.map((image, index) => (
                                <img
                                    key={index}
                                    src={URL.createObjectURL(image)}
                                    alt={`preview-${index}`}
                                    className="w-20 h-20 object-cover"
                                />
                            ))}
                        </div>
                    </div>

                    {/* Nút quay lại */}
                    <button
                        type="button"
                        className="w-full bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600"
                        onClick={handleBackToSellerForm}
                    >
                        Quay lại
                    </button>

                    {/* Nút gửi */}
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                        disabled={loading}
                    >
                        {loading ? 'Đang tải...' : 'Gửi'}
                    </button>
                </form>
            )}
        </div>
    );
};

export default SellerBDSForm;
