import { NextResponse } from 'next/server';
import { DocumentProcessor } from '@/services/document/document-processor';

const CURRENT_TIMESTAMP = '2025-05-17 06:31:35';
const CURRENT_USER = 'Vishnusan58';

export async function POST(req: Request) {
    try {
        const { content, metadata } = await req.json();

        if (!content || !metadata) {
            return NextResponse.json({
                success: false,
                error: 'Missing required fields',
                timestamp: CURRENT_TIMESTAMP
            }, { status: 400 });
        }

        const processor = DocumentProcessor.getInstance();
        const processedDocument = await processor.processDocument(content, metadata);

        return NextResponse.json({
            success: true,
            document: processedDocument,
            metadata: {
                timestamp: CURRENT_TIMESTAMP,
                processedBy: CURRENT_USER
            }
        });

    } catch (error) {
        console.error(`[${CURRENT_TIMESTAMP}] Document processing failed:`, error);
        return NextResponse.json({
            success: false,
            error: 'Document processing failed',
            timestamp: CURRENT_TIMESTAMP
        }, { status: 500 });
    }
}