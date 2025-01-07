const Image = require('../models/Images.model');
const BDS = require('../models/BDS.model');

// Lấy danh sách tất cả hình ảnh của BDS
exports.getAllImages = async (req, res) => {
    try {
        const { bds_id } = req.query;  // Lấy bds_id từ query

        if (!bds_id) {
            return res.status(400).json({ message: 'BDS ID là bắt buộc' });
        }

        // Lấy tất cả hình ảnh của bất động sản theo bds_id
        const images = await Image.find({ bds_id })
            .populate('bds_id', 'title')  // Kết nối với bảng BDS để lấy tên bất động sản
            .lean();

        if (images.length === 0) {
            return res.status(404).json({ message: 'Không có hình ảnh nào cho BDS này' });
        }

        res.status(200).json(images);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Lấy thông tin hình ảnh theo ID
exports.getImageById = async (req, res) => {
    try {
        const { id } = req.params;
        const image = await Image.findById(id).populate('bds_id', 'title');

        if (!image) {
            return res.status(404).json({ message: 'Hình ảnh không tồn tại' });
        }

        res.status(200).json(image);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Tạo mới hình ảnh
exports.createImage = async (req, res) => {
    try {
        const { bds_id, url } = req.body;

        // Kiểm tra nếu bds_id có tồn tại trong bảng BDS
        const bds = await BDS.findById(bds_id);
        if (!bds) {
            return res.status(404).json({ message: 'Bất động sản không tồn tại' });
        }

        // Tạo mới hình ảnh
        const newImage = new Image({
            bds_id,
            url,
        });

        const savedImage = await newImage.save();
        res.status(201).json({ message: 'Hình ảnh đã được tạo!', image: savedImage });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Cập nhật thông tin hình ảnh
exports.updateImage = async (req, res) => {
    try {
        const { id } = req.params;
        const { url } = req.body;

        const updatedImage = await Image.findByIdAndUpdate(id, { url }, { new: true });

        if (!updatedImage) {
            return res.status(404).json({ message: 'Hình ảnh không tồn tại' });
        }

        res.status(200).json(updatedImage);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Xóa hình ảnh
exports.deleteImage = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedImage = await Image.findByIdAndDelete(id);

        if (!deletedImage) {
            return res.status(404).json({ message: 'Hình ảnh không tồn tại' });
        }

        res.status(200).json({ message: 'Hình ảnh đã được xóa thành công' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
