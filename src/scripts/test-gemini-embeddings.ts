import { GeminiEmbeddingService } from '@/services/embeddings/gemini-embeddings';

const CURRENT_TIMESTAMP = '2025-05-17 06:22:25';
const CURRENT_USER = 'Vishnusan58';

async function testGeminiEmbeddings() {
    try {
        console.log(`[${CURRENT_TIMESTAMP}] Starting Gemini embedding test by ${CURRENT_USER}`);

        const embedder = GeminiEmbeddingService.getInstance();

        // Test single embedding
        const testText = "Hello, world! This is a simple test.";
        console.log(`[${CURRENT_TIMESTAMP}] Generating embedding for: "${testText}"`);

        const embedding = await embedder.generateEmbedding(testText);
        console.log(`[${CURRENT_TIMESTAMP}] Embedding generated successfully. Length:`, embedding.length);

        // Test batch embedding
        const batchTexts = [
            "First test document",
            "Second test document",
            "Third test document"
        ];

        console.log(`[${CURRENT_TIMESTAMP}] Generating batch embeddings for ${batchTexts.length} documents`);
        const batchEmbeddings = await embedder.generateBatchEmbeddings(batchTexts);
        console.log(`[${CURRENT_TIMESTAMP}] Batch embeddings generated successfully. Count:`, batchEmbeddings.length);

    } catch (error) {
        console.error(`[${CURRENT_TIMESTAMP}] Test failed:`, error);
    }
}

// Run the test
testGeminiEmbeddings();