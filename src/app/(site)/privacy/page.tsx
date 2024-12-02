import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function PrivacyPage() {
  return (
    <>
      <div className="relative mx-auto max-w-4xl p-6">
        <div className="mb-8 pt-8 text-center">
          <h1 className="text-3xl font-bold">
            Datenschutzerklärung / Privacy Policy
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
              <AccordionItem value="overview">
                <AccordionTrigger>Überblick</AccordionTrigger>
                <AccordionContent>
                  Diese Datenschutzerklärung erläutert, wie Student-App
                  (&ldquo;wir&rdquo;, &ldquo;uns&rdquo;, &ldquo;unser&rdquo;)
                  Ihre personenbezogenen Daten erfasst, verwendet und schützt.
                  Durch die Nutzung unseres Dienstes stimmen Sie der Erfassung
                  und Verwendung von Informationen gemäß dieser Richtlinie zu.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="data-collection">
                <AccordionTrigger>
                  Informationen, die wir sammeln
                </AccordionTrigger>
                <AccordionContent>
                  <p className="mb-2">
                    Wir erfassen und speichern folgende Arten von Informationen:
                  </p>
                  <ul className="list-disc pl-6">
                    <li>Kontoinformationen (E-Mail, Name)</li>
                    <li>Schuljahrdaten und akademische Informationen</li>
                    <li>Stundenplan- und Zeitplaninformationen</li>
                    <li>Benutzereinstellungen</li>
                    <li>Nutzungsdaten und Analysen</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="data-storage">
                <AccordionTrigger>
                  Datenspeicherung und -verarbeitung
                </AccordionTrigger>
                <AccordionContent>
                  <p className="mb-2">
                    Wir nutzen folgende Dienste zur Speicherung und Verarbeitung
                    Ihrer Daten:
                  </p>
                  <ul className="list-disc pl-6">
                    <li>
                      Supabase für Datenbank-Hosting und Authentifizierung
                    </li>
                    <li>Vercel für Anwendungs-Hosting und Bereitstellung</li>
                    <li>Alle Daten werden DSGVO-konform gespeichert</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="cookies">
                <AccordionTrigger>Cookies und Tracking</AccordionTrigger>
                <AccordionContent>
                  Wir verwenden Cookies und ähnliche Tracking-Technologien, um
                  Aktivitäten auf unserem Dienst zu verfolgen und bestimmte
                  Informationen zu speichern. Cookies sind Dateien mit einer
                  kleinen Datenmenge, die möglicherweise eine anonyme eindeutige
                  Kennung enthalten.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="data-security">
                <AccordionTrigger>Datensicherheit</AccordionTrigger>
                <AccordionContent>
                  Wir setzen angemessene Sicherheitsmaßnahmen ein, um vor
                  unbefugtem Zugriff, Änderung, Offenlegung oder Zerstörung
                  Ihrer persönlichen Daten zu schützen. Allerdings ist keine
                  Übertragungsmethode über das Internet zu 100% sicher.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="data-rights">
                <AccordionTrigger>Ihre Datenschutzrechte</AccordionTrigger>
                <AccordionContent>
                  <p className="mb-2">Sie haben das Recht auf:</p>
                  <ul className="list-disc pl-6">
                    <li>Zugriff auf Ihre persönlichen Daten</li>
                    <li>Korrektur ungenauer Daten</li>
                    <li>Löschung Ihrer Daten</li>
                    <li>Export Ihrer Daten</li>
                    <li>Widerruf der Einwilligung</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="analytics">
                <AccordionTrigger>Analytik und Tracking</AccordionTrigger>
                <AccordionContent>
                  <p className="mb-2">
                    Wir verwenden Posthog für Analysezwecke. Dies bedeutet:
                  </p>
                  <ul className="list-disc pl-6">
                    <li>
                      Anonymisierte Erfassung von Nutzungsstatistiken (z.B.
                      besuchte Seiten, Verweildauer)
                    </li>
                    <li>
                      Analyse von Funktionsnutzung zur Verbesserung der App
                    </li>
                    <li>Keine personenbezogene Verfolgung einzelner Nutzer</li>
                    <li>Datenverarbeitung in der EU gemäß DSGVO-Richtlinien</li>
                    <li>
                      Opt-out ist nur durch die Nichtnutzung der App möglich.
                    </li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="contact">
                <AccordionTrigger>Kontaktinformationen</AccordionTrigger>
                <AccordionContent>
                  Bei Fragen zu dieser Datenschutzerklärung kontaktieren Sie uns
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
              <AccordionItem value="overview">
                <AccordionTrigger>Overview</AccordionTrigger>
                <AccordionContent>
                  This Privacy Policy explains how Student-App
                  (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;)
                  collects, uses, and protects your personal information. By
                  using our service, you agree to the collection and use of
                  information in accordance with this policy.
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
                    We use the following services to store and process your
                    data:
                  </p>
                  <ul className="list-disc pl-6">
                    <li>Supabase for database hosting and authentication</li>
                    <li>Vercel for application hosting and deployment</li>
                    <li>
                      All data is stored in compliance with GDPR regulations
                    </li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="cookies">
                <AccordionTrigger>Cookies and Tracking</AccordionTrigger>
                <AccordionContent>
                  We use cookies and similar tracking technologies to track
                  activity on our service and hold certain information. Cookies
                  are files with small amount of data that may include an
                  anonymous unique identifier.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="data-security">
                <AccordionTrigger>Data Security</AccordionTrigger>
                <AccordionContent>
                  We implement appropriate security measures to protect against
                  unauthorized access, alteration, disclosure, or destruction of
                  your personal information. However, no method of transmission
                  over the Internet is 100% secure.
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

              <AccordionItem value="analytics">
                <AccordionTrigger>Analytics and Tracking</AccordionTrigger>
                <AccordionContent>
                  <p className="mb-2">
                    We use Posthog for analytics purposes. This means:
                  </p>
                  <ul className="list-disc pl-6">
                    <li>
                      Anonymous collection of usage statistics (e.g., pages
                      visited, time spent)
                    </li>
                    <li>Analysis of feature usage to improve the app</li>
                    <li>No personal tracking of individual users</li>
                    <li>
                      Data processing within the EU in compliance with GDPR
                    </li>
                    <li>
                      Option to opt-out only possible by not using the app
                    </li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="contact">
                <AccordionTrigger>Contact Information</AccordionTrigger>
                <AccordionContent>
                  For any questions about this Privacy Policy, please contact us
                  at:{" "}
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
