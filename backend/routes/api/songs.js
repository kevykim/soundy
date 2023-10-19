const express = require("express");
const router = express.Router();
const { Song, User, Album, Comment } = require('../../db/models')
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const { requireAuth } = require('../../utils/auth');
const {Op} = require('sequelize')


const validateSong = [
check("title")
    .exists({checkFalsy: true})
    .withMessage('Song title is required'),
check("url")
    .exists({checkFalsy: true})
    .withMessage('Audio is required'),
handleValidationErrors,
];

const validateComment = [
check("body")
    .exists({checkFalsy: true})
    .withMessage("Comment body text is required"),
    handleValidationErrors
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
        imageUrl : imageUrl || 'https://cdn2.iconfinder.com/data/icons/picol-vector/32/document_music_information-512.png',
        albumId: albumId || null,
      });

      res.status(201).json( newSong );
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


// CREATE comment for song based on song ID
router.post('/:songId/comments', requireAuth, validateComment, async (req, res, next) => {

    const songId = req.params.songId;
    const { body } = req.body;

    const findSong = await Song.findByPk( songId, {
             where : {userId : req.user.id}
    })

    const realSongId = Number(songId)
    
    if (findSong) {
        const newComment = await Comment.create({
            userId : req.user.id,
            songId : realSongId,
            body
        })
        res.status(200)
        return res.json(newComment)
    } else {
        const err = new Error("Couldn't find a Song with the specified id");
        err.title = "Song couldn't be found";
        err.errors = "Song couldn't be found";
        err.status = 404;
        return next(err)
    }





});



// GET all COMMENTS by SONG ID
router.get('/:songId/comments', async (req, res, next) => {

    const songId = req.params.songId;

    const allComments = await Comment.findAll({
        where : {
            songId : songId
        },
        include : [
            {model: User, attributes : ['id', 'username']}
        ]
    });



    if (!allComments || allComments.length === 0) {
        const err = new Error("Couldn't find a Song with the specified id");
        err.title = "Song couldn't be found";
        err.errors = "Song couldn't be found";
        err.status = 404;
        return next(err)
    }

    res.status(200);
    return res.json(allComments);

});



// GET ALL SONGS
router.get( '/', async (req, res) => {
    const allSongs = await Song.findAll({
        include : [
            {model : User, as : 'Artist'}
        ]
    });
    
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

    return res.json(currentSongs)

});

// GET DETAILS OF SONG FROM ID

router.get('/:songId', async (req, res, next) => {

    const songId = req.params.songId;
    // console.log(songId)

    if (!songId) {
        const err = new Error("Couldn't find a Song with the specified id");
        err.title = "Song couldn't be found";
        err.errors = "Song couldn't be found";
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

    return res.json(songDetail)
});



// EDIT A SONG
router.put('/:songId', requireAuth, validateSong, async (req, res, next) => {

    let {title, description, url, imageUrl, albumId} = req.body;
    const songId = req.params.songId;

    const editSong = await Song.findOne({
        where : {
            [Op.and] : [
                {userId : req.user.id},
                {id : songId}
            ]
        }
    })

    if (!editSong) {

        const err = new Error("Couldn't find a Song with the specified id");
        err.title = "Song couldn't be found";
        err.errors = "Song couldn't be found";
        err.status = 404;
        return next(err);

    }

    await editSong.update({
        title,
        description,
        url,
        imageUrl : imageUrl || "imagereplace.com",
        albumId : albumId || null
    })

    res.status(200);
    return res.json({editSong});

});



// DELETE A SONG
router.delete('/:songId', requireAuth, async (req, res, next) => {
    const songId = req.params.songId;
    const userId = req.user.id



    const deleteSong = await Song.findByPk(songId);

    if (!deleteSong) {
        const err = new Error("Song couldn't be found")
        err.title = "Song couldn't be found"
        err.message = "Song couldn't be found"
        err.statusCode = 404
        err.status = 404;
        return next(err);
    }

    // console.log(deleteSong.userId)


    if(deleteSong.userId !== userId) {
        const err = new Error("Song must belong to the current user");
        err.title = "Song must belong to the current user";
        err.status = 403
        return next(err)
    }
    
    await deleteSong.destroy();
    res.status(200);
    return res.json({
        message: "Successfully deleted",
        statusCode: 200
    })

});



module.exports = router;