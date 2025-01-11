const express = require('express');
const router = express.Router();

// Import các controller từ FavoriteController
const { addFavorite, getFavorites, saveAndCheckFavorite } = require('../controllers/FavoriteController');

// Route để thêm bất động sản vào danh sách yêu thích
router.post('/add', addFavorite);

// Route để lấy danh sách yêu thích của người dùng theo userId
router.get('/:userId', getFavorites);


router.post('/save-temp', saveAndCheckFavorite);
module.exports = router;
