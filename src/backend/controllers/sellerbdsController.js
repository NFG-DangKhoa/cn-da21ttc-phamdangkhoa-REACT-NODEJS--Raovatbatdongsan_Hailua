const BDS = require('../models/BDS.model');
const Images = require('../models/Images.model');
const Seller = require('../models/Seller.model');
const Transaction = require('../models/Transaction.model');
const path = require('path');

// Tạo BĐS mới, upload ảnh và tạo giao dịch
const createBDS = async (req, res) => {
    const { title, description, price, area, location, type, status, phone, address } = req.body; // Thêm phone và address vào destructuring
    const sellerId = req.user.id;  // Lấy Seller ID từ token (do middleware xác thực)

    try {
        // Bước 1: Kiểm tra nếu seller đã có trong bảng Seller
        let seller = await Seller.findOne({ user_id: sellerId });
        if (!seller) {
            // Tạo Seller mới nếu chưa có
            seller = new Seller({
                user_id: req.user.id,  // Liên kết với user từ token
                name: req.user.name || '',  // Sử dụng thông tin từ token, để trống nếu không có
                email: req.user.email,  // Email từ token
                phone: phone || '',      // Sử dụng giá trị từ req.body hoặc mặc định là chuỗi rỗng
                address: address || '',  // Sử dụng giá trị từ req.body hoặc mặc định là chuỗi rỗng

            });
            await seller.save();
        }

        // Bước 2: Tạo mới BĐS
        const newBDS = new BDS({
            title,             // Tiêu đề
            description,       // Mô tả
            price,             // Giá
            area,              // Diện tích
            location,          // Vị trí
            type: type || '',  // Loại BĐS (Nhà, Căn hộ, v.v)
            status: status === 'bán' ? 'đang bán' : (status === 'cho thuê' ? 'đang cho thuê' : 'ẩn'), // Trạng thái
            createdAt: Date.now(),
            updatedAt: Date.now(),
        });

        const savedBDS = await newBDS.save();

        // Bước 3: Upload ảnh BĐS (1 ảnh chính và 2 ảnh phụ)
        const images = req.files.map((file, index) => {
            const isMain = index === 0;  // Ảnh đầu tiên là ảnh chính
            return {
                bds_id: savedBDS._id,
                url: `images/${file.filename}`,  // Lưu ảnh với URL 'images/tên file'
                is_main: isMain,
            };
        });

        // Lưu ảnh vào bảng Images
        await Images.insertMany(images);

        // Bước 4: Tạo giao dịch cho bất động sản (Transaction)
        const newTransaction = new Transaction({
            bds_id: savedBDS._id,
            seller_id: seller._id,
            buyer_id: null,  // Buyer chưa có
            transaction_date: new Date(),
            price: savedBDS.price,
            status: 'pending',  // Giao dịch đang chờ
            transaction_method: 'sell',  // Có thể là 'sell' hoặc 'rent'
        });

        await newTransaction.save();

        // Trả về kết quả thành công
        res.status(201).json({
            message: 'BĐS và giao dịch đã được tạo thành công!',
            bds: savedBDS,
            transaction: newTransaction,
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};


const getSellerInfo = async (req, res) => {
    const sellerId = req.user.id; // Lấy user_id từ token
    try {
        const seller = await Seller.findOne({ user_id: sellerId });
        if (!seller) {
            return res.status(404).json({ message: 'Người bán chưa tồn tại' });
        }
        res.status(200).json(seller);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};


module.exports = {
    createBDS,
    getSellerInfo,
};
