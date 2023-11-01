const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const { requireAuth } = require("../../utils/auth");
const { Op } = require("sequelize");

const { Song, User, Playlist, PlaylistSong } = require("../../db/models");


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



// Add a song to playlist based on Playlist's id
router.post('/:playlistId/songs', requireAuth, async (req, res, next) => {

    const {songId} = req.body;

    const playlistId = req.params.playlistId;
    const userId = req.user.id;


    const findPlaylist = await Playlist.findByPk(playlistId);
    const findSong = await Song.findByPk(songId);

    if (!findPlaylist) {
      const err = new Error("Couldn't find a Playlist with the specified id");
      err.title = "Playlist couldn't be found";
      err.errors = "Playlist couldn't be found";
      err.status = 404;
      return next(err);
    }

    if (!findSong) {
      const err = new Error("Couldn't find a Song with the specified id");
      err.title = "Song couldn't be found";
      err.errors = "Song couldn't be found";
      err.status = 404;
      return next(err);
    }

    const addToPlaylist = await PlaylistSong.create({
        playlistId : playlistId,
        songId,
    });
    
    if (findPlaylist.userId === userId) {
        res.status(200);
        return res.json(addToPlaylist)
    } else {
        const err = new Error("Must be owner of Playlist")
        err.title = 'Must be owner'
        err.errors = "Must be owner"
        err.status = 403;
        return next(err)
    }
});


// GET all PLAYLISTS
router.get('/', async (req, res, next) => {

    const findPlaylist = await Playlist.findAll({
      include: [
        { model: User },
        { model: Song, through: { attributes: [] } }
      ],
    });

    res.status(200);
    return res.json(findPlaylist);

}); 


// GET all playlists created by current user
router.get('/current', requireAuth, async (req, res, next) => {

    const currentUser = req.user.id;



    const currentPlaylist = await Playlist.findAll({
        where : { userId : currentUser}
    });


    if (!currentPlaylist) {
     const err = new Error("Must be owner of Playlist");
     err.title = "Must be owner";
     err.errors = "Must be owner";
     err.status = 403;
     return next(err);
    }

    res.status(200);
    return res.json(currentPlaylist);

});



// GET details of playlist from ID
router.get('/:playlistId', async (req, res, next) => {

    const playlistId = req.params.playlistId;

    const playlistDetails = await Playlist.findOne({
        where : {id : playlistId},
        include : [{model : Song, 
                through : {attributes : []}
                }]
    })

    if (!playlistDetails) {
        const err = new Error("Couldn't find a Playlist with the specified id");
        err.title = "Playlist couldn't be found";
        err.errors = "Playlist couldn't be found";
        err.status = 404;
        return next(err);
    }

    res.status(200)
    return res.json(playlistDetails);

});



// EDIT a Playlist
router.put('/:playlistId', requireAuth, playlistValidation, async (req, res, next) => {

    const {name, imageUrl} = req.body;
    const playlistId = req.params.playlistId;
    const userId = req.user.id;

    const findPlaylist = await Playlist.findOne({
        where : {
            [Op.and] : [
                {userId : userId},
                {id : playlistId}
            ]
        }

    });

    if (!findPlaylist) {
        const err = new Error("Couldn't find a Playlist with the specified id");
        err.title = "Playlist couldn't be found";
        err.errors = "Playlist couldn't be found";
        err.status = 404;
        return next(err);
    };
    
    const editPlaylist = await findPlaylist.update({
            name,
            imageUrl : imageUrl || 'imagereplace.com'
    });

    res.status(200);
    return res.json(editPlaylist)



}); 



// DELETE a Playlist
router.delete('/:playlistId', requireAuth, async (req, res, next) => {

    const userId = req.user.id;
    const playlistId = req.params.playlistId;


    const deletePlaylist = await Playlist.findOne({
        where : {
            [Op.and] : [
                {id : playlistId},
                {userId : userId}
            ]
        }
    });

    if (!deletePlaylist) {
        const err = new Error("Couldn't find a Playlist with the specified id");
        err.title = "Playlist couldn't be found";
        err.errors = "Playlist couldn't be found";
        err.status = 404;
        return next(err);
    };


    await deletePlaylist.destroy();

    res.status(200);
    return res.json({
      message: "Successfully deleted",
      statusCode: 200,
    });

});







module.exports = router;