"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import * as z from "zod";
import Link from "next/link";
import { X, Loader2 } from "lucide-react";
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

const formSchema = z.object({
  class: z.coerce.number().min(1).max(13),
  grading_system: z.string().default("de_full_grades"),
  vacation_region: z.string().default("de_bavaria"),
});

export default function NewYearPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      grading_system: "de_full_grades",
      vacation_region: "de_bavaria",
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
      <Link
        href="/years"
        className="fixed right-6 top-6 z-50 rounded-full bg-background p-3 shadow-sm hover:bg-gray-100 dark:hover:bg-gray-800"
      >
        <X className="h-6 w-6" />
      </Link>

      <div className="relative mx-auto max-w-2xl p-6">
        <div className="mb-8 pt-8 text-center">
          <h1 className="text-3xl font-bold">Create New School Year</h1>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="class"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Class</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormDescription>
                    Enter your class number (1-13)
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
                  <FormLabel>Grading System</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select grading system" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="de_full_grades">
                        Full Grades (1-6)
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
                  <FormLabel>Vacation Region</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select region" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="de_bavaria">
                        Bavaria, Germany
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
                  <span className="mr-2">Creating...</span>
                  <Loader2 className="h-4 w-4 animate-spin" />
                </>
              ) : (
                "Create School Year"
              )}
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
}
