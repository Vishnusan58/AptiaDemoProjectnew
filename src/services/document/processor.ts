// import { UAEEmbeddingsService } from '../embeddings/uae-embeddings';
// import { TextChunker } from '@/utils/text-chunking';
// import { UAE_CONFIG } from '@/types/embeddings';
// import { systemConfig } from '@/types/config';
// import { PineconeService } from '../pinecone';
//
// export class DocumentProcessor {
//     private embedder: UAEEmbeddingsService;
//     private chunker: TextChunker;
//     private pinecone: PineconeService;
//
//     constructor() {
//         this.embedder = UAEEmbeddingsService.getInstance();
//         this.chunker = new TextChunker(UAE_CONFIG.maxTokens);
//         this.pinecone = new PineconeService();
//     }
//
//     async processDocument(tenantId: string, document: Buffer): Promise<ProcessingResult> {
//         try {
//             // Convert buffer to text
//             const text = document.toString('utf-8');
//
//             // Split into chunks
//             const chunks = this.chunker.splitIntoChunks(text);
//
//             // // Generate embeddings
//             // const embeddings = await this.embedder.generateEmbeddings(chunks);
//
//             // Prepare vectors for Pinecone
//             const vectors = embeddings.map((embedding, idx) => ({
//                 id: `${tenantId}-${Date.now()}-${idx}`,
//                 values: embedding,
//                 metadata: {
//                     text: chunks[idx],
//                     processedBy: systemConfig.currentUser,
//                     processedAt: systemConfig.timestamp,
//                     modelName: UAE_CONFIG.modelName
//                 }
//             }));
//
//             // Store in Pinecone
//             await this.pinecone.upsertVectors(tenantId, vectors);
//
//             return {
//                 status: 'success',
//                 chunksProcessed: chunks.length,
//                 embeddings: embeddings.length,
//                 metadata: {
//                     processedBy: systemConfig.currentUser,
//                     processedAt: systemConfig.timestamp,
//                     modelName: UAE_CONFIG.modelName
//                 }
//             };
//         } catch (error) {
//             console.error('Document processing failed:', error);
//             throw error;
//         }
//     }
// }
//
// interface ProcessingResult {
//     status: 'success' | 'error';
//     chunksProcessed: number;
//     embeddings: number;
//     metadata: {
//         processedBy: string;
//         processedAt: string;
//         modelName: string;
//     };
// }