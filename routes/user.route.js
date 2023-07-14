const express = require("express");
const router = express()
const { validateUser } = require("../middlewares");
const auth = require("../controllers/user.controller");
const { authJwt, authorizeRoles } = require("../middlewares");

const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;

// configure Cloudinary credentials
cloudinary.config({
  cloud_name: "dbrvq9uxa",
  api_key: "567113285751718",
  api_secret: "rjTsz9ksqzlDtsrlOPcTs_-QtW4",
});

// configure multer to use Cloudinary as storage destination
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "images/image", // optional folder name in your Cloudinary account
    allowed_formats: ["jpg", "jpeg", "png", "PNG", "xlsx", "xls","pdf","PDF"], // allowed file formats
  },
});

// create multer instance with storage configuration
const upload = multer({ storage: storage });

router.post("/registration", auth.registration);
router.post("/loginWithPhone", auth.loginWithPhone);
router.post("/:id", auth.verifyOtp);
router.post("/resendOtp/:id", auth.resendOTP);
router.get("/getProfile", [authJwt.verifyToken], auth.getProfile);
router.put("/updateLocation", [authJwt.verifyToken], auth.updateLocation);
router.put("/editProfile", [authJwt.verifyToken], auth.editProfile);
router.put("/uploadSelfie/:id", upload.single('file'), auth.uploadSelfie)


module.exports = router;