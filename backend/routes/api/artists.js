const express = require('express');
const router = express.Router();

const { Song, User } = require('../../db/models');



// Get All Songs of Artist from ID
router.get('/:artistId/songs', async (req, res, next) => {

    const artistId = req.params.artistId

    const users = await User.findByPk(artistId);

    if (!users) {
        const err = new Error("Couldn't find an Artist with the specified id")
        err.message = "Artist couldn't be found";
        err.errors = ["Couldn't find an Artist with the specified id"];
        err.status = 404;
        return next(err)
    }
    // console.log(users)

    const allArtistSongs = await Song.findAll({
        where : {userId : artistId},
    });

    res.status(200);
    return res.json({Songs : allArtistSongs});

});




module.exports = router;