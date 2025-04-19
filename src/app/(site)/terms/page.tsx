import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function TermsPage() {
  return (
    <>
      <div className="relative mx-auto max-w-4xl p-6">
        <div className="mb-8 pt-8 text-center">
          <h1 className="text-3xl font-bold">Nutzungsbedingungen</h1>
          <p className="mt-2 text-muted-foreground">
            Zuletzt aktualisiert: 12.01.2025
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="acceptance">
            <AccordionTrigger>Annahme der Bedingungen</AccordionTrigger>
            <AccordionContent>
              Durch den Zugriff auf oder die Nutzung von Studentapp stimmen Sie
              diesen Nutzungsbedingungen zu. Wenn Sie mit einem Teil der
              Bedingungen nicht einverstanden sind, dürfen Sie den Dienst nicht
              nutzen.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="description">
            <AccordionTrigger>Beschreibung des Dienstes</AccordionTrigger>
            <AccordionContent>
              Studentapp ist eine Webanwendung, die Schülern bei der Verwaltung
              ihrer Hausaufgaben, Prüfungen, Stundenpläne und zugehörigen
              Informationen hilft. Wir behalten uns das Recht vor, den Dienst
              jederzeit ohne vorherige Ankündigung zu ändern oder einzustellen.
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
              Wir haften nicht für indirekte, zufällige, besondere, Folge- oder
              Strafschäden, die sich aus Ihrer Nutzung oder Unfähigkeit zur
              Nutzung des Dienstes ergeben. Dies schließt den Verlust von Daten,
              Gewinnen oder anderen immateriellen Verlusten ein.
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
              aussetzen, einschließlich, aber nicht beschränkt auf einen Verstoß
              gegen die Nutzungsbedingungen.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="changes">
            <AccordionTrigger>Änderungen der Bedingungen</AccordionTrigger>
            <AccordionContent>
              Wir behalten uns das Recht vor, diese Bedingungen jederzeit zu
              ändern oder zu ersetzen. Bei wesentlichen Änderungen werden wir
              versuchen, mindestens 30 Tage vor Inkrafttreten der neuen
              Bedingungen darüber zu informieren.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="contact">
            <AccordionTrigger>Kontaktinformationen</AccordionTrigger>
            <AccordionContent>
              Bei Fragen zu diesen Nutzungsbedingungen kontaktieren Sie uns
              bitte unter:{" "}
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
