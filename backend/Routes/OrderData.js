const express = require('express');
const router = express.Router();
const Order = require('../models/Orders'); // Ensure Order model is imported correctly

// API to handle order data
router.post('/orderData', async (req, res) => {
    try {
        const { order_data, order_date, email } = req.body;

        // Insert order date at the beginning of order data
        order_data.unshift({ Order_date: order_date });
        console.log("Placing order for email:", email);

        // Check if email exists in the database
        let userOrder = await Order.findOne({ email });

        if (!userOrder) {
            // Create new order if the email doesn't exist
            await Order.create({
                email,
                order_data: [order_data]
            });
            return res.json({ success: true });
        } else {
            // Update existing order by adding new order data
            await Order.findOneAndUpdate(
                { email },
                { $push: { order_data } }
            );
            return res.json({ success: true });
        }
    } catch (error) {
        console.error("Order placement error:", error.message);
        return res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
});


router.post('/myorderData', async (req, res) => {
    try {
        console.log(req.body.email)
        let eId = await Order.findOne({ 'email': req.body.email })
        //console.log(eId)
        res.json({orderData:eId})
    } catch (error) {
        res.send("Error",error.message)
    }
    

});


module.exports = router;
