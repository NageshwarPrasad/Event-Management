const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const Contact = require("./models/contact");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect("mongodb+srv://nageshwarprasad1504:mzSXLEdMohnx6YJM@cluster0.ivq3bld.mongodb.net/vikalp-db?retryWrites=true&w=majority");



// API endpoint
app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, number, message } = req.body;
    const newContact = new Contact({ name, email, number, message });
    await newContact.save();
    res.json({ success: true, message: "Message received!" });
  } catch (error) {
    res.status(500).json({ success: false, error: "Server error." });
  }
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
