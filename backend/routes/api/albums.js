const express = require("express");
const router = express.Router();

const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const { requireAuth } = require("../../utils/auth");
const { Op } = require("sequelize");

const { Song, User, Comment, Playlist, PlaylistSong, Album } = require("../../db/models");


const validateAlbum = [
  check("title")
    .exists({ checkFalsy: true })
    .withMessage("Album title is required"),
  check("description")
    .exists({ checkFalsy: true })
    .withMessage("Album description is required"),
  check("year")
    .exists({ checkFalsy: true })
    .withMessage("Album year is required"),
    handleValidationErrors
];


// GET all current user Albums
router.get('/current', async (req, res, next) => {

    const userId = req.user.id;

    const currentAlbum = await Album.findAll({
        where : {userId : userId}
    }); 

    res.status(200);   
    return res.json({Albums : currentAlbum});
    

});


// EDIT an Album
router.put('/:albumId', requireAuth, validateAlbum, async (req, res, next) => {

    const userId = req.user.id;

    const { title, description, imageUrl, year } = req.body;

    const albumId = req.params.albumId;

    const editAlbum = await Album.findOne({ where : {
            [Op.and] : [
                {userId : userId},
                {id : albumId}
            ]
        }
    });

    if (editAlbum) {
        await editAlbum.update({
            userId,
            title, 
            description,
            year, 
            imageUrl : imageUrl || "replaceimage.com"
        });

        res.status(200);
        return res.json(editAlbum);
    } else {
        const err = new Error("Couldn't find an Album with the specified id");
        err.title = "Album couldn't be found";
        err.errors = "Album couldn't be found";
        err.status = 404;
        return next(err);
    }


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


// Create an Album
router.post('/', requireAuth, validateAlbum, async (req, res, next) => {

    const userId = req.user.id;

    const { title, description, imageUrl, year } = req.body;

    const createAlbum = await Album.create({
        userId : userId,
        title,
        description,
        year,
        imageUrl : imageUrl || "replaceimage.com"
    });

    res.status(201);
    return res.json(createAlbum);


});



// DELETE an Album
router.delete('/:albumId', requireAuth, async (req, res, next) => {

    const albumId = req.params.albumId;

    const userId = req.user.id;

    const deleteAlbum = await Album.findOne({
         where : {
            [Op.and] : [
                {id : albumId},
                {userId : userId}
            ]
        }
    })

    if (deleteAlbum) {

        await deleteAlbum.destroy();

        res.status(200);
        return res.json({
            message : "Successfully deleted",
            statusCode : 200
        });
    } else {
        const err = new Error("Couldn't find an Album with the specified id");
        err.title = "Album couldn't be found";
        err.errors = "Album couldn't be found";
        err.status = 404;
        return next(err);
    };

});
































module.exports = router;