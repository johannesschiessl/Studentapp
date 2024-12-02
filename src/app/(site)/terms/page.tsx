import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function TermsPage() {
  return (
    <>
      <div className="relative mx-auto max-w-4xl p-6">
        <div className="mb-8 pt-8 text-center">
          <h1 className="text-3xl font-bold">
            Nutzungsbedingungen / Terms of Service
          </h1>
          <p className="mt-2 text-muted-foreground">
            Zuletzt aktualisiert / Last updated:{" "}
            {new Date().toLocaleDateString()}
          </p>
        </div>

        <Tabs defaultValue="de" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="de">Deutsch</TabsTrigger>
            <TabsTrigger value="en">English</TabsTrigger>
          </TabsList>

          <TabsContent value="de">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="acceptance">
                <AccordionTrigger>Annahme der Bedingungen</AccordionTrigger>
                <AccordionContent>
                  Durch den Zugriff auf oder die Nutzung von Student-App stimmen
                  Sie diesen Nutzungsbedingungen zu. Wenn Sie mit einem Teil der
                  Bedingungen nicht einverstanden sind, dürfen Sie den Dienst
                  nicht nutzen.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="description">
                <AccordionTrigger>Beschreibung des Dienstes</AccordionTrigger>
                <AccordionContent>
                  Student-App ist eine Webanwendung, die Schülern bei der
                  Verwaltung ihrer akademischen Zeitpläne, Stundenpläne und
                  zugehörigen Informationen hilft. Wir behalten uns das Recht
                  vor, den Dienst jederzeit ohne vorherige Ankündigung zu ändern
                  oder einzustellen.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="disclaimer">
                <AccordionTrigger>Haftungsausschluss</AccordionTrigger>
                <AccordionContent>
                  <p className="mb-2">
                    Der Dienst wird &quot;wie besehen&quot; und &quot;wie
                    verfügbar&quot; ohne jegliche Gewährleistung zur Verfügung
                    gestellt, einschließlich, aber nicht beschränkt auf:
                  </p>
                  <ul className="list-disc pl-6">
                    <li>Genauigkeit oder Zuverlässigkeit der Informationen</li>
                    <li>Ununterbrochener Zugang zum Dienst</li>
                    <li>Sicherheit des Dienstes</li>
                    <li>Eignung für einen bestimmten Zweck</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="limitation">
                <AccordionTrigger>Haftungsbeschränkung</AccordionTrigger>
                <AccordionContent>
                  Wir haften nicht für indirekte, zufällige, besondere, Folge-
                  oder Strafschäden, die sich aus Ihrer Nutzung oder Unfähigkeit
                  zur Nutzung des Dienstes ergeben. Dies schließt den Verlust
                  von Daten, Gewinnen oder anderen immateriellen Verlusten ein.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="user-obligations">
                <AccordionTrigger>Nutzerpflichten</AccordionTrigger>
                <AccordionContent>
                  <p className="mb-2">Sie verpflichten sich:</p>
                  <ul className="list-disc pl-6">
                    <li>Genaue Informationen bereitzustellen</li>
                    <li>Die Sicherheit Ihres Kontos zu gewährleisten</li>
                    <li>Den Dienst nicht zu missbrauchen</li>
                    <li>Keine geltenden Gesetze zu verletzen</li>
                    <li>Den Betrieb des Dienstes nicht zu stören</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="termination">
                <AccordionTrigger>Kündigung</AccordionTrigger>
                <AccordionContent>
                  Wir können Ihren Zugang zum Dienst sofort und ohne vorherige
                  Ankündigung oder Haftung aus beliebigem Grund kündigen oder
                  aussetzen, einschließlich, aber nicht beschränkt auf einen
                  Verstoß gegen die Nutzungsbedingungen.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="changes">
                <AccordionTrigger>Änderungen der Bedingungen</AccordionTrigger>
                <AccordionContent>
                  Wir behalten uns das Recht vor, diese Bedingungen jederzeit zu
                  ändern oder zu ersetzen. Bei wesentlichen Änderungen werden
                  wir versuchen, mindestens 30 Tage vor Inkrafttreten der neuen
                  Bedingungen darüber zu informieren.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="contact">
                <AccordionTrigger>Kontaktinformationen</AccordionTrigger>
                <AccordionContent>
                  Bei Fragen zu diesen Nutzungsbedingungen kontaktieren Sie uns
                  bitte unter:{" "}
                  <a
                    href="mailto:contact@ignotum.dev"
                    className="text-primary hover:underline"
                  >
                    contact@ignotum.dev
                  </a>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </TabsContent>

          <TabsContent value="en">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="acceptance">
                <AccordionTrigger>Acceptance of Terms</AccordionTrigger>
                <AccordionContent>
                  By accessing or using Student-App, you agree to be bound by
                  these Terms of Service. If you disagree with any part of the
                  terms, you may not access the service.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="description">
                <AccordionTrigger>Description of Service</AccordionTrigger>
                <AccordionContent>
                  Student-App is a web application that helps students manage
                  their academic schedules, timetables, and related information.
                  We reserve the right to modify or discontinue the service at
                  any time without notice.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="disclaimer">
                <AccordionTrigger>Disclaimer of Warranties</AccordionTrigger>
                <AccordionContent>
                  <p className="mb-2">
                    The service is provided &ldquo;as is&rdquo; and &ldquo;as
                    available&rdquo; without warranties of any kind, either
                    express or implied, including but not limited to:
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
                  consequential, or punitive damages resulting from your use of
                  or inability to use the service. This includes loss of data,
                  profits, or other intangible losses.
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
                  whatsoever, including without limitation if you breach the
                  Terms.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="changes">
                <AccordionTrigger>Changes to Terms</AccordionTrigger>
                <AccordionContent>
                  We reserve the right to modify or replace these Terms at any
                  time. If a revision is material, we will try to provide at
                  least 30 days&apos; notice prior to any new terms taking
                  effect.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="contact">
                <AccordionTrigger>Contact Information</AccordionTrigger>
                <AccordionContent>
                  For any questions about these Terms of Service, please contact
                  us at:{" "}
                  <a
                    href="mailto:contact@ignotum.dev"
                    className="text-primary hover:underline"
                  >
                    contact@ignotum.dev
                  </a>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
