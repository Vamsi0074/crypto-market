import express from "express";
import axios from "axios";
import dotenv from "dotenv";
import moment from "moment-timezone";

dotenv.config();

console.log("Loaded API Key:", process.env.COINAPI_KEY);

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        let config = {
            method: "get",
            maxBodyLength: Infinity,
            url: "https://rest.coinapi.io/v1/exchangerate/BTC/USD",
            headers: {
                "Accept": "application/json",
                "X-CoinAPI-Key": process.env.COINAPI_KEY
            }
        };

        const response = await axios.request(config);
        console.log("API Response:", response.data); // Debugging log

        // Convert UTC time to IST
        const utcTime = response.data.time;
        const istTime = moment(utcTime).tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");

        res.render("index.ejs", {
            price: response.data.rate,
            time: istTime,
            base: response.data.asset_id_base,
            currency: response.data.asset_id_quote,
        });
    } catch (error) {
        console.error("Error fetching Crypto Price:", error.response?.data || error.message);
        res.render("index.ejs", {
            price: "Error fetching price",
            time: "N/A",
            base: "N/A",
            currency: "N/A",
        });
    }
});

export default router;
