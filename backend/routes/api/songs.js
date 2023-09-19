const express = require("express");
const router = express.Router();
const { Song } = require('../../db/models')
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const { requireAuth } = require('../../utils/auth')


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


module.exports = router;