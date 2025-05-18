import { NextResponse } from 'next/server';
import { DocumentProcessor } from '@/services/document/processor';
import { systemConfig } from '@/types/config';

export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        const file = formData.get('file') as File;
        const tenantId = formData.get('tenantId') as string;

        const processor = new DocumentProcessor();
        const buffer = Buffer.from(await file.arrayBuffer());

        const result = await processor.processDocument(tenantId, buffer);

        return NextResponse.json({
            ...result,
            uploadedBy: systemConfig.currentUser,
            uploadedAt: systemConfig.timestamp
        });
    } catch (error) {
        return NextResponse.json({
            error: 'Failed to process document',
            timestamp: systemConfig.timestamp
        }, { status: 500 });
    }
}