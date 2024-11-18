import Link from "next/link";
import { X } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function TermsPage() {
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
          <h1 className="text-3xl font-bold">Terms of Service</h1>
          <p className="mt-2 text-muted-foreground">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="acceptance">
            <AccordionTrigger>Acceptance of Terms</AccordionTrigger>
            <AccordionContent>
              By accessing or using Student-App, you agree to be bound by these
              Terms of Service. If you disagree with any part of the terms, you
              may not access the service.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="description">
            <AccordionTrigger>Description of Service</AccordionTrigger>
            <AccordionContent>
              Student-App is a web application that helps students manage their
              academic schedules, timetables, and related information. We
              reserve the right to modify or discontinue the service at any time
              without notice.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="disclaimer">
            <AccordionTrigger>Disclaimer of Warranties</AccordionTrigger>
            <AccordionContent>
              <p className="mb-2">
                The service is provided &ldquo;as is&rdquo; and &ldquo;as
                available&rdquo; without warranties of any kind, either express
                or implied, including but not limited to:
              </p>
              <ul className="list-disc pl-6">
                <li>Accuracy or reliability of any information</li>
                <li>Uninterrupted access to the service</li>
                <li>Security of the service</li>
                <li>Fitness for a particular purpose</li>
              </ul>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="limitation">
            <AccordionTrigger>Limitation of Liability</AccordionTrigger>
            <AccordionContent>
              We shall not be liable for any indirect, incidental, special,
              consequential, or punitive damages resulting from your use of or
              inability to use the service. This includes loss of data, profits,
              or other intangible losses.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="user-obligations">
            <AccordionTrigger>User Obligations</AccordionTrigger>
            <AccordionContent>
              <p className="mb-2">You agree to:</p>
              <ul className="list-disc pl-6">
                <li>Provide accurate information</li>
                <li>Maintain the security of your account</li>
                <li>Not misuse the service</li>
                <li>Not violate any applicable laws</li>
                <li>Not interfere with the service&apos;s operation</li>
              </ul>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="termination">
            <AccordionTrigger>Termination</AccordionTrigger>
            <AccordionContent>
              We may terminate or suspend your access to the service
              immediately, without prior notice or liability, for any reason
              whatsoever, including without limitation if you breach the Terms.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="changes">
            <AccordionTrigger>Changes to Terms</AccordionTrigger>
            <AccordionContent>
              We reserve the right to modify or replace these Terms at any time.
              If a revision is material, we will try to provide at least 30
              days&apos; notice prior to any new terms taking effect.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="contact">
            <AccordionTrigger>Contact Information</AccordionTrigger>
            <AccordionContent>
              For any questions about these Terms of Service, please contact us
              at:{" "}
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
