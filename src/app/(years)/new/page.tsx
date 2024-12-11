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
import BackButton from "@/components/shared/back-button";

export default function NewYearPage() {
  const { t } = useTranslation();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("de");

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
    country: z.string(),
    grading_system: z.string().default("de_full_grades"),
    vacation_region: z.string().default("de_baden_wuerttemberg"),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      grading_system: "de_full_grades",
      vacation_region: "de_baden_wuerttemberg",
      country: "de",
    },
  });

  const handleCountryChange = (value: string) => {
    setSelectedCountry(value);
    form.setValue(
      "vacation_region",
      value === "de" ? "de_baden_wuerttemberg" : "at_wien",
    );
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);
      await createSchoolYear({
        class: values.class,
        grading_system: values.grading_system,
        vacation_region: values.vacation_region,
      });
      router.push("/home");
    } catch (error) {
      console.error("Failed to create school year:", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <BackButton url="/years" />
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
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("years.country")}</FormLabel>
                <Select
                  onValueChange={(value) => {
                    field.onChange(value);
                    handleCountryChange(value);
                  }}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder={t("years.select_country")} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="de">Deutschland</SelectItem>
                    <SelectItem value="at">Österreich</SelectItem>
                    <SelectItem value="other">
                      {t("years.other_region")}
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
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder={t("years.select_region")} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {selectedCountry === "de" ? (
                      <>
                        <SelectItem value="de_baden_wuerttemberg">
                          Baden-Württemberg
                        </SelectItem>
                        <SelectItem value="de_bayern">Bayern</SelectItem>
                        <SelectItem value="de_berlin">Berlin</SelectItem>
                        <SelectItem value="de_bremen">Bremen</SelectItem>
                        <SelectItem value="de_hamburg">Hamburg</SelectItem>
                        <SelectItem value="de_hessen">Hessen</SelectItem>
                        <SelectItem value="de_mecklenburg_vorpommern">
                          Mecklenburg-Vorpommern
                        </SelectItem>
                        <SelectItem value="de_niedersachsen">
                          Niedersachsen
                        </SelectItem>
                        <SelectItem value="de_nordrhein_westfalen">
                          Nordrhein-Westfalen
                        </SelectItem>
                        <SelectItem value="de_rheinland_pfalz">
                          Rheinland-Pfalz
                        </SelectItem>
                        <SelectItem value="de_saarland">Saarland</SelectItem>
                        <SelectItem value="de_sachsen_anhalt">
                          Sachsen-Anhalt
                        </SelectItem>
                        <SelectItem value="de_sachsen">Sachsen</SelectItem>
                        <SelectItem value="de_schleswig_holstein">
                          Schleswig-Holstein
                        </SelectItem>
                        <SelectItem value="de_thueringen">Thüringen</SelectItem>
                      </>
                    ) : selectedCountry === "at" ? (
                      <>
                        <SelectItem value="at_wien">Wien</SelectItem>
                        <SelectItem value="at_niederoesterreich">
                          Niederösterreich
                        </SelectItem>
                        <SelectItem value="at_salzburg">Salzburg</SelectItem>
                        <SelectItem value="at_karnten">Kärnten</SelectItem>
                        <SelectItem value="at_oberoesterreich">
                          Oberösterreich
                        </SelectItem>
                        <SelectItem value="at_steiermark">
                          Steiermark
                        </SelectItem>
                        <SelectItem value="at_tirol">Tirol</SelectItem>
                        <SelectItem value="at_vorarlberg">
                          Vorarlberg
                        </SelectItem>
                        <SelectItem value="at_burgenland">
                          Burgenland
                        </SelectItem>
                      </>
                    ) : (
                      <SelectItem value="other">
                        {t("years.other_region")}
                      </SelectItem>
                    )}
                  </SelectContent>
                </Select>
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
                    <SelectItem value="at_full_grades">
                      {t("years.full_grades_1-5")}
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
