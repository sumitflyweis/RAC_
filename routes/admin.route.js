const auth = require("../controllers/admin.controller");
const { authJwt } = require("../middlewares");
var multer = require("multer");
const path = require("path");
const express = require("express");
const router = express()
router.post("/registration", auth.registration);
router.post("/login", auth.signin);
router.put("/update", [authJwt.verifyToken], auth.update);
router.post("/Category/addCategory", [authJwt.verifyToken], auth.createCategory);
router.get("/Category/allCategory", auth.getCategories);
router.put("/Category/updateCategory/:id", [authJwt.verifyToken], auth.updateCategory);
router.delete("/Category/deleteCategory/:id", [authJwt.verifyToken], auth.removeCategory);
router.post("/SubCategory/addSubCategory", [authJwt.verifyToken], auth.createSubCategory);
router.get("/SubCategory/allSubCategory", auth.getSubCategories);
router.put("/SubCategory/updateSubCategory/:id", [authJwt.verifyToken], auth.updateSubCategory);
router.delete("/SubCategory/deleteSubCategory/:id", [authJwt.verifyToken], auth.removeSubCategory);
module.exports = router;