'use client';

import { Trash2 } from "lucide-react";
import { deleteReportAction } from "@/app/reports/actions";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface DeleteReportButtonProps {
    id: string;
    redirectPath?: string;
}

export default function DeleteReportButton({ id, redirectPath }: DeleteReportButtonProps) {
    const router = useRouter();
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (!confirm("Are you sure you want to delete this report?")) return;

        setIsDeleting(true);
        try {
            await deleteReportAction(id);
            if (redirectPath) {
                router.push(redirectPath);
            }
        } catch (error) {
            console.error("Failed to delete report:", error);
            alert("Failed to delete report. Please try again.");
            setIsDeleting(false);
        }
    };

    return (
        <button
            onClick={handleDelete}
            disabled={isDeleting}
            className={`text-slate-500 hover:text-red-400 p-2 transition-colors ${isDeleting ? 'opacity-50 cursor-not-allowed' : ''}`}
            title="Delete Report"
        >
            <Trash2 className="h-4 w-4" />
        </button>
    );
}
