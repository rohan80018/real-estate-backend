const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");
const advancedResults = require("../middlewares/advancedResults");
const UserModel = require("../models/User");
const RequestModel = require("../models/Request");
const PropertyModel = require("../models/Property");

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
.route("/buyRequest")
.post(protect, authorize("user"), userController.buyRequest);

router
.route("/allRequests")
.get(
    protect, 
    authorize("user", "admin"), 
    advancedResults(RequestModel),
    userController.getAllRequests
  );

  router
.route("/request/:requestId")
.get(
    protect, 
    authorize("user", "admin"), 
    advancedResults(RequestModel),
    userController.getRequest
  );

router
.route("/acceptRequest/:requestId")
.put(protect, authorize("admin"), userController.acceptRequest);

router
.route("/payRent/:propertyId")
.put(
  protect,
  authorize("admin"),
  userController.payRent
);

router
  .route("/profile")
  .get(
    protect,
    authorize("user", "admin"),
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
  .route("/withdrawearning/:requestId")
  .post(
    protect,
    authorize("user"),
    userController.withdrawEarning
  );

  router
  .route("/updateProfile")
  .put(protect, authorize("user"), userController.updateUser);

 


module.exports = router;