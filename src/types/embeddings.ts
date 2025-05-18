export interface EmbeddingConfig {
    modelName: string;
    dimension: number;
    maxTokens: number;
}

export const UAE_CONFIG: EmbeddingConfig = {
    modelName: 'WhereIsAI/UAE-Large-V1',
    dimension: 1024,
    maxTokens: 512
};

export interface EmbeddingResult {
    embedding: number[];
    metadata: {
        processedAt: string;
        processedBy: string;
        modelName: string;
    };
}