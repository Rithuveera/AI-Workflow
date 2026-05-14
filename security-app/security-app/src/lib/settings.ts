import fs from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");
const SETTINGS_FILE = path.join(DATA_DIR, "settings.json");

export interface AppSettings {
    aiProvider: "gemini-2.0-flash" | "gemini-flash-latest" | "gemini-pro-latest" | "openai" | "claude";
    sensitivity: "strict" | "standard";
    emailAlerts: boolean;
    weeklyReports: boolean;
    emailAddress?: string;
}

const DEFAULT_SETTINGS: AppSettings = {
    aiProvider: "gemini-2.0-flash",
    sensitivity: "standard",
    emailAlerts: true,
    weeklyReports: false,
};

function ensureDataDir() {
    if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
    }
}

export async function getSettings(): Promise<AppSettings> {
    ensureDataDir();
    if (!fs.existsSync(SETTINGS_FILE)) {
        // Create default file
        fs.writeFileSync(SETTINGS_FILE, JSON.stringify(DEFAULT_SETTINGS, null, 2));
        return DEFAULT_SETTINGS;
    }

    try {
        const fileContent = fs.readFileSync(SETTINGS_FILE, "utf-8");
        const settings = JSON.parse(fileContent);
        return { ...DEFAULT_SETTINGS, ...settings }; // Merge to ensure all keys exist
    } catch (error) {
        console.error("Error reading settings:", error);
        return DEFAULT_SETTINGS;
    }
}

export async function saveSettings(newSettings: Partial<AppSettings>) {
    ensureDataDir();
    const currentSettings = await getSettings();
    const updatedSettings = { ...currentSettings, ...newSettings };

    fs.writeFileSync(SETTINGS_FILE, JSON.stringify(updatedSettings, null, 2));
    return updatedSettings;
}
