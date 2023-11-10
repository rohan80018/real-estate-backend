const asyncHandler = require("../middlewares/async");
const BuySellModel = require("../models/BuySell");

exports.buyfromAconomy = asyncHandler(async (req, res, next) => {
    const { id, wallet_address, role } = req.user;
    try {
        BuySellModel.create(
            {
                ...req.body,
                buyer : id,
            },
            async (err, doc) => {
                if (err) {
                console.log("erroree: " + err);
                res.status(401).json({ success: false });
                } else {
                if (!!doc) {
                    res.status(201).json({
                    success: true,
                    _id: doc._id,
                    message: "Bought successfully",
                    });
                } else {
                    res
                    .status(400)
                    .json({ success: false, message: "Failed to buy property" });
                }
                }
            }
            );
    } catch (err) {
            console.log("erroree: " + err);
            res
            .status(401)
            .json({ success: false, message: "Failed to buy property" });
            
    }
        
});

exports.buyfromMarketPlace = asyncHandler(async (req, res, next) => {
    const { id, wallet_address, role } = req.user;
    const { buySellId } = req.params;
    try {
        BuySellModel.findOneAndUpdate(
            {_id : buySellId},
            {
              buyer: id,
              status: "accepted",
            },
            { new: true },
            async (err, doc) => {
              if (err) {
                console.log("erroree: " + err);
                res.status(401).json({ success: false });
              } else {
                if (!!doc) {
                  res.status(201).json({
                    success: true,
                    _id: doc._id,
                    message: "Bought successfully",
                  });
                } else {
                  res
                    .status(400)
                    .json({ success: false, message: "Failed to buy property" });
                }
              }
            }
          );
    } catch (err) {
          console.log("erroree: " + err);
          res
            .status(401)
            .json({ success: false, message: "Failed to buy property" });
    }
});

exports.sell = asyncHandler(async (req, res, next) => {
    // const { id, wallet_address, role } = req.user;
    try {
        BuySellModel.create(
            {
              ...req.body,
              // seller: id,
            },
            async (err, doc) => {
              if (err) {
                console.log("erroree: " + err);
                res.status(401).json({ success: false });
              } else {
                if (!!doc) {
                  res.status(201).json({
                    success: true,
                    _id: doc._id,
                    message: "Listed for sale successfully",
                  });
                } else {
                  res
                    .status(400)
                    .json({ success: false, message: "Failed to list property" });
                }
              }
            }
          );
    } catch (err) {
          console.log("erroree: " + err);
          res
            .status(401)
            .json({ success: false, message: "Failed to list property" });
    }
});

exports.cancelSale = asyncHandler(async (req, res, next) => {
    const { buySellId } = req.params;
    try {
        BuySellModel.findOneAndUpdate(
            {_id : buySellId},
            {      
              status: "cancel",
            },
            { new: true },
            async (err, doc) => {
              if (err) {
                console.log("erroree: " + err);
                res.status(401).json({ success: false });
              } else {
                if (!!doc) {
                  res.status(201).json({
                    success: true,
                    _id: doc._id,
                    message: "Cancelled successfully",
                  });
                } else {
                  res
                    .status(400)
                    .json({ success: false, message: "Failed to cancel" });
                }
              }
            }
          );
    } catch (err) {
          console.log("erroree: " + err);
          res
            .status(401)
            .json({ success: false, message: "Failed to cancel" });       
    }
});