export class TextChunker {
    private maxTokens: number;

    constructor(maxTokens: number = 512) {
        this.maxTokens = maxTokens;
    }

    splitIntoChunks(text: string): string[] {
        // Simple implementation - you might want to use a proper tokenizer
        const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
        const chunks: string[] = [];
        let currentChunk: string[] = [];
        let currentLength = 0;

        for (const sentence of sentences) {
            const sentenceTokens = sentence.split(' ').length;

            if (currentLength + sentenceTokens > this.maxTokens) {
                if (currentChunk.length > 0) {
                    chunks.push(currentChunk.join(' '));
                    currentChunk = [];
                    currentLength = 0;
                }
            }

            currentChunk.push(sentence);
            currentLength += sentenceTokens;
        }

        if (currentChunk.length > 0) {
            chunks.push(currentChunk.join(' '));
        }

        return chunks;
    }
}