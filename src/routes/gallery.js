const express = require('express');
const router = express.Router();
const galleryController = require('../app/controllers/GalleryController');

router.get('/', galleryController.index)

module.exports = router;