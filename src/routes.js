import express from 'express';
import { createUser, getUsers } from '#apis/user/userController';
import { createJob, getJobs } from '#apis/job/jobController';
import login from '#apis/auth/authController';
import auth from '#middlewares/auth';

const router = express.Router();

// auth routes
router.route('/login').post(login);

// user routes
router.post('/user', auth, createUser);

router.get('/user', auth, getUsers);

// job routes
router.post('/job', auth, createJob);

router.get('/job', auth, getJobs);

export default router;
