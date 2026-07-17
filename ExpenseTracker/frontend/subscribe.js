// Initialize Cashfree Web SDK
const cashfree = Cashfree({
    mode: "sandbox"
});

document.getElementById("premiumBtn").addEventListener("click", async () => {
    try {
        const token = localStorage.getItem("token");

        // 1. Ask your backend to initiate the transaction
        const response = await fetch("http://localhost:3000/api/payment/initiate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ amount: 1000.00 }) // Adjust price dynamically
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Failed to start checkout");
        }

        // 2. Open Cashfree Checkout Overlay directly on your expense page
        let checkoutOptions = {
            paymentSessionId: data.payment_session_id,
            redirectTarget: "_self", // Redirects automatically on payment conclusion
        };

        cashfree.checkout(checkoutOptions);

    } catch (error) {
        console.error("Payment setup error:", error.message);
        alert(error.message);
    }
});