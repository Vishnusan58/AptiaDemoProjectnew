import { GeminiEmbeddingService } from '../embeddings/gemini-embeddings';
import { DocumentProcessor } from '../document/document-processor';

const CURRENT_TIMESTAMP = '2025-05-17 06:42:24';
const CURRENT_USER = 'Vishnusan58';

interface SearchResult {
    documentId: string;
    documentTitle: string;
    chunkContent: string;
    similarity: number;
    position: {
        start: number;
        end: number;
    };
}

export class VectorSearchService {
    private static instance: VectorSearchService;
    private embedder: GeminiEmbeddingService;
    private documents: ProcessedDocument[] = [];

    private constructor() {
        this.embedder = GeminiEmbeddingService.getInstance();
        console.log(`[${CURRENT_TIMESTAMP}] Vector search service initialized by ${CURRENT_USER}`);
    }

    public static getInstance(): VectorSearchService {
        if (!VectorSearchService.instance) {
            VectorSearchService.instance = new VectorSearchService();
        }
        return VectorSearchService.instance;
    }

    // Add a document to the search index
    addDocument(document: ProcessedDocument): void {
        this.documents.push(document);
        console.log(`[${CURRENT_TIMESTAMP}] Added document to search index: ${document.metadata.title}`);
    }

    // Calculate cosine similarity between two vectors
    private cosineSimilarity(vector1: number[], vector2: number[]): number {
        const dotProduct = vector1.reduce((acc, val, i) => acc + val * vector2[i], 0);
        const magnitude1 = Math.sqrt(vector1.reduce((acc, val) => acc + val * val, 0));
        const magnitude2 = Math.sqrt(vector2.reduce((acc, val) => acc + val * val, 0));
        return dotProduct / (magnitude1 * magnitude2);
    }

    // Search for similar content
    async search(query: string, topK: number = 5): Promise<SearchResult[]> {
        try {
            console.log(`[${CURRENT_TIMESTAMP}] Searching for: "${query}"`);

            // Generate embedding for the search query
            const queryEmbedding = await this.embedder.generateEmbedding(query);

            // Search through all document chunks
            const results: SearchResult[] = [];

            for (const doc of this.documents) {
                for (const chunk of doc.chunks) {
                    const similarity = this.cosineSimilarity(queryEmbedding, chunk.embedding);

                    results.push({
                        documentId: doc.id,
                        documentTitle: doc.metadata.title,
                        chunkContent: chunk.content,
                        similarity,
                        position: {
                            start: chunk.startPosition,
                            end: chunk.endPosition
                        }
                    });
                }
            }

            // Sort by similarity and get top K results
            const topResults = results
                .sort((a, b) => b.similarity - a.similarity)
                .slice(0, topK);

            console.log(`[${CURRENT_TIMESTAMP}] Found ${topResults.length} results`);
            return topResults;

        } catch (error) {
            console.error(`[${CURRENT_TIMESTAMP}] Search failed:`, error);
            throw error;
        }
    }

    // Clear all documents from the search index
    clearIndex(): void {
        this.documents = [];
        console.log(`[${CURRENT_TIMESTAMP}] Search index cleared by ${CURRENT_USER}`);
    }
}