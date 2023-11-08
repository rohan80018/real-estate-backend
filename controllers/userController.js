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
        $inc : { totalRentPaid : rentReceived, rentInstallment : 1},
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
            res
              .status(400)
              .json({ success: false, message: "Failed" });
          }
        }
      }
    );
  } catch (err) {
    res
      .status(401)
      .json({ success: false, message: "Failed to pay rent" });
  }
});

exports.fetchUsers = asyncHandler(async (req, res, next) => {
  try {
    res.status(200).json(res.advancedResults);
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
        user: user,
      });
    } else {
      res.status(201).json({
        success: true,
        massage: "No user",
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
        const { requestId } = req.params;
        RequestModel.findOneAndUpdate(
          {
            _id: requestId,
          },
          {
            withdrawnAmount: grossRent,
            withdrawnInstallment: rentReceived,
            $inc : { totalRentPaid : rentReceived, rentInstallment : 1},
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
                res
                  .status(400)
                  .json({ success: false, message: "Failed" });
              }
            }
          }
        );
      } catch (err) {
        res
          .status(401)
          .json({ success: false, message: "Failed to pay rent" });
      }
});


// exports.updateUser = asyncHandler(async (req, res, next) => {
//     try {
//       const remoteIp = getRemoteIp(req);
//       const { wallet_address } = req.params;
//       const { role } = req.user;
//       UserModel.findOneAndUpdate(
//         { wallet_address },
//         { ...req.body },
//         { new: true },
//         async (err, doc) => {
//           if (err) {
//             res
//               .status(400)
//               .json({ success: false, message: "Profile failed to update" });
//           } else {
//             if (!!doc) {
//               await mixpanel.people(doc._id, {
//                 name: doc.name,
//                 user_name: doc.username,
//                 wallet_address: doc.wallet_address,
//                 email: !!doc.email ? doc.email : "",
//                 profile_type: role,
//                 ip: remoteIp,
//               });
//               await mixpanel.track("User profile updated", {
//                 distinct_id: doc._id,
//                 name: doc.name,
//                 user_name: doc.username,
//                 wallet_address: doc.wallet_address,
//                 email: !!doc.email ? doc.email : "",
//                 profile_type: role,
//                 ip: remoteIp,
//               });
//               res
//                 .status(201)
//                 .json({ success: true, message: "Profile successfully updated" });
//             } else {
//               res
//                 .status(400)
//                 .json({ success: false, message: "Wrong wallet address" });
//             }
//           }
//         }
//       );
//     } catch (err) {
//       res
//         .status(400)
//         .json({ success: false, message: "Profile failed to update" });
//     }
//   });
  
