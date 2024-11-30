"use client";

import { importSharedSubjects } from "@/app/actions/sharing";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/hooks/use-translation";
import { SharedItem, SharedSubject } from "@/types/sharing";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import SubjectIcon from "@/components/shared/subject-icon";
import { getCurrentSchoolYearId } from "@/app/actions/school-year";

interface ImportSharedSubjectsProps {
  sharedItem: SharedItem;
}

export function ImportSharedSubjects({
  sharedItem,
}: ImportSharedSubjectsProps) {
  const { t } = useTranslation();
  const router = useRouter();
  const [isImporting, setIsImporting] = useState(false);

  if (sharedItem.type !== "subject") {
    return <div>{t("share.error.invalidType")}</div>;
  }

  const handleImport = async () => {
    try {
      setIsImporting(true);
      const currentSchoolYearId = await getCurrentSchoolYearId();

      await importSharedSubjects({
        sharedItemId: sharedItem.id,
        schoolYearId: currentSchoolYearId,
      });

      toast.success(t("share.success"));
      router.push("/subjects");
    } catch (error) {
      toast.error(t("share.error.failed"));
    } finally {
      setIsImporting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-2">
        <Label>{t("share.preview")}</Label>
        <div className="space-y-4 rounded-lg border p-4">
          {(sharedItem.data as SharedSubject[]).map((subject, index) => (
            <div key={index} className="flex items-center gap-3">
              <SubjectIcon
                icon={subject.icon}
                color={subject.color}
                size="default"
              />
              <div>
                <span className="font-medium">{subject.name}</span>
                {subject.teacher && (
                  <p className="text-sm text-muted-foreground">
                    {subject.teacher}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <Button onClick={handleImport} disabled={isImporting} className="w-full">
        {isImporting ? t("share.importing") : t("share.import")}
      </Button>
    </div>
  );
}
