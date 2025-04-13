import { QuestProvider } from "@/components/quest/context";
import { Quest } from "@/components/quest/quest";
import { fetchWorldsData } from "@/components/quest/fetch-data";

export default async function QuestPage() {
  const initialWorldsData = await fetchWorldsData();

  return (
    <main className="overflow-hidden relative mt-2 rounded-xl max-h-[calc(100dvh-104px-20px)] bg-[--overlay]">
      <QuestProvider initialWorldsData={initialWorldsData}>
        <Quest />
      </QuestProvider>
    </main>
  );
}
