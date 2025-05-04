import { useContext, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "../ui/dialog";
import propTypes from "prop-types";
import { aiReviewRequest, aiSummarizeReviewRequest } from "./ai-request";
import Markdown from "react-markdown";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { QuestContext } from "./context";
import { saveNote } from "./fetch-data";
import { toast } from "sonner";
import { DialogClose } from "@radix-ui/react-dialog";
import { Loader2 } from "lucide-react";
import { Skeleton } from "../ui/skeleton";
import { useSession } from "next-auth/react";

export const AiReview = ({ title, description, className }) => {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const [aiResponse, setAiResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [summarizing, setSummarizing] = useState(false);
  const {
    setManualOpen,
    notes,
    setNotesState,
    selectedWorld,
    selectedLevelName,
    worldsData,
  } = useContext(QuestContext);

  const getLevelId = () => {
    if (!selectedWorld || !selectedLevelName || !worldsData) return null;
    const world = worldsData.find((w) => w.name === selectedWorld);
    if (!world) return null;
    const level = (world.levels || []).find(
      (lvl) => lvl.name === selectedLevelName,
    );
    return level?.id || null;
  };

  const generateAiResponse = async () => {
    const response = await aiReviewRequest({
      title,
      description,
      levelId: getLevelId(),
    });
    setAiResponse(response);
  };

  const handleClick = async () => {
    setManualOpen(false);
    setLoading(true);
    setOpen(true);
    if (aiResponse) {
      setAiResponse(aiResponse);
      setLoading(false);
    }
    try {
      await generateAiResponse();
    } catch {
      setAiResponse("Error fetching AI review.");
    } finally {
      setLoading(false);
    }
  };

  const handleSummarizeAndAdd = async () => {
    const levelId = getLevelId();
    if (!levelId) {
      toast.error("Could not determine the current level.");
      return;
    }
    setSummarizing(true);
    try {
      const summary = await aiSummarizeReviewRequest({
        reviewText: aiResponse,
        levelId,
      });
      const existingNote = notes[levelId] || "";
      const newNote =
        existingNote.trim().length > 0
          ? `${existingNote}\n${summary}`
          : summary;
      await saveNote(levelId, newNote);
      setNotesState((prev) => ({
        ...prev,
        [levelId]: newNote,
      }));
      toast.success("Summary added to your manual notes!");
      setManualOpen(true);
      setOpen(false);
    } catch {
      toast.error("Failed to summarize and save note.");
    } finally {
      setSummarizing(false);
    }
  };

  return (
    <>
      <Button
        onClick={handleClick}
        className={cn("bg-foreground text-background", className)}
        disabled={loading || summarizing || !session?.user}
      >
        {loading ? "Requesting..." : "AI Review"}
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="flex overflow-y-scroll flex-col w-full max-w-5xl sm:rounded-none lg:rounded-lg h-[90vh]">
          <DialogHeader>
            <DialogTitle>AI Review</DialogTitle>
            <DialogDescription>
              This is the AI-generated review of the problem statement. Please
              note that it can contain errors or inaccuracies. Use it as a
              reference and not as a definitive solution.
            </DialogDescription>
          </DialogHeader>
          {loading ? (
            <Skeleton className="flex flex-col gap-4 justify-center items-center mt-2 w-full h-96">
              <Loader2 className="w-10 h-10 animate-spin text-muted-foreground" />
              <p className="text-lg font-medium text-muted-foreground">
                Generating AI review...
              </p>
            </Skeleton>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>{title}</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-4 prose md-prose">
                <Markdown>{aiResponse ?? "No response."}</Markdown>
              </CardContent>
            </Card>
          )}
          <DialogFooter className={cn("gap-2 mt-4", loading && "hidden")}>
            <DialogClose asChild>
              <Button
                variant="outline"
                className="flex-1 bg-background text-foreground"
              >
                Close
              </Button>
            </DialogClose>
            <Button
              className="flex-1 bg-foreground text-background"
              disabled={loading || summarizing || !aiResponse}
              onClick={async () => {
                setAiResponse("");
                setLoading(true);
                try {
                  await generateAiResponse();
                } catch {
                  setAiResponse("Error fetching AI review.");
                } finally {
                  setLoading(false);
                }
              }}
            >
              {loading ? "Generating..." : "Regenerate AI Review"}
            </Button>
            <Button
              className="flex-1 bg-foreground text-background"
              disabled={loading || summarizing || !aiResponse}
              onClick={handleSummarizeAndAdd}
            >
              {summarizing ? "Summarizing..." : "Summarize & Add to Manual"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

AiReview.propTypes = {
  title: propTypes.string.isRequired,
  description: propTypes.string.isRequired,
  className: propTypes.string,
};
