const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");
const advancedResults = require("../middlewares/advancedResults");
const UserModel = require("../models/User");

const { protect, authorize } = require("../middlewares/auth");
const validate = require("../middlewares/validateReqSchema");

const {
    userOnBoardReqSchema,
  } = require("../utils/validateReq");

router
.route("/onboard")
.post(
  protect,
  authorize("user"),
  validate(userOnBoardReqSchema),
  userController.onboardUser
);

router
.route("/payRent/:propertyId")
.post(
  protect,
  authorize("admin"),
  userController.payRent
);

router
  .route("/profile")
  .get(
    // protect,
    // authorize("user", "admin"),
    advancedResults(UserModel, "-signatureMessage -__v -termOfService"),
    userController.fetchUsers
  );

  router
  .route("/checkusername")
  .post(
    protect,
    authorize("user", "admin"),
    userController.fetchUsername
  );

  router
  .route("/withdrawearning")
  .get(
    // protect,
    authorize("user"),
    userController.withdrawEarning
  );

//   router
//   .route("/updateProfile/:wallet_address")
//   .put(protect, authorize("user"), userController.updateUser);


module.exports = router;