import express from 'express';
import { createUser } from '#apis/user/userController';

const router = express.Router();

// user routes
router.route('/user').post(createUser);

// job routes

export default router;
