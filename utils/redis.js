import { createClient } from 'redis';

class RedisClient {
    constructor() {
        // Create the Redis client
        this.client = createClient();

        // Handle connection errors
        this.client.on('error', (err) => {
            console.error('Redis client not connected to the server:', err);
        });

        // Handle successful connection
        this.client.on('connect', () => {
            console.log('Redis client connected to the server');
        });
    }

    /**
     * Checks if the Redis client is alive
     * @returns {boolean} - true if Redis client is connected, false otherwise
     */
    isAlive() {
        return this.client.connected;
    }

    /**
     * Gets the value associated with a key from Redis
     * @param {string} key - The key to search for
     * @returns {Promise<string | null>} - The value associated with the key or null if key does not exist
     */
    async get(key) {
        return new Promise((resolve, reject) => {
            this.client.get(key, (err, reply) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(reply);
                }
            });
        });
    }

    /**
     * Stores a value in Redis and sets an expiration time
     * @param {string} key - The key under which to store the value
     * @param {string | number} value - The value to store
     * @param {number} duration - The time in seconds before the key expires
     * @returns {Promise<void>}
     */
    async set(key, value, duration) {
        return new Promise((resolve, reject) => {
            this.client.set(key, value, 'EX', duration, (err, reply) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(reply);
                }
            });
        });
    }

    /**
     * Deletes a key-value pair from Redis
     * @param {string} key - The key to delete
     * @returns {Promise<void>}
     */
    async del(key) {
        return new Promise((resolve, reject) => {
            this.client.del(key, (err, reply) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(reply);
                }
            });
        });
    }
}

// Export a single instance of RedisClient
const redisClient = new RedisClient();
export default redisClient;
