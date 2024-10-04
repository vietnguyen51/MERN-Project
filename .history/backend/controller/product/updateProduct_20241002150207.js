async function updateProductController(req,res) {
    try {

        
    } catch (err) {
      res.status(400).json({
        message: err.message || err,
        error: true,
        success: false,
      });
    }
}