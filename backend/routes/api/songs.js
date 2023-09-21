const express = require("express");
const router = express.Router();
const { Song, User, Album } = require('../../db/models')
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const { requireAuth } = require('../../utils/auth')


const validateSong = [
check("title")
    .exists({checkFalsy: true})
    .withMessage('Song title is required'),
check("url")
    .exists({checkFalsy: true})
    .withMessage('Audio is required'),
handleValidationErrors,
];


// CREATE A SONG
router.post("/", requireAuth, validateSong, async (req, res, next) => {

    let {title, description, url, imageUrl, albumId} = req.body;
    const userId = req.user.id

    let albumExists = false;

    if (albumId) {
      const findAlbum = await Album.findByPk(albumId);
      albumExists = findAlbum !== null;
    }

    if (!albumId || albumExists) {
      const newSong = await Song.create({
        userId,
        title,
        description,
        url,
        imageUrl,
        albumId: albumId || null,
      });

      res.status(201).json({ newSong });
    } else {
      const err = new Error("Album with the specified albumId not found");
      err.title = "Album not found";
      err.errors = "Album not found";
      err.status = 404;
      next(err);
    }


    // const findAlbum = await Album.findByPk(albumId);
    
    // if (!albumId) {
    //     albumId = null;
    //      const newSong = await Song.create({
    //        userId,
    //        title,
    //        description,
    //        url,
    //        imageUrl,
    //        albumId,
    //      });
    //      res.status = 201;
    //      return res.json({ newSong });
    // }

    // if (findAlbum?.id === albumId) {
    //     const newSong = await Song.create({
    //         userId,
    //         title,
    //         description,
    //         url,
    //         imageUrl,
    //         albumId
    //     })
    //     res.status(201);
    //     return res.json({newSong});
    // }

    // const err = new Error(
    //   "Couldn't find an Album with the specified albumId if albumId is not null"
    // );
    // err.title = "Album couldn't be found";
    // err.errors = "Album couldn't be found";
    // err.status = 404;
    // return next(err);

});


// GET ALL SONGS
router.get( '/', async (req, res) => {
    const allSongs = await Song.findAll();
    
    // if (!allSongs) {
    //     err.status = 404;
    //     err.message = "No songs"
    // }

    return res.json({Songs: allSongs})
});


// GET ALL SONGS BY CURRENT USER
router.get('/current', requireAuth, async (req, res, next) => {

    const currentUser = req.user.id
    // console.log(currentUser)

    if (!currentUser) {
        const err = new Error('Must be logged in');
        err.title = 'Must be logged in';
        err.errors = 'Must be logged in'; 
        err.status = 401;
        return next(err);
    }

    const currentSongs = await Song.findAll({
        where: { userId: currentUser}
    })

    return res.json({Songs : currentSongs})

});

// GET DETAILS OF SONG FROM ID

router.get('/:songId', async (req, res, next) => {

    const songId = req.params.songId;
    // console.log(songId)

    if (!songId) {
        const err = new Error("Couldn't find a Song with the specified id");
        err.title = "Song couldn't be found";
        err.erros = "Song couldn't be found";
        err.status = 404;
        return next(err);
    }

    const songDetail = await Song.findOne({
        where : {id : songId}, 
        include : [{model : User, as : 'Artist'},
                   {model : Album, 
                   attributes : ['id', 'title', 'imageUrl'],
                }],
    })

    return res.json({Song : songDetail})
});




module.exports = router;