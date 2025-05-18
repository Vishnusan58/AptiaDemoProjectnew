import * as dotenv from 'dotenv';
import { resolve } from 'path';

dotenv.config({ path: resolve(__dirname, '../../.env') });

const CURRENT_TIMESTAMP = '2025-05-18 06:06:22';
const CURRENT_USER = 'Vishnusan58';

function validateMongoDBConnectionString(connectionString: string | undefined): string {
    if (!connectionString) {
        throw new Error('Azure Cosmos DB (MongoDB) connection string is not defined');
    }

    // Remove any surrounding quotes and trim
    connectionString = connectionString.replace(/^["']|["']$/g, '').trim();

    // Log the connection string format (hide password)
    const sanitizedString = connectionString.replace(/(?<=:)[^@]+(?=@)/, '****');
    console.log(`[${CURRENT_TIMESTAMP}] Connection string format:`, sanitizedString);

    return connectionString;
}

const mongoConnectionString = validateMongoDBConnectionString(
    process.env.AZURE_COSMOS_CONNECTION_STRING
);

export const azureConfig = {
    mongodb: {
        connectionString: mongoConnectionString,
        database: 'docuflowai',
        collections: {
            documents: 'documents',
            embeddings: 'embeddings',
            versions: 'versions'
        }
    }
};