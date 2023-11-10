const PropertyModel = require("../models/Property");
const asyncHandler = require("../middlewares/async");

exports.createProperty = asyncHandler(async (req, res, next) => {
  try {
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


exports.getAllProperties = asyncHandler(async (req, res, next) => {
  try {
    res.status(200).json(res.advancedResults);
  } catch (err) {
    res.status(400).json({ success: false });
  }
});

exports.getProperty = asyncHandler(async (req, res, next) => {
  try {
    const { propertyId } = req.params;
    const property = await PropertyModel.findOne({
      _id : propertyId,
    });
    if (property) {
      res.status(201).json({
        success: true,
        massage: "Property exists",
        property: property,
      });
    } else {
      res.status(201).json({
        success: true,
        massage: "No Property Found",
      });
    }
  } catch (error) {
    console.log("Error: " + error)
    res.status(400).json({
      success: false,
    });
  }
});