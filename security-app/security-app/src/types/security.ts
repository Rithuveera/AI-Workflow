// Security Analysis Types

export type ScanType = "quick" | "comprehensive";

export type ChecklistItemStatus = "pass" | "fail" | "warning" | "not_applicable";

export type SecuritySeverity = "Critical" | "High" | "Medium" | "Low" | "Safe";

export interface ChecklistItem {
    name: string;
    status: ChecklistItemStatus;
    severity?: SecuritySeverity;
    details: string;
    recommendation?: string;
    affectedCode?: string;
    fixCode?: string;
}

export interface CategoryResult {
    category: string;
    icon: string;
    color: string;
    score: number; // 0-100
    items: ChecklistItem[];
}

export interface SecurityHeaders {
    contentSecurityPolicy?: string;
    strictTransportSecurity?: string;
    xFrameOptions?: string;
    xContentTypeOptions?: string;
    referrerPolicy?: string;
    permissionsPolicy?: string;
    server?: string;
    xPoweredBy?: string;
}

export interface CookieAnalysis {
    name: string;
    hasHttpOnly: boolean;
    hasSecure: boolean;
    sameSite?: string;
    issues: string[];
}

export interface HeaderAnalysisResult {
    securityHeaders: SecurityHeaders;
    missingHeaders: string[];
    cookies: CookieAnalysis[];
    issues: ChecklistItem[];
    rawHeaders: Record<string, string>;
}

export interface ComprehensiveScanResult {
    scanType: ScanType;
    url: string;
    timestamp: string;
    duration: number; // in seconds
    overallScore: number; // 0-100
    severity: SecuritySeverity;
    summary: string;
    details: string;
    riskScore?: number; // 0-100 (where 100 is Max Risk)
    recommendation: string;
    categoryResults: CategoryResult[];
    headerAnalysis?: HeaderAnalysisResult;
    cached?: boolean; // Indicates if result was from cache
    modelUsed?: string; // AI model that performed the analysis
}

export interface QuickAnalysisResult {
    severity: SecuritySeverity;
    summary: string;
    details: string;
    recommendation: string;
    affected_lines?: string;
    modelUsed?: string; // AI model that performed the analysis
}

export type AnalysisResult = QuickAnalysisResult | ComprehensiveScanResult;

// AI Model Types
export type AIModel = "gemini-1.5-flash" | "gemini-1.5-pro";

export interface AIModelConfig {
    preferredModel?: AIModel;
    enableFallback: boolean;
    maxRetries: number;
}

// Cache Types
export interface CacheMetadata {
    timestamp: number;
    hash: string;
    expiresAt: number;
}

// Settings Types
export interface SecuritySettings {
    sensitivity: "strict" | "standard" | "relaxed";
    enableCache: boolean;
    cacheTTL: number; // in milliseconds
    aiModelConfig: AIModelConfig;
}

