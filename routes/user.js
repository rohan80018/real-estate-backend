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
  .route("/allRequest/:type")
  .get(
      protect, 
      authorize("admin"), 
      // advancedResults(RequestModel),
      userController.getAllBuyOrSellRequests
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
  .route("/allrequests/:walletAddress")
  .get(
    protect,
    authorize("user", "admin"),
    advancedResults(RequestModel),
    userController.allRequestsOfUser
  );

router
.route("/acceptRequest/:requestId")
.put(protect, authorize("admin"), userController.acceptRequest);

router
.route("/acceptSellRequest/:requestId")
.put(protect, authorize("admin"), userController.acceptSellRequest);

router
.route("/rejectRequest/:requestId")
.put(protect, authorize("admin"), userController.rejectRequest);


router
.route("/payRent/:propertyId")
.put(
  protect,
  authorize("admin"),
  userController.payRent
);

router
.route("/whitelist/:userId")
.put(
  protect,
  authorize("admin"),
  userController.whitelistUser
);

router
  .route("/checkadmin/:walletAddress")
  .get(
    protect,
    authorize("user", "admin"),
    userController.checkAdmin
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
  .route("/userprofile/:userId")
  .get(
    protect,
    authorize("user", "admin"),
    userController.fetchUser
  );

  router
  .route("/allproperty/:userId")
  .get(
    protect,
    authorize("user", "admin"),
    userController.AllProperty
  );
  router
  .route("/checkusername")
  .post(
    protect,
    authorize("user", "admin"),
    userController.fetchUsername
  );

  router
  .route("/withdrawearning/:propertyId")
  .post(
    protect,
    authorize("user"),
    userController.withdrawEarning
  );

  router
  .route("/updateProfile")
  .put(protect, authorize("user"), userController.updateUser);

 


module.exports = router;