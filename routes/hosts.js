import express from "express";
import { updateHost, deleteHost, getHost, getHosts, getId } from "../controllers/host.js";
import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();

router.put("/:id", updateHost);
router.delete("/:id", deleteHost);
router.get("/:id", getHost);
router.get("/", getHosts);
router.get("/:username", getId);

export default router;
