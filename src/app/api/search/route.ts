import { NextResponse } from 'next/server';
import { VectorSearchService } from '@/services/search/vector-search';

const CURRENT_TIMESTAMP = '2025-05-17 06:42:24';
const CURRENT_USER = 'Vishnusan58';

export async function POST(req: Request) {
    try {
        const { query, topK = 5 } = await req.json();

        if (!query) {
            return NextResponse.json({
                success: false,
                error: 'Query is required',
                timestamp: CURRENT_TIMESTAMP
            }, { status: 400 });
        }

        const searchService = VectorSearchService.getInstance();
        const results = await searchService.search(query, topK);

        return NextResponse.json({
            success: true,
            results,
            metadata: {
                timestamp: CURRENT_TIMESTAMP,
                query,
                topK,
                user: CURRENT_USER
            }
        });

    } catch (error) {
        console.error(`[${CURRENT_TIMESTAMP}] Search failed:`, error);
        return NextResponse.json({
            success: false,
            error: 'Search failed',
            timestamp: CURRENT_TIMESTAMP
        }, { status: 500 });
    }
}