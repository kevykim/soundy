
const router = require('express').Router();
const sessionRouter = require("./session.js");
const usersRouter = require("./users.js");
const songRouter = require("./songs.js");
const artistRouter = require('./artists.js');
const playlistRouter = require('./playlists.js');
const commentRouter = require('./comments.js')
const albumRouter = require('./albums.js');

const { restoreUser } = require("../../utils/auth.js");





router.use(restoreUser);

router.use("/session", sessionRouter);

router.use("/users", usersRouter);

router.use("/songs", songRouter);

router.use("/artists", artistRouter);

router.use("/playlists", playlistRouter);

router.use("/comments", commentRouter);

router.use("/albums", albumRouter);


// router.post("/test", (req, res) => {
//   res.json({ requestBody: req.body });
// });


module.exports = router;
