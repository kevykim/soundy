const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const { requireAuth } = require("../../utils/auth");
const { Op } = require("sequelize");

const { Song, User, Playlist } = require("../../db/models");


const playlistValidation = [
    check('name')
        .exists({checkFalsy : true})
        .withMessage('Playlist name is required'),
    handleValidationErrors,
]

// CREATE a Playlist
router.post('/', requireAuth, playlistValidation, async (req, res) => {

    const {name, imageUrl} = req.body;

    const createSong = await Playlist.create({
        name,
        imageUrl : imageUrl || 'image.com'
    });

    res.status(201);
    return res.json({createSong});

});








module.exports = router;