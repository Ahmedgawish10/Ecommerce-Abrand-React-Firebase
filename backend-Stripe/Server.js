const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY); // Use environment variable for Stripe secret key
require("dotenv").config(); // Ensure the .env file is loaded

const app = express();

// CORS Middleware Setup
app.use(cors({
  origin: '*', // Allow all origins or specify specific domains like 'http://localhost:3000'
  methods: ['GET', 'POST'],
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept'],
}));

app.use(express.json());

// Create Checkout Session
app.post("/create-checkout-session", async (req, res) => {
  try {
    const { amount, currency } = req.body;

    // Input Validation
    if (!amount || !currency) {
      return res.status(400).send({ error: "Amount and currency are required." });
    }
    if (isNaN(amount) || amount <= 0) {
      return res.status(400).send({ error: "Amount must be a positive number." });
    }

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: currency,
            product_data: {
              name: 'Sample Product',
            },
            unit_amount: amount,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.SUCCESS_URL}?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CANCEL_URL}`,
    });

    res.status(200).send({ sessionId: session.id });
  } catch (error) {
    console.error("Stripe error:", error);
    res.status(500).send({ error: error.message });
  }
});

// Retrieve Checkout Session
app.get("/session/:sessionId", async (req, res) => {
  try {
    const { sessionId } = req.params;
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (!session) {
      return res.status(404).send({ error: "Session not found" });
    }

    res.status(200).send(session);
  } catch (error) {
    console.error("Error fetching session:", error);
    res.status(500).send({ error: error.message });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
