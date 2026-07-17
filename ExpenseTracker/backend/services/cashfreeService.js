const { Cashfree, CFEnvironment } = require("cashfree-pg");
const { order } = require('../models/index'); // Import your order model matrix

const cashfree = new Cashfree(
    CFEnvironment.SANDBOX,
    "TEST1113822539022556e01b305fd3fe52283111",
    "cfsk_ma_test_3da251b7c8f9079c99ce89bd0a4f98a3_17e0a887"
);

const createOrder = async (orderId, amount, customer) => {
    try {
        const request = {
            order_amount: amount,
            order_currency: "INR",
            order_id: orderId,
            customer_details: {
                customer_id: `cust_${customer.id}`,
                customer_phone: customer.phone || "9876543210",
                customer_email: customer.email
            },
            order_meta: {
                return_url: "http://localhost:3000/api/payment/status/{order_id}"
            }
        };

        const response = await cashfree.PGCreateOrder(request);

        // REQUIREMENT: Create an entry in your database with status PENDING
        await order.create({
            orderId: orderId,
            status: 'PENDING',
            userId: customer.id
        });

        return response.data;
    } catch (error) {
        console.error('Error creating order:', error.response?.data?.message || error.message);
        throw error;
    }
};

const getOrderStatus = async (orderId) => {
    try {
        // REQUIREMENT NOTE: Use the exact specified method with single parameter
        const response = await cashfree.PGOrderFetchPayments(orderId);
        const payments = response.data;

        let status = "FAILED"; // Default fallback status

        if (payments && Array.isArray(payments) && payments.length > 0) {
            if (payments.filter(t => t.payment_status === "SUCCESS").length > 0) {
                status = "SUCCESSFUL";
            } else if (payments.filter(t => t.payment_status === "PENDING").length > 0) {
                status = "PENDING";
            }
        }

        return status;
    } catch (error) {
        console.error('Error calling PGOrderFetchPayments:', error.response?.data?.message || error.message);
        return "FAILED";
    }
};

module.exports = {
    createOrder,
    getOrderStatus
};