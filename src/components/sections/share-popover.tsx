"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { ReactNode } from "react";
import { motion } from "framer-motion";
import {
  Share2,
  Copy,
  Check,
  MessageCircle,
  AtSign,
  QrCode,
  Instagram,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/hooks/use-translation";
import Image from "next/image";

const shareOptions = [
  {
    name: "instagram",
    icon: Instagram,
    color: "hover:bg-[#E4405F]/10 text-[#E4405F]",
    getUrl: (currentUrl: string) => `https://instagram.com?url=${currentUrl}`,
  },
  {
    name: "whatsapp",
    icon: MessageCircle,
    color: "hover:bg-[#25D366]/10 text-[#25D366]",
    getUrl: (currentUrl: string) =>
      `https://wa.me/?text=Hey, ich benutze gerade die Student-App und finde sie echt super! Probier sie doch auch mal aus: ${currentUrl}`,
  },
  {
    name: "threads",
    icon: AtSign,
    color: "hover:bg-black/10 dark:hover:bg-white/10 text-foreground",
    getUrl: (currentUrl: string) =>
      `https://threads.net/intent/post?text=Seit kurzem benutze ich die Student-App und finde sie echt super! Probiert sie doch auch mal aus: ${currentUrl}`,
  },
];

export default function SharePopover({ children }: { children: ReactNode }) {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);
  const [showQR, setShowQR] = useState(false);

  const getCurrentUrl = () => {
    if (typeof window === "undefined") return "";
    return window.location.origin + "?sharedFrom=studentapp";
  };

  const handleCopyLink = async () => {
    const url = getCurrentUrl();
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent side="bottom" align="start" className="w-80 p-3">
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-4"
        >
          <div className="space-y-2">
            <h3 className="flex items-center gap-2 font-semibold">
              <Share2 className="h-4 w-4" /> {t("share_studentapp")}
            </h3>
            <p className="text-sm text-muted-foreground">
              {t("share_studentapp.description")}
            </p>
          </div>

          <div className="grid gap-2">
            {shareOptions.map((option) => (
              <a
                key={option.name}
                href={option.getUrl(getCurrentUrl())}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "flex items-center gap-2 rounded-md p-2 transition-colors",
                  option.color,
                )}
              >
                <option.icon className="h-4 w-4" />
                <span className="text-sm">
                  {t(`share_studentapp.share_on.${option.name}`)}
                </span>
              </a>
            ))}

            <div className="flex gap-2">
              <Button
                variant="outline"
                className="mt-2 flex-1"
                onClick={handleCopyLink}
              >
                {copied ? (
                  <>
                    <Check className="mr-2 h-4 w-4" />
                    {t("common.copied")}
                  </>
                ) : (
                  <>
                    <Copy className="mr-2 h-4 w-4" />
                    {t("share_studentapp.copy")}
                  </>
                )}
              </Button>

              <Button
                variant="outline"
                className="mt-2"
                onClick={() => setShowQR(!showQR)}
              >
                <QrCode className="h-4 w-4" />
              </Button>
            </div>

            {showQR && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="mt-2"
              >
                <Image
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${getCurrentUrl()}`}
                  alt="QR Code"
                  width={150}
                  height={150}
                  className="mx-auto h-32 w-32 rounded-md"
                />
              </motion.div>
            )}
          </div>

          <div className="border-t pt-2 text-center text-xs text-muted-foreground">
            {t("share_studentapp.share_the_study_success")}
          </div>
        </motion.div>
      </PopoverContent>
    </Popover>
  );
}
