const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connect
mongoose.connect("mongodb+srv://poojaanami:<db_poojaanami77>@cluster0.cjaaq62.mongodb.net/artcraft?appName=Cluster0")
.then(() => console.log("MongoDB Atlas Connected ✅"))
.catch(err => console.log(err));

// Order Schema
const Order = mongoose.model("Order", {
  name: String,
  address: String,
  phone: String,
  products: Array
});

// ================= ROUTES =================

// SAVE ORDER
app.post("/order", async (req, res) => {
  try {
    console.log("Order Received:", req.body);

    const newOrder = new Order(req.body);
    await newOrder.save();

    console.log("Saved in DB ✅");

    res.send("Order Saved Successfully 💖");
  } catch (err) {
    console.log("Error saving:", err);
    res.status(500).send("Error saving order ❌");
  }
});

// ==========================================

app.listen(5000, () => {
  console.log("Server running on port 5000 🚀");
});
