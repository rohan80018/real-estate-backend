const asyncHandler = require("../middlewares/async");
const BuySellModel = require("../models/BuySell");

exports.acceptfromAconomy = asyncHandler(async (req, res, next) => {
    const { id } = req.user;
    const { saleId } = req.body;
    try {
        BuySellModel.findOneAndUpdate(
          {_saleId : saleId},
          {
            buyer: id,
            status: "accepted",
          },
          { new: true },
          async (err, doc) => {
            if (err) {
              console.log("error: " + err);
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
            res
            .status(401)
            .json({ success: false, message: "Failed to buy property" });
            
    }
        
});

exports.buyfromMarketPlace = asyncHandler(async (req, res, next) => {
    const { id, whitelisted } = req.user;
    const { saleId } = req.body;
    try {
      if(whitelisted){
        BuySellModel.findOneAndUpdate(
            {_saleId : saleId},
            {
              buyer: id,
              status: "accepted",
            },
            { new: true },
            async (err, doc) => {
              if (err) {
                console.log("error: " + err);
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
      } else {
          res
            .status(401)
            .json({ success: false, message: "Not whitelisted user" });
      }
    } catch (err) {
          console.log("error: " + err);
          res
            .status(401)
            .json({ success: false, message: "Failed to buy property" });
    }
});

exports.sell = asyncHandler(async (req, res, next) => {
    const { id } = req.user;
    try {
        BuySellModel.create(
            {
              ...req.body,
              seller: id,
              requestType: "sell",
            },
            async (err, doc) => {
              if (err) {
                console.log("error: " + err);
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
          console.log("error: " + err);
          res
            .status(401)
            .json({ success: false, message: "Failed to list property" });
    }
});

exports.cancelSale = asyncHandler(async (req, res, next) => {
    // const { buySellId } = req.params;
    const { saleId } = req.body;
    try {
      const buysellObj = await BuySellModel.findOne({_saleId : saleId});
      if(buysellObj.status=="none"){
        BuySellModel.findOneAndUpdate(
            {_saleId : saleId},
            {      
              status: "cancel",
            },
            { new: true },
            async (err, doc) => {
              if (err) {
                console.log("error: " + err);
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
      } else {
        res
            .status(401)
            .json({ success: false, message: "Already " + buysellObj.status });    
      }
    } catch (err) {
          console.log("error: " + err);
          res
            .status(401)
            .json({ success: false, message: "Failed to cancel" });       
    }
});