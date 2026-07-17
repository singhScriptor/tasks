const cashfreeService = require('../services/cashfreeService');
const { order, user } = require('../models/index');

const initiatePayment = async (req, res, next) => {
    try {
        const { amount } = req.body;
        const loggedInUser = req.user;

        if (!amount || amount <= 0) {
            return res.status(400).json({ message: "A valid positive amount is required" });
        }

        const orderId = `ord_${Date.now()}_u${loggedInUser.id}`;
        const orderData = await cashfreeService.createOrder(orderId, amount, loggedInUser);

        res.status(201).json({
            message: "Payment order initiated successfully",
            order_id: orderData.order_id,
            payment_session_id: orderData.payment_session_id
        });
    } catch (err) {
        next(err);
    }
};

const verifyPayment = async (req, res, next) => {
    try {
        const { orderId } = req.params;

        // 1. Get status directly from Cashfree API
        const finalStatus = await cashfreeService.getOrderStatus(orderId);

        // 2. Find the local tracking order record
        const localOrder = await order.findOne({ where: { orderId: orderId } });
        if (!localOrder) {
            return res.status(404).json({ message: "Order records missing from database system" });
        }

        // 3. Update Order status based on results
        await localOrder.update({ status: finalStatus });

        // If successful, make the current user a premium user
        if (finalStatus === "SUCCESSFUL") {
            await user.update(
                { isPremiumUser: true }, // Assuming your User model column is named isPremiumUser
                { where: { id: localOrder.userId } }
            );

            return res.status(200).json({
                message: "Transaction successful! You are now a premium user.",
                status: "SUCCESSFUL",
                order_id: orderId
            });
        }

        // When transaction fails update status to FAILED
        return res.status(200).json({
            message: "TRANSACTION FAILED",
            status: "FAILED",
            order_id: orderId
        });

    } catch (err) {
        next(err);
    }
};

module.exports = {
    initiatePayment,
    verifyPayment
};