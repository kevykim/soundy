const express = require("express");
const router = express.Router();
const { Song } = require('../../db/models/song')
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");




router.get( '/', async (req, res) => {

});


module.exports = router;