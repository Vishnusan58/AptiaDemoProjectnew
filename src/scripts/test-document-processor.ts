import { DocumentProcessor } from '../services/document/document-processor';

const CURRENT_TIMESTAMP = '2025-05-17 06:31:35';
const CURRENT_USER = 'Vishnusan58';

async function testDocumentProcessor() {
    try {
        console.log(`[${CURRENT_TIMESTAMP}] Starting document processing test`);

        const processor = DocumentProcessor.getInstance();

        const testDocument = `
First paragraph of the test document.
This is part of the first paragraph.

Second paragraph with different content.
Testing how the chunking works.

Third paragraph for thoroughness.
Making sure everything processes correctly.
        `.trim();

        const metadata = {
            title: "Test Document",
            createdAt: CURRENT_TIMESTAMP,
            createdBy: CURRENT_USER,
            documentType: "text/plain",
            fileSize: testDocument.length
        };

        console.log(`[${CURRENT_TIMESTAMP}] Processing test document...`);

        const result = await processor.processDocument(testDocument, metadata);

        console.log(`[${CURRENT_TIMESTAMP}] Document processed successfully`);
        console.log(`Chunks processed: ${result.chunks.length}`);
        console.log(`Document embedding length: ${result.embedding.length}`);

        // Log first chunk as example
        console.log('\nFirst chunk preview:');
        console.log('Content:', result.chunks[0].content);
        console.log('Embedding length:', result.chunks[0].embedding.length);

    } catch (error) {
        console.error(`[${CURRENT_TIMESTAMP}] Test failed:`, error);
    }
}

// Run the test
testDocumentProcessor();