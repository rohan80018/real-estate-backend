const UserModel = require("../models/User");
const asyncHandler = require("../middlewares/async");
const crypto = require("crypto");
const { ethers } = require("ethers");
const jwt = require("jsonwebtoken");

const mixpanel = require("../services/mixpanel");
const { getRemoteIp } = require("../utils/utils");


// exports.onboardUser = asyncHandler(async (req, res, next) => {
//     try {
//       const remoteIp = getRemoteIp(req);
//       UserModel.findOneAndUpdate(
//         { wallet_address: req.user.wallet_address },
//         { ...req.body },
//         { new: true },
//         async (err, docs) => {
//           if (err) {
//             res.status(400).json({ success: false });
//           } else {
//             await mixpanel.people(docs._id, {
//               name: docs.name,
//               username: docs.username,
//               wallet_address: docs.wallet_address,
//               role: docs.role,
//               ip: remoteIp,
//             });
//             await mixpanel.track("User onboard", {
//               distinct_id: docs._id,
//               name: docs.name,
//               username: docs.username,
//               wallet_address: docs.wallet_address,
//               role: docs.role,
//               ip: remoteIp,
//             });
//             res.status(200).json({ success: true });
//           }
//         }
//       );
//     } catch (err) {
//       res.status(400).json({ success: false });
//     }
//   });

//   exports.payRent = asyncHandler(async (req, res, next) => {
//     try {
//       //   const { id, wallet_address, role } = req.user;
//       PropertyModel.create(
//         {
//           ...req.body,
//         },
//         async (err, doc) => {
//           if (err) {
//             res.status(401).json({ success: false });
//           } else {
//             if (!!doc) {
//               res.status(201).json({
//                 success: true,
//                 _id: doc._id,
//                 message: "Property successfully created",
//               });
//             } else {
//               res
//                 .status(400)
//                 .json({ success: false, message: "Failed to create property" });
//             }
//           }
//         }
//       );
//     } catch (err) {
//       res
//         .status(401)
//         .json({ success: false, message: "Failed to create property" });
//     }
//   });
  

  exports.fetchUsers = asyncHandler(async (req, res, next) => {
    try {
      res.status(200).json(res.advancedResults);
    } catch (err) {
      res.status(400).json({ success: false });
    }
  });

  exports.fetchUsername = asyncHandler(async (req, res, next) => {
    try {
        const { username } = req.params;
        const user = await UserModel.findOne({
            username,
          });
        if(user) {
            res.status(201).json({
                success: true,
                user: user,
            });
        }
        else{
            res.status(201).json({
                success: true,
                massage: "No user",
                user: user,
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
        const { username } = req.params;
        const user = await UserModel.findOne({
            username,
          });
        if(user) {
            res.status(201).json({
                success: true,
                user: user,
            });
        }
        else{
            res.status(201).json({
                success: true,
                massage: "No user",
                user: user,
            });
        }

    } catch (error) {
        res.status(400).json({
            success: false,
        });
    }
  });