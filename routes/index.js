import { Router } from 'express';
import AppController from '../controllers/AppController';

const router = Router();

// Define the /status and /stats routes
router.get('/status', AppController.getStatus);
router.get('/stats', AppController.getStats);

export default router;
