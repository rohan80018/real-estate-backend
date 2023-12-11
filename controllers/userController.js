const UserModel = require("../models/User");
const RequestModel = require("../models/Request");
const PropertyModel = require("../models/Property");
const asyncHandler = require("../middlewares/async");
const crypto = require("crypto");
const { ethers } = require("ethers");
const jwt = require("jsonwebtoken");

const { getRemoteIp } = require("../utils/utils");

exports.onboardUser = asyncHandler(async (req, res, next) => {
  try {

    const { username, email } = req.body;
    const user = await UserModel.findOne({
      wallet_address: req.user.wallet_address,
    });
    if (user) {
      if (user.username == username || user.email == email) {
        res.status(201).json({
          success: true,
          message: "username or email already in use",
        });
      }
      else{
        UserModel.findOneAndUpdate(
            { wallet_address: req.user.wallet_address },
            { ...req.body },
            { new: true },
            async (err, docs) => {
              if (err) {
                res.status(400).json({ success: false });
              } else {
                res.status(200).json({ success: true });
              }
            }
        );
      }
    } else {
      res.status(201).json({
        success: true,
        message: "No user",
      });
    }
  } catch (err) {
    res.status(400).json({ success: false });
  }
});

exports.payRent = asyncHandler(async (req, res, next) => {
  try {
    const { grossRent, rentReceived } = req.body;
    const { propertyId } = req.params;
    PropertyModel.findOneAndUpdate(
      {
        _id: propertyId,
      },
      {
        grossRent: grossRent,
        rentReceived: rentReceived,
        $inc: { totalRentPaid: rentReceived, rentInstallment: 1 },
        $push: {
          rentHistory: {
            amount: rentReceived,
          },
        },
      },
      null,
      async (err, doc) => {
        if (err) {
          res.status(401).json({ success: false });
        } else {
          if (!!doc) {
            res.status(201).json({
              success: true,
              _id: doc._id,
              message: "Rent Paid successfully",
            });
          } else {
            res.status(400).json({ success: false, message: "Failed" });
          }
        }
      }
    );
  } catch (err) {
    res.status(401).json({ success: false, message: "Failed to pay rent" });
  }
});

exports.fetchUsers = asyncHandler(async (req, res, next) => {
  try {
    res.status(200).json(res.advancedResults);
  } catch (err) {
    res.status(400).json({ success: false });
  }
});

exports.fetchUser = asyncHandler(async (req, res, next) => {
  const { userId } = req.params;
  try {
    const user = await UserModel.findOne({
      _id : userId,
    });
    if (user) {
      res.status(201).json({
        success: true,
        message: "user data",
        user: user,
      });
    } else {
      res.status(201).json({
        success: true,
        message: "No user",
      });
    }
  } catch (err) {
    res.status(400).json({ success: false });
  }
});


exports.AllProperty = asyncHandler(async (req, res, next) => {
  const { userId } = req.params;
  try {
    const user = await UserModel.find({
      _id : userId,
    });
    if (user) {
      res.status(201).json({
        success: true,
        message: "user data",
        user: user.property,
      });
    } else {
      res.status(201).json({
        success: true,
        message: "No properties found",
      });
    }
  } catch (err) {
    res.status(400).json({ success: false });
  }
});

exports.fetchUsername = asyncHandler(async (req, res, next) => {
  try {
    const { username } = req.body;
    const user = await UserModel.findOne({
      username,
    });
    if (user) {
      res.status(201).json({
        success: true,
        message: "user exists",
        user: user,
      });
    } else {
      res.status(201).json({
        success: true,
        message: "No user",
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
    });
  }
});

exports.withdrawEarning = asyncHandler(async (req, res, next) => {
  try {
    const { withdrawnAmount, withdrawnInstallment } = req.body;
    const { propertyId } = req.params;
    const { wallet_address } = req.user;

    let userData = await UserModel.findOneAndUpdate(
      { wallet_address },
      {
        $push: {
          withdrawnHistory: {
            property: propertyId,
            amount: withdrawnAmount,
            withdrawnInstallment: withdrawnInstallment,
          },
        },
      }
    )
    if (userData) {
      let propertyData = await PropertyModel.findOneAndUpdate(
        { _id: propertyId },
        {
          $push: {
            withdrawHistory: {
              user: userData._id,
              amount: withdrawnAmount,
              withdrawnInstallment: withdrawnInstallment,
            },
          },
        }
      );
      if (propertyData) {
        res.status(201).json({
          success: true,
          _id: propertyId,
          message: "Withdrawn",
        });
      } else {
        res.status(400).json({
          success: false,
          message: "property not updated",
        });
      }
    } else {
      res
        .status(400)
        .json({ success: false, message: "userData not updated" });
    }
  } catch (err) {
    res.status(401).json({ success: false, message: "Failed to withdraw" });
  }
});

exports.updateUser = asyncHandler(async (req, res, next) => {
  try {
    const { wallet_address } = req.user;
    const { username, email } = req.body;
      //check duplicate username
      const user_1 = await UserModel.findOne({
          username,
          wallet_address: {$ne: wallet_address}
      });
      if (user_1) {
        res.status(201).json({
          success: true,
          message: "user with duplicate username exists",
          user: user_1,
        });
      }
      else{
        //check duplicate email
        const user_2 = await UserModel.findOne({
          email,
          wallet_address: {$ne: wallet_address}
        });
        if (user_2) {
          res.status(201).json({
            success: true,
            message: "user with same email address exists",
            user: user_2,
          });
        }
        else {
          UserModel.findOneAndUpdate(
            { wallet_address },
            { ...req.body },
            { new: true },
            async (err, doc) => {
              if (err) {
                res
                  .status(400)
                  .json({ success: false, message: "Profile failed to update", error: {err} });
              } else {
                if (!!doc) {
                  res
                    .status(201)
                    .json({ success: true, message: "Profile successfully updated" });
                } else {
                  res
                    .status(400)
                    .json({ success: false, message: "Wrong wallet address" });
                }
              }
            }
          );
        }
      }
    }
  catch (err) {
    res
      .status(400)
      .json({ success: false, message: "Profile failed to update" });
  }
});

exports.buyRequest = asyncHandler(async (req, res, next) => {
  try {
    RequestModel.create(
      {
        ...req.body,
      },
      async (err, doc) => {
        if (err) {
          res.status(401).json({ success: false });
        } else {
          if (!!doc) {
            res.status(201).json({
              success: true,
              _id: doc._id,
              message: "Request successfully created",
            });
          } else {
            res
              .status(400)
              .json({ success: false, message: "Failed to create property" });
          }
        }
      }
    );
  } catch (err) {
    res
      .status(400)
      .json({ success: false, message: "Profile failed to update" });
  }
});

exports.getAllRequests = asyncHandler(async (req, res, next) => {
  try {
    res.status(200).json(res.advancedResults);
  } catch (err) {
    res.status(400).json({ success: false });
  }
});

exports.getRequest = asyncHandler(async (req, res, next) => {
  try {
    const { requestId } = req.params;
    const request = await RequestModel.findOne({
      _id : requestId,
    });
    if (request) {
      res.status(201).json({
        success: true,
        message: "Request exists",
        request: request,
      });
    } else {
      res.status(201).json({
        success: true,
        message: "No Request Found",
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
    });
  }
});


exports.allRequestsOfUser = asyncHandler(async (req, res, next) => {
  try {
    const { walletAddress } = req.params;
    const request = await RequestModel.findOne({
      walletAddress : walletAddress,
    });
    if (request) {
      res.status(201).json({
        success: true,
        message: "Request exists",
        request: request,
      });
    } else {
      res.status(201).json({
        success: true,
        message: "No Request Found",
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
    });
  }
});

exports.acceptRequest = asyncHandler(async (req, res, next) => {
  try {
    const { requestId } = req.params;
    RequestModel.findOneAndUpdate(
      { _id: requestId },
      { status: "accepted" },
      { new: true },
      async (err, doc) => {
        if (err) {
          res
            .status(400)
            .json({ success: false, message: "Profile failed to update" });
        } else {
          if (!!doc) {
            let userData = await UserModel.findOneAndUpdate(
              { _id : doc.user },
              { 
                whitelisted: true,
                property: doc.property,
              }
            );
            if (userData) {
              res
                .status(201)
                .json({
                  success: true,
                  message: "Request Accepted successfully",
                });
            }
          } else {
            res
              .status(400)
              .json({ success: false, message: "Wrong wallet address" });
          }
        }
      }
    );
  } catch (err) {
    res
      .status(400)
      .json({ success: false, message: "Profile failed to update" });
  }
});
