import { QuestProvider } from "@/components/quest/context";
import { Quest } from "@/components/quest/quest";

export default async function QuestPage() {
  return (
    <main className="relative overflow-hidden max-h-[calc(100dvh-104px-20px)] bg-[--overlay] rounded-xl">
      <QuestProvider>
        <Quest />
      </QuestProvider>
    </main>
  );
}
