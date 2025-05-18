import { pipeline } from '@huggingface/transformers';

const CURRENT_TIMESTAMP = '2025-05-17 05:36:58';
const CURRENT_USER = 'Vishnusan58';

export class UAEEmbeddingsService {
    private static instance: UAEEmbeddingsService;
    private pipeline: any = null;
    private readonly modelName = 'WhereIsAI/UAE-Large-V1';

    private constructor() {
        console.log(`[${CURRENT_TIMESTAMP}] Service instantiated by ${CURRENT_USER}`);
    }

    public static getInstance(): UAEEmbeddingsService {
        if (!UAEEmbeddingsService.instance) {
            UAEEmbeddingsService.instance = new UAEEmbeddingsService();
        }
        return UAEEmbeddingsService.instance;
    }

    async initialize(): Promise<void> {
        if (!this.pipeline) {
            try {
                this.pipeline = await pipeline('feature-extraction', this.modelName);
                console.log(`[${CURRENT_TIMESTAMP}] Pipeline initialized by ${CURRENT_USER}`);
            } catch (error) {
                console.error(`[${CURRENT_TIMESTAMP}] Pipeline initialization failed:`, error);
                throw error;
            }
        }
    }

    async generateEmbedding(text: string): Promise<number[]> {
        if (!this.pipeline) {
            await this.initialize();
        }

        try {
            const result = await this.pipeline(text);
            return Array.from(result.data);
        } catch (error) {
            console.error(`[${CURRENT_TIMESTAMP}] Error generating embedding:`, error);
            throw error;
        }
    }

    async generateBatchEmbeddings(texts: string[]): Promise<number[][]> {
        if (!this.pipeline) {
            await this.initialize();
        }

        try {
            console.log(`[${CURRENT_TIMESTAMP}] Processing batch of ${texts.length} texts`);
            return await Promise.all(texts.map(text => this.generateEmbedding(text)));
        } catch (error) {
            console.error(`[${CURRENT_TIMESTAMP}] Batch embedding generation failed:`, error);
            throw error;
        }
    }
}