const express = require("express");
const router = express.Router();

const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const { requireAuth } = require("../../utils/auth");
const { Op } = require("sequelize");

const { Song, User, Comment, Playlist, PlaylistSong, Album } = require("../../db/models");




// GET all current user Albums
router.get('/current', async (req, res, next) => {

    const userId = req.user.id;

    const currentAlbum = await Album.findAll({
        where : {userId : userId}
    }); 

    res.status(200);   
    return res.json({Albums : currentAlbum});
    

});


// GET details of album by ID
router.get('/:albumId', async (req, res, next) => {

    const albumId = req.params.albumId;

    const detailAlbum = await Album.findByPk(albumId, {
        include : [
            {model : User , as : 'Artist' },
            {model : Song}
        ]
    });

    if (detailAlbum) {
        res.status(200);
        return res.json(detailAlbum);
    } else {
        const err = new Error("Couldn't find an Album with the specified id");
        err.title = "Album couldn't be found";
        err.errors = "Album couldn't be found";
        err.status = 404;
        return next(err);
    }



});


// GET all ALBUMS
router.get('/', async (req, res, next) => {

    const findAlbums = await Album.findAll();

    res.status(200);
    return res.json({Albums : findAlbums});

}); 
































module.exports = router;