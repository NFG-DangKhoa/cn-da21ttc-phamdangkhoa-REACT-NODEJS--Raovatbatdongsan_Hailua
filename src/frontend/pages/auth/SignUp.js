import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  // Import useNavigate

const SignUp = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });

    const [message, setMessage] = useState(''); // Thêm state cho thông báo
    const navigate = useNavigate();  // Khởi tạo navigate

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/auth/register', formData);
            setMessage({ type: 'success', text: response.data.message });  // Hiển thị thông báo thành công

            // Điều hướng đến trang đăng nhập sau khi đăng ký thành công
            setTimeout(() => {
                navigate('/login');  // Chuyển hướng đến Login.js
            }, 2000);  // Thời gian đợi 2 giây trước khi chuyển hướng
        } catch (error) {
            setMessage({ type: 'error', text: error.response?.data?.error || 'Có lỗi xảy ra!' });  // Hiển thị thông báo lỗi
        }
    };

    // Style nội tuyến cho background
    const signUpStyles = {
        backgroundImage: "url('/images/r3.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        height: "100vh", // Đảm bảo full chiều cao màn hình
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    };

    return (
        <div style={signUpStyles}>
            <div className="signup-modal bg-white p-8 rounded shadow-md">
                <h2 className="text-xl font-bold mb-4">Đăng ký</h2>
                <form onSubmit={handleSubmit}>
                    <div className="my-4">
                        <label htmlFor="name">Tên đăng nhập:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="border p-2 w-full"
                        />
                    </div>
                    <div className="my-4">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="border p-2 w-full"
                        />
                    </div>
                    <div className="my-4">
                        <label htmlFor="password">Mật khẩu:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="border p-2 w-full"
                        />
                    </div>
                    <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">
                        Đăng ký
                    </button>
                </form>
                {message && (
                    <div className={`mt-4 p-2 text-center ${message.type === 'success' ? 'bg-green-500' : 'bg-red-500'} text-white`}>
                        {message.text}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SignUp;
