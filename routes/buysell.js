const express = require("express");
const router = express.Router();
const { protect, authorize } = require("../middlewares/auth");
const buysellController = require("../controllers/buySellController");


router
  .route("/acceptfromAconomy")
  .post(
    protect,
    authorize("admin"),
    buysellController.acceptfromAconomy
  );

router
  .route("/buyfromMarketPlace")
  .post(
    protect,
    authorize("user"),
    buysellController.buyfromMarketPlace
  );

router
  .route("/sell")
  .post(
    protect,
    authorize("user"),
    buysellController.sell
  );

router
  .route("/cancelSale")
  .post(
    protect,
    authorize("user"),
    buysellController.cancelSale
  );

module.exports = router;