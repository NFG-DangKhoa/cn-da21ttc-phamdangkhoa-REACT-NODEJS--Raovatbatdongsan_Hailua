import React from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion'; // Import motion từ framer-motion
import SecondaryHeader from './SecondaryHeader'; // Giữ lại header của bạn

const Layout = ({ children }) => {
    const location = useLocation();

    return (
        <>
            <SecondaryHeader />
            <motion.main
                key={location.key}
                initial={{ opacity: 0 }} // Ban đầu opacity là 0
                animate={{ opacity: 1 }} // Sau khi vào trang, opacity sẽ là 1
                exit={{ opacity: 0 }} // Khi thoát trang, opacity sẽ là 0
                transition={{ duration: 0.5 }} // Thời gian chuyển động
            >
                {children}
            </motion.main>
        </>
    );
};

export default Layout;
