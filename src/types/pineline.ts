export interface PipelineConfig {
    modelName: string;
    task: 'feature-extraction';
    options: {
        cache_dir: string;
        revision: string;
        device: 'cpu' | 'cuda';
        local_files_only: boolean;
    };
}

export interface EmbeddingMetadata {
    timestamp: string;
    user: string;
    model: string;
    type: 'single' | 'batch';
}