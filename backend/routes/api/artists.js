const express = require('express');
const router = express.Router();

const { Song, User, Playlist, Album } = require('../../db/models');



// GET details of an Artist from ID
router.get('/:username', async (req, res, next) => {

    const username = req.params.username

    
    // const artistId = req.params.artistId;
    
    let users = await User.findOne({where : { username : username}});

    console.log(users.id)

     if (!users) {
       const err = new Error("Couldn't find an Artist with the specified id");
       err.message = "Artist couldn't be found";
       err.errors = ["Couldn't find an Artist with the specified id"];
       err.status = 404;
       return next(err);
     }

    //  users = users.toJSON();
    //  users.totalSongs = await Song.count({ where: { username : username } });
    //  users.totalAlbums = await Album.count({ where: { username : username } });

     res.status(200);
     return res.json(users)

});


// Get All Songs of Artist from ID
router.get('/:username/songs', async (req, res, next) => {

    // const artistId = req.params.artistId

    const username = req.params.username;


    const users = await User.findOne({ where: { username: username } });

    if (!users) {
        const err = new Error("Couldn't find an Artist with the specified id")
        err.message = "Artist couldn't be found";
        err.errors = ["Couldn't find an Artist with the specified id"];
        err.status = 404;
        return next(err)
    }


    const allArtistSongs = await Song.findAll({
        where : {userId : users.id},
    });

    res.status(200);
    return res.json(allArtistSongs);

});

// GET all playlists of an Artist from ID
router.get('/:artistId/playlists', async (req, res, next) => {

    // const artistId = req.params.artistId;

    const username = req.params.username;

    const users = await User.findOne({ where: { username: username } });

     if (!users) {
       const err = new Error("Couldn't find an Artist with the specified id");
       err.message = "Artist couldn't be found";
       err.errors = ["Couldn't find an Artist with the specified id"];
       err.status = 404;
       return next(err);
     }

     const allArtistPlaylists = await Playlist.findAll({
       where: { userId: users.id },
     });

    //  console.log(allArtistPlaylists)
     res.status(200);
     return res.json({ Playlists: allArtistPlaylists });

})


//GET all Albums of Artist ID
router.get('/:artistId/albums', async (req, res, next) => {

    //  const artistId = req.params.artistId;

    const username = req.params.username;

    const users = await User.findOne({ where: { username: username } });

     if (!users) {
       const err = new Error("Couldn't find an Artist with the specified id");
       err.message = "Artist couldn't be found";
       err.errors = ["Couldn't find an Artist with the specified id"];
       err.status = 404;
       return next(err);
     }

     const allArtistAlbums = await Album.findAll({
       where: { userId: users.id },
     });

     res.status(200);
     return res.json({ Albums: allArtistAlbums });
});



module.exports = router;