import { NextResponse } from 'next/server';
import { RAGEngine } from '@/services/rag/engine';
import { systemConfig } from '@/types/config';

export async function POST(req: Request) {
    try {
        const { tenantId, message } = await req.json();
        const rag = new RAGEngine();

        const response = await rag.generateResponse(tenantId, message);

        return NextResponse.json({
            ...response,
            systemInfo: {
                processedAt: systemConfig.timestamp,
                processedBy: systemConfig.currentUser
            }
        });
    } catch (error) {
        return NextResponse.json({
            error: 'Failed to process chat request',
            timestamp: systemConfig.timestamp
        }, { status: 500 });
    }
}