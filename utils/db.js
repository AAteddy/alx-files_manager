import { MongoClient } from 'mongodb';
import { promisify } from 'util';

class DBClient {
    constructor() {
        // Get the environment variables or set default values
        const host = process.env.DB_HOST || 'localhost';
        const port = process.env.DB_PORT || 27017;
        const database = process.env.DB_DATABASE || 'files_manager';

        // Create the MongoDB URI
        const uri = `mongodb://${host}:${port}`;

        // Create the MongoDB client
        this.client = new MongoClient(uri, { useUnifiedTopology: true });
        
        // Connect to the MongoDB server
        this.client.connect()
            .then(() => {
                this.db = this.client.db(database);
                console.log('MongoDB client connected to the server');
            })
            .catch((err) => {
                console.error('MongoDB client not connected to the server:', err);
            });
    }

    /**
     * Checks if the MongoDB client is alive
     * @returns {boolean} - true if MongoDB client is connected, false otherwise
     */
    isAlive() {
        return this.client && this.client.isConnected();
    }

    /**
     * Returns the number of documents in the 'users' collection
     * @returns {Promise<number>} - The number of documents in the 'users' collection
     */
    async nbUsers() {
        return this.db.collection('users').countDocuments();
    }

    /**
     * Returns the number of documents in the 'files' collection
     * @returns {Promise<number>} - The number of documents in the 'files' collection
     */
    async nbFiles() {
        return this.db.collection('files').countDocuments();
    }
}

// Export a single instance of DBClient
const dbClient = new DBClient();
export default dbClient;
