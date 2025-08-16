const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const Contact = require("./models/contact");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  dbName: "myapp", // or "contactdb"
})
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});

