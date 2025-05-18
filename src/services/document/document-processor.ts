import { GeminiEmbeddingService } from '../embeddings/gemini-embeddings';

const CURRENT_TIMESTAMP = '2025-05-17 06:31:35';
const CURRENT_USER = 'Vishnusan58';

interface DocumentMetadata {
    title: string;
    createdAt: string;
    createdBy: string;
    documentType: string;
    fileSize: number;
    pageCount?: number;
}

interface ProcessedDocument {
    id: string;
    content: string;
    embedding: number[];
    metadata: DocumentMetadata;
    chunks: ProcessedChunk[];
}

interface ProcessedChunk {
    id: string;
    content: string;
    embedding: number[];
    startPosition: number;
    endPosition: number;
}

export class DocumentProcessor {
    private static instance: DocumentProcessor;
    private embedder: GeminiEmbeddingService;

    private constructor() {
        this.embedder = GeminiEmbeddingService.getInstance();
        console.log(`[${CURRENT_TIMESTAMP}] Document processor initialized by ${CURRENT_USER}`);
    }

    public static getInstance(): DocumentProcessor {
        if (!DocumentProcessor.instance) {
            DocumentProcessor.instance = new DocumentProcessor();
        }
        return DocumentProcessor.instance;
    }

    async processDocument(
        content: string,
        metadata: DocumentMetadata
    ): Promise<ProcessedDocument> {
        try {
            console.log(`[${CURRENT_TIMESTAMP}] Processing document: ${metadata.title}`);

            // Generate document-level embedding
            const documentEmbedding = await this.embedder.generateEmbedding(content);

            // Split content into chunks (simple paragraph-based splitting for now)
            const chunks = this.splitIntoChunks(content);

            // Process each chunk
            const processedChunks = await Promise.all(
                chunks.map(async (chunk, index) => {
                    const embedding = await this.embedder.generateEmbedding(chunk.content);
                    return {
                        id: `${metadata.title}-chunk-${index}`,
                        content: chunk.content,
                        embedding,
                        startPosition: chunk.startPosition,
                        endPosition: chunk.endPosition
                    };
                })
            );

            const processedDocument: ProcessedDocument = {
                id: `doc-${Date.now()}`,
                content,
                embedding: documentEmbedding,
                metadata: {
                    ...metadata,
                    createdAt: CURRENT_TIMESTAMP,
                    createdBy: CURRENT_USER
                },
                chunks: processedChunks
            };

            console.log(`[${CURRENT_TIMESTAMP}] Document processed successfully. Chunks: ${processedChunks.length}`);
            return processedDocument;

        } catch (error) {
            console.error(`[${CURRENT_TIMESTAMP}] Error processing document:`, error);
            throw error;
        }
    }

    private splitIntoChunks(content: string): Array<{ content: string; startPosition: number; endPosition: number }> {
        // Split by paragraphs (double newlines)
        const paragraphs = content.split(/\n\s*\n/);

        let currentPosition = 0;
        return paragraphs
            .filter(p => p.trim().length > 0) // Remove empty paragraphs
            .map(paragraph => {
                const start = currentPosition;
                const end = start + paragraph.length;
                currentPosition = end + 2; // +2 for the double newline
                return {
                    content: paragraph.trim(),
                    startPosition: start,
                    endPosition: end
                };
            });
    }
}