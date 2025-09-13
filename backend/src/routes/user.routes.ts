import express from "express";
import { getAllUsers, getUser } from "../controllers/user.controller.ts";

const router = express.Router();

router.get("/", getAllUsers);
router.get("/me", getUser);

export default router;
