export interface SystemConfig {
    currentUser: string;
    timestamp: string;
    environment: 'development' | 'production';
}

export const systemConfig: SystemConfig = {
    currentUser: 'Vishnusan58',
    timestamp: '2025-05-17 04:50:08',
    environment: process.env.NODE_ENV as 'development' | 'production'}