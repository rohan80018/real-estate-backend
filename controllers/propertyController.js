const PropertyModel = require("../models/Property");
const asyncHandler = require("../middlewares/async");

exports.createProperty = asyncHandler(async (req, res, next) => {
  try {
    //   const { id, wallet_address, role } = req.user;
    PropertyModel.create(
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
              message: "Property successfully created",
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
      .status(401)
      .json({ success: false, message: "Failed to create property" });
  }
});
