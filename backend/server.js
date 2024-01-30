const cors = require("cors");
const express = require("express");
require("dotenv").config();
const stripe = require("stripe");
(process.env.STRIPE_SECRET_KEY);
const app = express();

//Middleware
app.use(express.json());
app.use(cors());

//Routes
app.get('/', (req, res) => {
    res.send('HELLO WORLD');
});
app.post('/api/create-checkout-session', async (req, res) => {
    const {product} = req.body;
    const session = await stripe.checkout.session
    .create({ 
        payment_method_types: ["card"], 
        line_items: [{ price_data: { 
            currency: 'dollar', 
            product_data: { name: product.name, }, 
            unit_amount: product.price* 100, }, 
            quantity: product.quantity, 
        }], 
        mode: "payment", 
        success_url: "http://localhost:3000/success", 
        cancel_url: "http://localhost:3000/cancel", 
    });
    res.json({ id: session.id });
});

app.listen(8000, () => {
    console.log("Server started at port 8000");
});