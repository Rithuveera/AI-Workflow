"use server";

import { AppSettings, saveSettings } from "@/lib/settings";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function updateSettings(formData: FormData) {
    console.log("=== Form Data Debug ===");
    console.log("aiProvider:", formData.get("aiProvider"));
    console.log("sensitivity:", formData.get("sensitivity"));
    console.log("emailAlerts raw:", formData.get("emailAlerts"));
    console.log("weeklyReports raw:", formData.get("weeklyReports"));

    const rawSettings: Partial<AppSettings> = {
        aiProvider: formData.get("aiProvider") as any,
        sensitivity: formData.get("sensitivity") as any,
        emailAlerts: formData.get("emailAlerts") === "on",
        weeklyReports: formData.get("weeklyReports") === "on",
        emailAddress: formData.get("emailAddress") as string || undefined,
    };

    console.log("Parsed settings:", rawSettings);

    const result = await saveSettings(rawSettings);
    console.log("Saved settings:", result);

    revalidatePath("/settings");
    redirect("/settings?saved=true");
}
