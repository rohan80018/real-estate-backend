const express = require("express");
const router = express.Router();
const { protect, authorize } = require("../middlewares/auth");

const propertyController = require("../controllers/propertyController");

router
  .route("/")
  .post(
    protect,
    authorize("admin"),
    propertyController.createProperty
  );
module.exports = router;
