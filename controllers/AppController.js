import redisClient from '../utils/redis';
import dbClient from '../utils/db';

class AppController {
    /**
     * Handles GET /status
     * Responds with the status of Redis and MongoDB
     * @param {Object} req - The request object
     * @param {Object} res - The response object
     */
    static getStatus(req, res) {
        res.status(200).json({ redis: redisClient.isAlive(), db: dbClient.isAlive() });
    }

    /**
     * Handles GET /stats
     * Responds with the number of users and files in MongoDB
     * @param {Object} req - The request object
     * @param {Object} res - The response object
     */
    static async getStats(req, res) {
        const usersCount = await dbClient.nbUsers();
        const filesCount = await dbClient.nbFiles();
        res.status(200).json({ users: usersCount, files: filesCount });
    }
}

export default AppController;
