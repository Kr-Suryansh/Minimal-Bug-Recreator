import express from "express";
import { generateMRE } from "../controllers/generatorController.js";

const router = express.Router();

router.post("/mre", generateMRE);

export default router;
