import { resolve } from 'path';
import * as dotenv from 'dotenv';
import { AzureStorageService } from '../services/storage/azure-storage';

// Load environment variables before importing any other modules
dotenv.config({ path: resolve(__dirname, '../../.env') });

const CURRENT_TIMESTAMP = '2025-05-18 06:01:14';
const CURRENT_USER = 'Vishnusan58';

async function testAzureStorage() {
    try {
        console.log(`[${CURRENT_TIMESTAMP}] Starting Azure storage test`);

        const storage = await AzureStorageService.getInstance();

        // Test document
        const metadata = {
            title: 'Test Document',
            contentType: 'text/plain',
            size: 100,
            createdAt: CURRENT_TIMESTAMP,
            createdBy: CURRENT_USER
        };

        const embedding = [0.1, 0.2, 0.3, 0.4, 0.5];

        // Store document
        console.log(`[${CURRENT_TIMESTAMP}] Storing test document...`);
        const documentId = await storage.storeDocument(Buffer.from('Test content'), metadata, embedding);
        console.log(`[${CURRENT_TIMESTAMP}] Document stored with ID: ${documentId}`);

        // Retrieve document
        console.log(`[${CURRENT_TIMESTAMP}] Retrieving document...`);
        const retrieved = await storage.retrieveDocument(documentId);
        console.log(`[${CURRENT_TIMESTAMP}] Retrieved document:`, {
            metadata: retrieved.metadata,
            embeddingLength: retrieved.embedding.length
        });

        await storage.cleanup();
        console.log(`[${CURRENT_TIMESTAMP}] Test completed successfully`);

    } catch (error) {
        console.error(`[${CURRENT_TIMESTAMP}] Test failed:`, error);
        process.exit(1);
    }
}
// add

// Run the test
testAzureStorage();