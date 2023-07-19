import express from 'express';
import { createUser, getUsers } from '#apis/user/userController';

const router = express.Router();

// user routes
router.route('/user').post(createUser);

router.route('/user').get(getUsers);

// job routes

export default router;
