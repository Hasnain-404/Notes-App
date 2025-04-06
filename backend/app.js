import express from "express";
import dotenv from "dotenv";
import { clerkMiddleware } from '@clerk/express'
import router from "./routes/userRoutes.js";
import cardRouter from "./routes/cardRoutes.js";
import conntectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";


const app = express();

//middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser())
app.use(cors({
    origin: "https://notesappofficial.netlify.app",
    credentials: true,
}))


app.use((req, res, next) => {
    console.log("Headers:", req.headers);
    console.log("Cookies:", req.cookies);
    next();
});


app.use(clerkMiddleware())

//connect to db
conntectDB();

//dotenv
dotenv.config()

//routes
app.use("/user", router);
app.use("/card", cardRouter);

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
    res.send("Hello World");
})



app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})