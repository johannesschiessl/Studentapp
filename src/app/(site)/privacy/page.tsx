import Link from "next/link";
import { X } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function PrivacyPage() {
  return (
    <>
      <Link
        href="/"
        className="fixed right-6 top-6 z-50 rounded-full bg-background p-3 shadow-sm hover:bg-gray-100 dark:hover:bg-gray-800"
      >
        <X className="h-6 w-6" />
      </Link>

      <div className="relative mx-auto max-w-4xl p-6">
        <div className="mb-8 pt-8 text-center">
          <h1 className="text-3xl font-bold">Privacy Policy</h1>
          <p className="mt-2 text-muted-foreground">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="overview">
            <AccordionTrigger>Overview</AccordionTrigger>
            <AccordionContent>
              This Privacy Policy explains how Student-App (&ldquo;we&rdquo;,
              &ldquo;us&rdquo;, &ldquo;our&rdquo;) collects, uses, and protects
              your personal information. By using our service, you agree to the
              collection and use of information in accordance with this policy.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="data-collection">
            <AccordionTrigger>Information We Collect</AccordionTrigger>
            <AccordionContent>
              <p className="mb-2">
                We collect and store the following types of information:
              </p>
              <ul className="list-disc pl-6">
                <li>Account information (email, name)</li>
                <li>School year data and academic information</li>
                <li>Schedule and timetable information</li>
                <li>User preferences and settings</li>
                <li>Usage data and analytics</li>
              </ul>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="data-storage">
            <AccordionTrigger>Data Storage and Processing</AccordionTrigger>
            <AccordionContent>
              <p className="mb-2">
                We use the following services to store and process your data:
              </p>
              <ul className="list-disc pl-6">
                <li>Supabase for database hosting and authentication</li>
                <li>Vercel for application hosting and deployment</li>
                <li>All data is stored in compliance with GDPR regulations</li>
              </ul>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="cookies">
            <AccordionTrigger>Cookies and Tracking</AccordionTrigger>
            <AccordionContent>
              We use cookies and similar tracking technologies to track activity
              on our service and hold certain information. Cookies are files
              with small amount of data that may include an anonymous unique
              identifier.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="data-security">
            <AccordionTrigger>Data Security</AccordionTrigger>
            <AccordionContent>
              We implement appropriate security measures to protect against
              unauthorized access, alteration, disclosure, or destruction of
              your personal information. However, no method of transmission over
              the Internet is 100% secure.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="data-rights">
            <AccordionTrigger>Your Data Rights</AccordionTrigger>
            <AccordionContent>
              <p className="mb-2">You have the right to:</p>
              <ul className="list-disc pl-6">
                <li>Access your personal data</li>
                <li>Correct inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Export your data</li>
                <li>Withdraw consent</li>
              </ul>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="contact">
            <AccordionTrigger>Contact Information</AccordionTrigger>
            <AccordionContent>
              For any questions about this Privacy Policy, please contact us at:{" "}
              <a
                href="mailto:contact.johannes@icloud.com"
                className="text-primary hover:underline"
              >
                contact.johannes@icloud.com
              </a>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </>
  );
}
