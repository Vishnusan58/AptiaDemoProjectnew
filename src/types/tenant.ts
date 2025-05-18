interface Tenant {
    id: string;
    name: string;
    apiKey: string;
    config: {
        theme: {
            primary: string;
            secondary: string;
        };
        widgetPosition: 'left' | 'right';
        welcomeMessage: string;
    };
}

interface Document {
    id: string;
    tenantId: string;
    name: string;
    type: 'pdf' | 'doc' | 'txt';
    status: 'processing' | 'completed' | 'failed';
    vectorNamespace: string;
    createdAt: Date;
}