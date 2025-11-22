const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Load coin packs
const packsFile = path.join(__dirname, "data", "packs.json");
let packs = JSON.parse(fs.readFileSync(packsFile));

// Get all packs
app.get("/packs", (req, res) => {
    res.json(packs);
});

// Fake purchase endpoint (for testing)
app.post("/purchase", (req, res) => {
    const { productId } = req.body;

    const pack = packs.find((p) => p.productId === productId);

    if (!pack) {
        return res.status(400).json({ error: "Invalid productId" });
    }

    return res.json({
        success: true,
        message: "Purchase simulated successfully.",
        coins: pack.amount,
        pack: pack
    });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
