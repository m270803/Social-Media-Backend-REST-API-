import express from 'express';
import { getAllUser, logIn, signup } from '../controllers/user-controller.js';

const router = express.Router();

router.get("/", getAllUser);
router.post("/signup", signup)
router.post("/login", logIn)

export default router;
