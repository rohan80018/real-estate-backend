const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");

const { protect, authorize } = require("../middlewares/auth");

const {
    userOnBoardReqSchema,
  } = require("../utils/validateReq");

// router
// .route("/onboard")
// .post(
//   protect,
//   authorize("user"),
//   validate(userOnBoardReqSchema),
//   userController.onboardUser
// );

// router
// .route("/payRent")
// .post(
//   protect,
//   authorize("admin"),
//   userController.payRent
// );

// router
//   .route("/profile")
//   .get(
//     protect,
//     authorize("user", "admin"),
//     advancedResults(UserModel, "-signatureMessage -__v -termOfService"),
//     userController.fetchUsers
//   );

  router
  .route("/checkusername")
  .get(
    // protect,
    // authorize("user", "admin"),
    userController.fetchUsername
  );

  router
  .route("/withdrawearning")
  .get(
    // protect,
    authorize("user"),
    userController.withdrawEarning
  );


module.exports = router;