import express from 'express';
import { createUser, getUsers } from '#apis/user/userController';
import { createJob, getJobs } from '#apis/job/jobController';
import login from '#apis/auth/authController';
import { auth } from '#middlewares/auth';

const router = express.Router();

// auth
router.route('/auth').post(login);

// user routes
router.route('/user').post(createUser);

router.get('/user', auth, getUsers);

// job routes
router.route('/job').post(createJob);

router.route('/job').get(getJobs);

export default router;
