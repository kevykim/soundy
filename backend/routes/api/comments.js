const express = require("express");
const router = express.Router();

const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const { requireAuth } = require("../../utils/auth");
const { Op } = require("sequelize");

const { Song, User, Comment, Playlist, PlaylistSong } = require("../../db/models");


const validateComment = [
  check("body")
    .exists({ checkFalsy: true })
    .withMessage("Comment body text is required"),
  handleValidationErrors,
];  

// EDIT a comment
router.put('/:commentId', requireAuth, validateComment, async (req, res, next) => {

    const { body } = req.body;
    const commentId = req.params.commentId;

    const findComment = await Comment.findOne({
         where : {
            [Op.and] : [
                {userId : req.user.id},
                {id : commentId}
            ]
        }
    });


    if (findComment) {
         await findComment.update({
            body
        });

        res.status(200);
        return res.json(findComment);
    } else {
        const err = new Error("Couldn't find a Comment with the specified id");
        err.title = "Comment couldn't be found";
        err.errors = "Comment couldn't be found";
        err.status = 404;
        return next(err);
    }



});



// DELETE a COMMENT
router.delete('/:commentId', requireAuth, async (req, res, next) => {

    const userId = req.user.id;
    const commentId = req.params.commentId;

    const deleteComment = await Comment.findOne({
         where : {
            [Op.and] : [
                {id : commentId},
                {userId : userId}
            ]
        }
    });

    if (deleteComment) {
        await deleteComment.destroy();

        res.status(200);
        return res.json({
            message : "Successfully deleted",
            statusCode : 200
        });
    } else {
        const err = new Error("Couldn't find a Comment with the specified id");
        err.title = "Comment couldn't be found";
        err.errors = "Comment couldn't be found";
        err.status = 404;
        return next(err)
    }

});














module.exports = router;