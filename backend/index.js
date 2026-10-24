const express = require("express");
const cors = require("cors");
const bodyparser = require("body-parser");
const env = require("dotenv");
const { connectToDB } = require("./lib/helpers/db.helper");
const router = require("./router/index.router");

const app = express();

env.config();

const corsOptions = {
  origin: process.env.FRONTEND_URL,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));

app.use(bodyparser.json());
app.use("/api", router);

app.get("/", (req, res) => {
    res.status(200).send("Assalamualaikum! This is an Authentication CRUD.");
});


// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//     connectToDB();
//     console.log("SMIT Final hackathon's backend running.");
// });

const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", async () => {
    console.log(`Server running on port ${PORT}`);

    try {
        await connectToDB();
    } catch (error) {
        console.error("MongoDB connection failed:", error);
    }
});