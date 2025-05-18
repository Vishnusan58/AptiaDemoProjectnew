import { Pinecone } from '@pinecone-database/pinecone';
import { systemConfig } from '@/types/config';

export class PineconeService {
    private static instance: Pinecone;
    private readonly indexName: string;

    constructor() {
        this.indexName = `docuflow-${systemConfig.environment}`;
    }

    public static getInstance(): Pinecone {
        if (!PineconeService.instance) {
            PineconeService.instance = new Pinecone({
                apiKey: process.env.PINECONE_API_KEY!
            });
        }
        return PineconeService.instance;
    }

    // async createNamespace(tenantId: string) {
    //     const index = await this.getInstance().Index(this.indexName);
    //     return await index.namespace(`tenant-${tenantId}`);
    // }

    // async upsertVectors(tenantId: string, vectors: any[]) {
    //     const namespace = await this.createNamespace(tenantId);
    //     return await namespace.upsert(vectors);
    // }
}