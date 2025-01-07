import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

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
            const response = await axios.post('http://localhost:5000/api/auth/login', formData);
            const { token, role } = response.data; // Lấy token và role từ response

            // Lưu token và role vào localStorage
            localStorage.setItem('authToken', token);
            localStorage.setItem('role', role); // Lưu role vào localStorage

            // Điều hướng theo role
            if (role === 'admin') {
                navigate('/dashboard'); // Chuyển đến trang home nếu là admin
            } else if (role === 'user') {
                navigate('/'); // Chuyển đến trang home nếu là user
            } else {
                setMessage('Quyền truy cập không hợp lệ');
            }
        } catch (error) {
            if (error.response) {
                setMessage('Lỗi: ' + (error.response.data.message || 'Có lỗi xảy ra'));
            } else {
                setMessage('Lỗi kết nối với máy chủ');
            }
        }
    };

    const loginStyles = {
        backgroundImage: "url('/images/r3.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    };

    return (
        <div style={loginStyles}>
            <div className="login-modal bg-white p-8 rounded shadow-md">
                <h2 className="text-xl font-bold mb-4">Đăng nhập</h2>
                <form onSubmit={handleSubmit}>
                    <div className="my-4">
                        <label htmlFor="email" className="block mb-2">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="border p-2 w-full rounded"
                            required
                        />
                    </div>
                    <div className="my-4">
                        <label htmlFor="password" className="block mb-2">Mật khẩu:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="border p-2 w-full rounded"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-500 text-white p-2 rounded w-full hover:bg-blue-600"
                    >
                        Đăng nhập
                    </button>
                </form>
                {message && (
                    <div className="mt-4 p-2 text-center bg-red-500 text-white">
                        {message}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Login;
