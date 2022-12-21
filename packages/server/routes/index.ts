import "./settings/options";

import { slackGate } from "../middlewares/slackGate";
import settings from "./settings";
import express from "express";

const router = express.Router();

router.use("/settings", slackGate, settings);

export default router;
