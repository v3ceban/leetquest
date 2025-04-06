import { QuestProvider } from "@/components/quest/context";
import { Quest } from "@/components/quest/quest";

export default async function QuestPage() {
  return (
    <main className="overflow-hidden relative mt-2 rounded-xl max-h-[calc(100dvh-104px-20px)] bg-[--overlay]">
      <QuestProvider>
        <Quest />
      </QuestProvider>
    </main>
  );
}
