import { Router } from 'express';
import AppController from '../controllers/AppController';
import UsersController from '../controllers/UsersController';
import AuthController from '../controllers/AuthController';

const router = Router();

// Define the /status and /stats routes
router.get('/status', AppController.getStatus);
router.get('/stats', AppController.getStats);

// New route to create a user
router.post('/users', UsersController.postNew);

// New routes for authentication
router.get('/connect', AuthController.getConnect);
router.get('/disconnect', AuthController.getDisconnect);
router.get('/users/me', UsersController.getMe);

export default router;
