const multer = require("multer");
const aws = require("aws-sdk");
const multerS3 = require("multer-s3");
const path = require("path");
const config = require("../config");

const s3 = new aws.S3({
  accessKeyId: config.awsAccessKey,
  secretAccessKey: config.awsSecret,
  Bucket: "cluewords",
});

const uploadImage = multer({
  storage: multerS3({
    s3: s3,
    bucket: "cluewords",
    acl: "public-read",
    key: function (req, file, cb) {
      cb(
        null,
        path.basename(file.originalname, path.extname(file.originalname)) +
          "-" +
          Date.now() +
          path.extname(file.originalname),
      );
    },
  }),
}).single("profileImage");

module.exports = uploadImage;
