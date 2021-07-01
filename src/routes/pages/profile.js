const express = require("express");
const router = express.Router();
const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './src/public/img/users/')
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString().replace(/:/g, '-') + '.jpg')
    }
})
var upload = multer({ storage: storage })


const DetailuserController = require("../../app/controllers/pages/DetailuserController");

router.get("/", DetailuserController.index);
router.get("/", DetailuserController.notfoud);
router.post('/changeAvatar', upload.single('avatar'), DetailuserController.changeAvatar)

module.exports = router;
