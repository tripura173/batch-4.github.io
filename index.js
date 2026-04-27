const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/examDB")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));
/* 🔥 MODEL */
const ResultSchema = new mongoose.Schema({
    studentId: String,
    subject: String,
    marks: Number,
    total: Number,
    percentage: Number,
    date: { type: Date, default: Date.now }
});

const Result = mongoose.model("Result", ResultSchema);

/* 🔥 SAVE RESULT API */
app.post("/save-result", async (req, res) => {
    const data = req.body;

    const result = new Result(data);
    await result.save();

    res.json({ message: "Result Saved Successfully" });
});

/* 🔥 START SERVER */
app.listen(5000, () => {
    console.log("Server running on port 5000");
});
