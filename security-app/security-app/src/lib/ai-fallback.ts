
import { GoogleGenerativeAI } from "@google/generative-ai";
import { getSettings } from "./settings";

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey || "");

/**
 * AI Model configuration with fallback priority
 * CRITICAL: Only use supported models to avoid 404 errors.
 * Currently supported: gemini-2.0-flash, gemini-flash-latest, gemini-pro-latest
 */
export const AI_MODELS = [
    "gemini-2.0-flash",          // Primary - next gen, fast and smart
    "gemini-flash-latest",       // Secondary - stable 1.5 flash
    "gemini-pro-latest",         // Tertiary - stable 1.5 pro
] as const;

export type AIModel = typeof AI_MODELS[number];

interface ModelAttempt {
    model: AIModel;
    timestamp: number;
    success: boolean;
    error?: string;
}

// Track model performance
const modelAttempts: ModelAttempt[] = [];

/**
 * Generate content with automatic model fallback
 */
export async function generateWithFallback(
    prompt: string,
    systemInstruction: string,
    options: {
        maxRetries?: number;
        preferredModel?: AIModel;
    } = {}
): Promise<{ text: string; modelUsed: AIModel }> {
    let { maxRetries = AI_MODELS.length, preferredModel } = options;

    if (!apiKey) {
        throw new Error("GEMINI_API_KEY not configured");
    }

    // Get preferred model from settings if not provided
    if (!preferredModel) {
        try {
            const settings = await getSettings();
            if (settings.aiProvider && AI_MODELS.includes(settings.aiProvider as any)) {
                preferredModel = settings.aiProvider as AIModel;
            }
        } catch (error) {
            console.error("[AI Fallback] Error fetching settings:", error);
        }
    }

    // Start with preferred model or default order
    const modelsToTry = preferredModel
        ? [preferredModel, ...AI_MODELS.filter(m => m !== preferredModel)]
        : [...AI_MODELS];

    let lastError: Error | null = null;
    let attemptsCount = 0;

    for (const modelName of modelsToTry) {
        if (attemptsCount >= maxRetries) break;
        attemptsCount++;

        try {
            console.log(`[AI Fallback] Attempting model: ${modelName}`);

            const model = genAI.getGenerativeModel({
                model: modelName,
                systemInstruction,
            });

            const result = await model.generateContent(prompt);
            const response = await result.response;
            const text = response.text();

            // Log success
            modelAttempts.push({
                model: modelName,
                timestamp: Date.now(),
                success: true,
            });

            console.log(`[AI Fallback] ✓ Success with model: ${modelName}`);
            return { text, modelUsed: modelName };

        } catch (error: any) {
            lastError = error;
            const errorMessage = error.message || String(error);

            // Log failure
            modelAttempts.push({
                model: modelName,
                timestamp: Date.now(),
                success: false,
                error: errorMessage,
            });

            console.error(`[AI Fallback] ✗ Failed with model ${modelName}:`, errorMessage);

            // Check if it's a quota error
            const isQuotaError = errorMessage.toLowerCase().includes("quota") ||
                errorMessage.toLowerCase().includes("rate limit") ||
                errorMessage.toLowerCase().includes("429");

            if (isQuotaError) {
                console.log(`[AI Fallback] Quota exceeded for ${modelName}, trying next model...`);
                continue;
            }

            // For non-quota errors (like 404), try next model instantly
            if (attemptsCount < modelsToTry.length) {
                await sleep(200);
                continue;
            }
        }
    }

    // All models failed
    throw new Error(
        `All AI models failed. Last error: ${lastError?.message || "Unknown error"}. ` +
        `Please check your API quota and verify GEMINI_API_KEY.`
    );
}

/**
 * Parse JSON response from AI with fallback cleaning
 */
export function parseAIResponse<T>(text: string): T {
    try {
        // Remove markdown code blocks if present
        let cleanJson = text.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
        cleanJson = cleanJson.trim();
        return JSON.parse(cleanJson);
    } catch (error) {
        console.error("[AI Fallback] JSON parse error:", error);
        console.error("[AI Fallback] Raw text:", text);
        // Fallback: try to find the first '{' and last '}'
        try {
            const firstBrace = text.indexOf('{');
            const lastBrace = text.lastIndexOf('}');
            if (firstBrace !== -1 && lastBrace !== -1) {
                const jsonSubstring = text.substring(firstBrace, lastBrace + 1);
                return JSON.parse(jsonSubstring);
            }
        } catch {
            // ignore fallback error
        }
        throw new Error(`Failed to parse AI response as JSON: ${error instanceof Error ? error.message : String(error)}`);
    }
}

/**
 * Get model performance statistics
 */
export function getModelStats(): Record<AIModel, { attempts: number; successes: number; failures: number; successRate: number }> {
    const stats: any = {};

    for (const model of AI_MODELS) {
        const attempts = modelAttempts.filter(a => a.model === model);
        const successes = attempts.filter(a => a.success).length;
        const failures = attempts.length - successes;

        stats[model] = {
            attempts: attempts.length,
            successes,
            failures,
            successRate: attempts.length > 0 ? (successes / attempts.length) * 100 : 0,
        };
    }

    return stats;
}

export function clearModelStats(): void {
    modelAttempts.length = 0;
}

function sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}
