import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-white text-black py-6 border-t-1 shadow-[0_-4px_10px_rgba(0,0,0,0.1)]">
            <div className="container mx-auto text-center">
                <p>&copy; 2024 Quản lý Bất động sản. All rights reserved.</p>
                <div className="mt-4">
                    <a href="#privacy-policy" className="text-yellow-300 hover:text-yellow-400 mx-3">Privacy Policy</a>
                    <a href="#terms-of-service" className="text-yellow-300 hover:text-yellow-400 mx-3">Terms of Service</a>
                    <a href="#contact" className="text-yellow-300 hover:text-yellow-400 mx-3">Contact Us</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
