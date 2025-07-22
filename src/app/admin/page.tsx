import { BugFixTerminal } from "@/components/admin/BugFixTerminal";
import { ContentModerationTerminal } from "@/components/admin/ContentModerationTerminal";
import { CreatorManagementTerminal } from "@/components/admin/CreatorManagementTerminal";
import { FraudDetectionTerminal } from "@/components/admin/FraudDetectionTerminal";
import { MoodAnalysisTerminal } from "@/components/admin/MoodAnalysisTerminal";
import { PayoutsTerminal } from "@/components/admin/PayoutsTerminal";

export default function AdminDashboard() {
  return (
    <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
        <div className="xl:col-span-2">
            <BugFixTerminal />
        </div>
        <MoodAnalysisTerminal />
        <ContentModerationTerminal />
        <FraudDetectionTerminal />
        <CreatorManagementTerminal />
        <PayoutsTerminal />
    </div>
  );
}
