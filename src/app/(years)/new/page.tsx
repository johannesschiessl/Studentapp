"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import * as z from "zod";
import { Loader2 } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { createSchoolYear } from "@/app/actions/school-year";
import { useTranslation } from "@/hooks/use-translation";

export default function NewYearPage() {
  const { t } = useTranslation();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const formSchema = z.object({
    class: z.coerce
      .number({
        invalid_type_error: t("years.class_error"),
      })
      .min(1, t("years.class_error"))
      .max(13, t("years.class_error"))
      .refine((val) => !isNaN(val), {
        message: t("years.class_error"),
      }),
    grading_system: z.string().default("de_full_grades"),
    vacation_region: z.string().default("de_baden_wuerttemberg"),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      grading_system: "de_full_grades",
      vacation_region: "de_baden_wuerttemberg",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);
      await createSchoolYear(values);
      router.push("/home");
    } catch (error) {
      console.error("Failed to create school year:", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <div className="mb-8 pt-8 text-center">
        <h1 className="text-3xl font-bold">{t("years.create_new")}</h1>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="class"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("years.class")}</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormDescription>
                  {t("years.class_description")}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="grading_system"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("years.grading")}</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder={t("years.select_grading")} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="de_full_grades">
                      {t("years.full_grades")}
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="vacation_region"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("years.region")}</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue="de_baden_wuerttemberg"
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder={t("years.select_region")} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="de_baden_wuerttemberg">
                      Baden-Württemberg, Deutschland
                    </SelectItem>
                    <SelectItem value="de_bayern">
                      Bayern, Deutschland
                    </SelectItem>
                    <SelectItem value="de_berlin">
                      Berlin, Deutschland
                    </SelectItem>
                    <SelectItem value="de_bremen">
                      Bremen, Deutschland
                    </SelectItem>
                    <SelectItem value="de_hamburg">
                      Hamburg, Deutschland
                    </SelectItem>
                    <SelectItem value="de_hessen">
                      Hessen, Deutschland
                    </SelectItem>
                    <SelectItem value="de_mecklenburg_vorpommern">
                      Mecklenburg-Vorpommern, Deutschland
                    </SelectItem>
                    <SelectItem value="de_niedersachsen">
                      Niedersachsen, Deutschland
                    </SelectItem>
                    <SelectItem value="de_nordrhein_westfalen">
                      Nordrhein-Westfalen, Deutschland
                    </SelectItem>
                    <SelectItem value="de_rheinland_pfalz">
                      Rheinland-Pfalz, Deutschland
                    </SelectItem>
                    <SelectItem value="de_saarland">
                      Saarland, Deutschland
                    </SelectItem>
                    <SelectItem value="de_sachsen_anhalt">
                      Sachsen-Anhalt, Deutschland
                    </SelectItem>
                    <SelectItem value="de_sachsen">
                      Sachsen, Deutschland
                    </SelectItem>
                    <SelectItem value="de_schleswig_holstein">
                      Schleswig-Holstein, Deutschland
                    </SelectItem>
                    <SelectItem value="de_thueringen">
                      Thüringen, Deutschland
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            size="lg"
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="mr-2">{t("common.creating")}</span>
                <Loader2 className="h-4 w-4 animate-spin" />
              </>
            ) : (
              t("common.create")
            )}
          </Button>
        </form>
      </Form>
    </>
  );
}
