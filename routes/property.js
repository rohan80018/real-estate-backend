const express = require("express");
const router = express.Router();
const { protect, authorize } = require("../middlewares/auth");

const propertyController = require("../controllers/propertyController");

router
  .route("/")
  .post(
    protect,
    authorize("admin"),
    // validate(nftCreateReqSchema),
    propertyController.createNft
  );
module.exports = router;
