"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "../ui/checkbox";
import { useTranslation } from "@/hooks/use-translation";
import { Subject } from "@/types/subjects";
import { useState } from "react";
import { shareSubjects } from "@/app/actions/sharing";
import { toast } from "sonner";
import { Share, Copy, RefreshCw } from "lucide-react";
import SubjectIcon from "@/components/shared/subject-icon";
import Image from "next/image";

interface ShareSubjectsDialogProps {
  subjects: Subject[];
}

export function ShareSubjectsDialog({ subjects }: ShareSubjectsDialogProps) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [selectedSubjects, setSelectedSubjects] = useState<number[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isSharing, setIsSharing] = useState(false);
  const [shareUrl, setShareUrl] = useState<string | null>(null);

  const handleShare = async () => {
    if (selectedSubjects.length === 0) {
      toast.error(t("subjects.share.error.noSelection"));
      return;
    }
    if (!title) {
      toast.error(t("subjects.share.error.noTitle"));
      return;
    }

    try {
      setIsSharing(true);
      const result = await shareSubjects({
        subjects: selectedSubjects,
        title,
        description,
      });

      const url = `${window.location.origin}/share/${result.id}`;
      setShareUrl(url);
      await navigator.clipboard.writeText(url);
      toast.success(t("subjects.share.success"));
    } catch (error) {
      toast.error(t("subjects.share.error.failed"));
    } finally {
      setIsSharing(false);
    }
  };

  const handleCopyLink = async () => {
    if (shareUrl) {
      await navigator.clipboard.writeText(shareUrl);
      toast.success(t("subjects.share.copied"));
    }
  };

  const handleStartOver = () => {
    setShareUrl(null);
    setSelectedSubjects([]);
    setTitle("");
    setDescription("");
  };

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    if (!newOpen) {
      // Reset form when dialog is closed
      handleStartOver();
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Share className="mr-2 h-4 w-4" />
          {t("subjects.share.button")}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{t("subjects.share.title")}</DialogTitle>
          <DialogDescription>
            {shareUrl
              ? t("subjects.share.shareOptions")
              : t("subjects.share.description")}
          </DialogDescription>
        </DialogHeader>

        {shareUrl ? (
          <div className="flex flex-col items-center space-y-6 py-4">
            <Image
              src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(
                shareUrl,
              )}`}
              alt="QR Code"
              className="rounded-lg"
              width={200}
              height={200}
            />
            <div className="flex w-full items-center space-x-2">
              <Input readOnly value={shareUrl} className="font-mono text-sm" />
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={handleCopyLink}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
            <Button
              type="button"
              variant="outline"
              onClick={handleStartOver}
              className="w-full"
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              {t("subjects.share.startOver")}
            </Button>
          </div>
        ) : (
          <>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">{t("subjects.share.form.title")}</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder={t("subjects.share.form.titlePlaceholder")}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">
                  {t("subjects.share.form.description")}
                </Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder={t("subjects.share.form.descriptionPlaceholder")}
                />
              </div>
              <div className="grid gap-2">
                <Label>{t("subjects.share.form.selectSubjects")}</Label>
                <div className="grid max-h-[200px] gap-2 overflow-y-auto">
                  {subjects.map((subject) => (
                    <div key={subject.id} className="flex items-center gap-3">
                      <Checkbox
                        id={`subject-${subject.id}`}
                        checked={selectedSubjects.includes(subject.id)}
                        onCheckedChange={(checked: boolean) => {
                          setSelectedSubjects(
                            checked
                              ? [...selectedSubjects, subject.id]
                              : selectedSubjects.filter(
                                  (id) => id !== subject.id,
                                ),
                          );
                        }}
                      />
                      <Label
                        htmlFor={`subject-${subject.id}`}
                        className="flex flex-1 cursor-pointer items-center gap-3"
                      >
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
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button
                type="submit"
                onClick={handleShare}
                disabled={isSharing || selectedSubjects.length === 0 || !title}
              >
                {isSharing
                  ? t("subjects.share.sharing")
                  : t("subjects.share.share")}
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
