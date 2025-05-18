// lib/types.ts

// Defines the structure for coverage details within an insurance plan.
export interface CoverageDetail {
    label: string;        // e.g., "Physician Visit", "Emergency Room Care"
    inNetwork: string;    // Cost or coverage details for in-network providers
    outOfNetwork: string; // Cost or coverage details for out-of-network providers
}

// Defines the structure for an insurance plan.
// This can be used for displaying plan recommendations or details.
export interface InsurancePlan {
    planName: string;                 // Name of the insurance plan, e.g., "Horizon Platinum"
    summary?: string;                 // A brief summary or description of the plan
    coverageDetails?: CoverageDetail[]; // An array of specific coverage details
    // You can add other plan-specific properties here, e.g.:
    // deductible?: string | number;
    // outOfPocketMax?: string | number;
    // providerNetworkUrl?: string;
}

// Defines the core structure for a chat message.
// This is the base type that ChatInterface.tsx will use (as ChatAppMessage).
export interface Message {
    id: string;                     // Unique identifier for the message
    type: 'user' | 'bot';           // Sender of the message
    content: string;                // Text content of the message
    timestamp: string;              // ISO string representing when the message was created/sent
    recommendations?: InsurancePlan[]; // Optional: Array of insurance plans recommended by the bot
    confidence?: number;            // Optional: Bot's confidence score for the response (0 to 1)
    options?: string[];             // Optional: Array of quick reply options for the user
    // Add any other common message properties you might need
    // For example, if the bot can send images or other rich content:
    // attachments?: Array<{ type: 'image' | 'file'; url: string; name?: string }>;
}

// You can also define other shared types here as your application grows.
// For example, if the API returns a specific error structure:
// export interface ApiError {
//   code: string;
//   message: string;
//   details?: any;
// }
