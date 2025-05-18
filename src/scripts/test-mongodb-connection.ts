import { MongoClient, MongoClientOptions } from 'mongodb';
import * as dotenv from 'dotenv';
import { resolve } from 'path';

dotenv.config({ path: resolve(__dirname, '../../.env') });

const CURRENT_TIMESTAMP = '2025-05-18 06:06:22';
const CURRENT_USER = 'Vishnusan58';

async function testMongoDBConnection() {
    console.log(`[${CURRENT_TIMESTAMP}] Testing MongoDB connection...`);

    const options: MongoClientOptions = {
        connectTimeoutMS: 30000,
        socketTimeoutMS: 360000,
        serverSelectionTimeoutMS: 30000,
        maxPoolSize: 10,
        minPoolSize: 0,

    };

    const client = new MongoClient(process.env.AZURE_COSMOS_CONNECTION_STRING!, options);

    try {
        console.log(`[${CURRENT_TIMESTAMP}] Connecting to MongoDB...`);
        await client.connect();
        console.log(`[${CURRENT_TIMESTAMP}] Successfully connected to MongoDB`);

        // Test database access
        const db = client.db('docuflowai');
        const collections = await db.listCollections().toArray();
        console.log(`[${CURRENT_TIMESTAMP}] Available collections:`, collections.map(c => c.name));

        // Test write access
        const testCollection = db.collection('test');
        const result = await testCollection.insertOne({
            test: true,
            timestamp: CURRENT_TIMESTAMP,
            user: CURRENT_USER
        });
        console.log(`[${CURRENT_TIMESTAMP}] Test write successful:`, result.insertedId);

        // Clean up test data
        await testCollection.deleteOne({ _id: result.insertedId });
        console.log(`[${CURRENT_TIMESTAMP}] Test cleanup successful`);

    } catch (error) {
        console.error(`[${CURRENT_TIMESTAMP}] Connection test failed:`, error);
        throw error;
    } finally {
        await client.close();
        console.log(`[${CURRENT_TIMESTAMP}] Connection closed`);
    }
}

testMongoDBConnection().catch(console.error);