const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();

const app = express();

app.use(express.json());

const contactRoutes = require("./routes/contactRoutes");

app.use("/contacts", contactRoutes);

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected");

        const port = process.env.PORT || 3000;

        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    })
    .catch((error) => {
        console.log("MongoDB connection error:", error);
    });