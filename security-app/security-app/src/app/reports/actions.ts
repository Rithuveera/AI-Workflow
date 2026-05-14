'use server';

import { deleteReport } from "@/lib/store";
import { revalidatePath } from "next/cache";

export async function deleteReportAction(id: string) {
    await deleteReport(id);
    revalidatePath('/reports');
}
