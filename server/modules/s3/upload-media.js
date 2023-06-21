const multer = require("multer");
const mediaStorage = require("./media-storage");

const uploadMedia = multer({ storage: mediaStorage });

module.exports = uploadMedia;
