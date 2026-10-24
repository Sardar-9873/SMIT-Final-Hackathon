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
    res.status(200).send("Assalamualaikum! This is the backend of SMIT-Final-Hackathon.");
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", async () => {
    await connectToDB();
    console.log(`SMIT-Final-Hackathon's backend running on port: ${PORT} .`);
});