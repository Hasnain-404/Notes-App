import express from "express";
const router = express.Router();
import { saveUserInDB } from "../controllers/userControllers.js";

router.post("/save-user", saveUserInDB)

export default router;