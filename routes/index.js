import { Router } from 'express';
import AppController from '../controllers/AppController';
import UsersController from '../controllers/UsersController';

const router = Router();

// Define the /status and /stats routes
router.get('/status', AppController.getStatus);
router.get('/stats', AppController.getStats);

// New route to create a user
router.post('/users', UsersController.postNew);

export default router;
