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
            const { token, role } = response.data;
            localStorage.setItem('authToken', token);
            localStorage.setItem('role', role);

            if (role === 'admin') {
                navigate('/dashboard');
            } else if (role === 'user') {
                navigate('/');
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
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Đăng nhập</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
                            Mật khẩu
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200"
                    >
                        Đăng nhập
                    </button>
                </form>

                {message && (
                    <div className="mt-4 p-3 text-center bg-red-500 text-white rounded">
                        {message}
                    </div>
                )}

                <div className="mt-4 text-center">
                    <a
                        href="/forgot-password"
                        className="text-blue-500 hover:underline text-sm"
                    >
                        Quên mật khẩu?
                    </a>
                </div>
                <div className="mt-2 text-center">
                    <span className="text-gray-600 text-sm">Chưa có tài khoản? </span>
                    <a
                        href="/signup"
                        className="text-blue-500 hover:underline text-sm"
                    >
                        Đăng ký
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Login;
