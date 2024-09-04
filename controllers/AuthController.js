import dbClient from '../utils/db';
import redisClient from '../utils/redis';
import sha1 from 'sha1';
import { v4 as uuidv4 } from 'uuid';

class AuthController {
    /**
     * Handles GET /connect
     * Authenticates a user and returns a token
     * @param {Object} req - The request object
     * @param {Object} res - The response object
     */
    static async getConnect(req, res) {
        const authHeader = req.headers.authorization || '';
        const [type, credentials] = authHeader.split(' ');

        if (type !== 'Basic' || !credentials) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const decodedCredentials = Buffer.from(credentials, 'base64').toString('utf-8');
        const [email, password] = decodedCredentials.split(':');

        if (!email || !password) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const hashedPassword = sha1(password);
        const user = await dbClient.usersCollection().findOne({ email, password: hashedPassword });

        if (!user) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const token = uuidv4();
        await redisClient.set(`auth_${token}`, user._id.toString(), 86400);

        return res.status(200).json({ token });
    }

    /**
     * Handles GET /disconnect
     * Signs out the user by invalidating the token
     * @param {Object} req - The request object
     * @param {Object} res - The response object
     */
    static async getDisconnect(req, res) {
        const token = req.headers['x-token'];

        if (!token) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const userId = await redisClient.get(`auth_${token}`);
        if (!userId) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        await redisClient.del(`auth_${token}`);
        return res.status(204).send();
    }
}

export default AuthController;
