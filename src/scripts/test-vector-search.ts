import { DocumentProcessor } from '../services/document/document-processor';
import { VectorSearchService } from '../services/search/vector-search';

const CURRENT_TIMESTAMP = '2025-05-17 06:42:24';
const CURRENT_USER = 'Vishnusan58';

async function testVectorSearch() {
    try {
        console.log(`[${CURRENT_TIMESTAMP}] Starting vector search test`);

        // Initialize services
        const processor = DocumentProcessor.getInstance();
        const searchService = VectorSearchService.getInstance();

        // Create test documents
        const testDocuments = [
            {
                content: `
                    Machine learning is a subset of artificial intelligence.
                    It focuses on developing systems that can learn from data.
                    Deep learning is a subset of machine learning.
                `.trim(),
                metadata: {
                    title: "AI Basics",
                    documentType: "text/plain",
                    fileSize: 150,
                    createdAt: CURRENT_TIMESTAMP,
                    createdBy: CURRENT_USER
                }
            },
            {
                content: `
                    TypeScript is a typed superset of JavaScript.
                    It adds optional static types to the language.
                    TypeScript compiles to clean JavaScript output.
                `.trim(),
                metadata: {
                    title: "TypeScript Introduction",
                    documentType: "text/plain",
                    fileSize: 140,
                    createdAt: CURRENT_TIMESTAMP,
                    createdBy: CURRENT_USER
                }
            }
        ];

        // Process and index documents
        console.log(`[${CURRENT_TIMESTAMP}] Processing and indexing test documents...`);

        for (const doc of testDocuments) {
            const processed = await processor.processDocument(doc.content, doc.metadata);
            searchService.addDocument(processed);
        }

        // Perform test searches
        const testQueries = [
            "What is machine learning?",
            "Tell me about TypeScript",
            "What is artificial intelligence?"
        ];

        for (const query of testQueries) {
            console.log(`\n[${CURRENT_TIMESTAMP}] Searching for: "${query}"`);
            const results = await searchService.search(query, 2);

            console.log(`Top ${results.length} results:`);
            results.forEach((result, index) => {
                console.log(`\n${index + 1}. Document: ${result.documentTitle}`);
                console.log(`   Similarity: ${(result.similarity * 100).toFixed(2)}%`);
                console.log(`   Content: ${result.chunkContent}`);
            });
        }

    } catch (error) {
        console.error(`[${CURRENT_TIMESTAMP}] Test failed:`, error);
    }
}

// Run the test
testVectorSearch();