import { getSharedItem } from "@/app/actions/sharing";
import { ImportSharedSubjects } from "@/components/share/import-shared-subjects";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface SharePageProps {
  params: {
    id: string;
  };
}

export default async function SharePage({ params }: SharePageProps) {
  const sharedItem = await getSharedItem(params.id);

  return (
    <main className="flex w-full items-center justify-center pt-32">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>{sharedItem.title}</CardTitle>
          {sharedItem.description && (
            <CardDescription>{sharedItem.description}</CardDescription>
          )}
        </CardHeader>
        <CardContent>
          <ImportSharedSubjects sharedItem={sharedItem} />
        </CardContent>
      </Card>
    </main>
  );
}
