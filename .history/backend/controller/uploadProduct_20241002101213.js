import { Model } from "mongoose";

async function uploadProduct(req, res) {
  try {
    
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}


Model.exports = uploadProduct;