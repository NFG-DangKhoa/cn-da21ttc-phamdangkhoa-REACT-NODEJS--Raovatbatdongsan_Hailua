// src/pages/VNPAY/PaymentResult.js
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const PaymentResult = () => {
    const [paymentStatus, setPaymentStatus] = useState(null);
    const location = useLocation();

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const vnp_ResponseCode = queryParams.get('vnp_ResponseCode');
        const vnp_TransactionNo = queryParams.get('vnp_TransactionNo');
        const vnp_TxnRef = queryParams.get('vnp_TxnRef');

        if (vnp_ResponseCode === '00') {
            setPaymentStatus({
                success: true,
                transactionNo: vnp_TransactionNo,
                txnRef: vnp_TxnRef,
            });
        } else {
            setPaymentStatus({
                success: false,
                transactionNo: vnp_TransactionNo,
                txnRef: vnp_TxnRef,
            });
        }
    }, [location.search]);

    return (
        <div>
            <h1>Kết quả thanh toán</h1>
            {paymentStatus ? (
                <div>
                    <p>Mã giao dịch: {paymentStatus.transactionNo}</p>
                    <p>Tham chiếu giao dịch: {paymentStatus.txnRef}</p>
                    {paymentStatus.success ? (
                        <p style={{ color: 'green' }}>Thanh toán thành công!</p>
                    ) : (
                        <p style={{ color: 'red' }}>Thanh toán thất bại!</p>
                    )}
                </div>
            ) : (
                <p>Đang tải kết quả...</p>
            )}
        </div>
    );
};

export default PaymentResult;
