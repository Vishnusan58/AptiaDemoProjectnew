// Test the embeddings service
async function testEmbeddings() {
    try {
        // Single text example
        const response = await fetch('/api/embeddings', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                texts: "This is a test document for embedding generation.",
                isBatch: false
            })
        });

        const result = await response.json();
        console.log(` Single embedding result:`, result);

        // Batch processing example
        const batchResponse = await fetch('/api/embeddings', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                texts: [
                    "First test document",
                    "Second test document",
                    "Third test document"
                ],
                isBatch: true
            })
        });

        const batchResult = await batchResponse.json();
        console.log(` Batch embedding result:`, batchResult);
    } catch (error) {
        console.error(` Test failed:`, error);
    }
}

// Run the test
testEmbeddings();