import dbClient from '../utils/db';
import redisClient from '../utils/redis';

class UsersController {
    // Existing methods...

    /**
     * Handles GET /users/me
     * Retrieves the authenticated user's details
     * @param {Object} req - The request object
     * @param {Object} res - The response object
     */
    static async getMe(req, res) {
        const token = req.headers['x-token'];

        if (!token) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const userId = await redisClient.get(`auth_${token}`);
        if (!userId) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const user = await dbClient.usersCollection().findOne({ _id: dbClient.ObjectId(userId) });

        if (!user) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        return res.status(200).json({ id: user._id, email: user.email });
    }
}

export default UsersController;
