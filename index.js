import express from "express";
import dotenv from "dotenv";
import cryptoRoute from "./routes/cryptoRoute.js";

dotenv.config();
const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

// Use the crypto routes
app.use("/", cryptoRoute);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
