"use client";

import propTypes from "prop-types";
import { useContext, useRef, useState, useEffect } from "react";
import { QuestContext } from "./context";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { GripVertical, CircleX, CornerDownRight, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import LevelDescription from "@/components/quest/level-description";
import { useMobile } from "@/hooks/use-mobile";
import { saveNote } from "@/components/quest/fetch-data";
import { toast } from "sonner";

const ResizeHandle = ({ width = "12", height = "12", className }) => (
  <svg
    width={width}
    height={height}
    viewBox={`0 0 ${width} ${height}`}
    className={cn("text-foreground", className)}
  >
    <path
      d="M8 12H12V8L8 12ZM4 12H6L12 6V4L4 12ZM0 12H2L12 2V0L0 12Z"
      fill="currentColor"
    />
  </svg>
);
ResizeHandle.propTypes = {
  width: propTypes.string,
  height: propTypes.string,
  fill: propTypes.string,
  className: propTypes.string,
};

const getManualWindowState = () => {
  if (typeof window === "undefined") return null;
  try {
    return JSON.parse(
      localStorage.getItem("leetquest_manual_window") || "null",
    );
  } catch {
    return null;
  }
};

const setManualWindowState = (state) => {
  if (typeof window === "undefined") return;
  localStorage.setItem("leetquest_manual_window", JSON.stringify(state));
};

export const Manual = ({ open, onOpenChange }) => {
  const isMobile = useMobile();
  const { worldsData, selectedWorld, selectedLevelName } =
    useContext(QuestContext);

  const worldRefs = useRef({});
  const levelRefs = useRef({});

  const [position, setPosition] = useState(() => {
    const saved = getManualWindowState();
    return saved?.position || { x: 120, y: 80 };
  });
  const [size, setSize] = useState(() => {
    const saved = getManualWindowState();
    return saved?.size || { width: 420, height: 520 };
  });
  const [dragging, setDragging] = useState(false);
  const [resizing, setResizing] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const sizeStart = useRef({ width: 0, height: 0, x: 0, y: 0 });

  const positionRef = useRef(position);
  const sizeRef = useRef(size);

  const initialNotes = {};
  (worldsData || []).forEach((world) => {
    (world.levels || []).forEach((level) => {
      const note = level.user_levels?.[0]?.notes ?? "";
      initialNotes[level.id] = note;
    });
  });
  const [notes, setNotesState] = useState(initialNotes);
  const [notesChanged, setNotesChanged] = useState({});
  const [savingNotes, setSavingNotes] = useState(false);

  const [openWorld, setOpenWorld] = useState(null);
  const [openLevel, setOpenLevel] = useState(null);

  useEffect(() => {
    if (selectedWorld) {
      setOpenWorld(selectedWorld);
    } else {
      setOpenWorld(null);
    }
  }, [selectedWorld]);

  useEffect(() => {
    if (selectedLevelName) {
      setOpenLevel(selectedLevelName);
    } else {
      setOpenLevel(null);
    }
  }, [selectedLevelName]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (openLevel && levelRefs.current[openLevel]) {
        levelRefs.current[openLevel].scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      } else if (openWorld && worldRefs.current[openWorld]) {
        worldRefs.current[openWorld].scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }, 200);
    return () => clearTimeout(timeout);
  }, [openWorld, openLevel]);

  useEffect(() => {
    setManualWindowState({ position, size });
    positionRef.current = position;
    sizeRef.current = size;
  }, [position, size]);

  useEffect(() => {
    if (open) {
      const saved = getManualWindowState();
      if (saved) {
        setPosition(saved.position);
        setSize(saved.size);
        positionRef.current = saved.position;
        sizeRef.current = saved.size;
      } else {
        setPosition({ x: 120, y: 80 });
        setSize({ width: 420, height: 520 });
        positionRef.current = { x: 120, y: 80 };
        sizeRef.current = { width: 420, height: 520 };
      }
    }
  }, [open]);

  useEffect(() => {
    if (!dragging && !resizing) return;

    const handleMouseMove = (e) => {
      window.getSelection().removeAllRanges();
      if (dragging) {
        const newX = e.clientX - dragStart.current.x;
        const newY = e.clientY - dragStart.current.y;
        positionRef.current = { x: newX, y: newY };
        document.getElementById("leetquest-manual-window").style.left =
          `${newX}px`;
        document.getElementById("leetquest-manual-window").style.top =
          `${newY}px`;
      }
      if (resizing) {
        const newWidth = Math.max(
          320,
          sizeStart.current.width + e.clientX - sizeStart.current.x,
        );
        const newHeight = Math.max(
          320,
          sizeStart.current.height + e.clientY - sizeStart.current.y,
        );
        sizeRef.current = { width: newWidth, height: newHeight };
        document.getElementById("leetquest-manual-window").style.width =
          `${newWidth}px`;
        document.getElementById("leetquest-manual-window").style.height =
          `${newHeight}px`;
      }
    };
    const handleMouseUp = () => {
      setDragging(false);
      setResizing(false);
      const win = document.getElementById("leetquest-manual-window");
      if (win) {
        const { innerWidth, innerHeight } = window;
        const rect = win.getBoundingClientRect();
        let { x, y } = positionRef.current;
        const width = rect.width;
        const height = rect.height;

        if (x < 0) x = 0;
        if (y < 0) y = 0;
        if (x + width > innerWidth) x = Math.max(0, innerWidth - width);
        if (y + height > innerHeight) y = Math.max(0, innerHeight - height);

        if (x !== positionRef.current.x || y !== positionRef.current.y) {
          positionRef.current = { x, y };
          win.style.left = `${x}px`;
          win.style.top = `${y}px`;
        }
        setPosition({ ...positionRef.current });
      }

      setSize({ ...sizeRef.current });
    };
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [dragging, resizing]);

  const unlockedWorlds = (worldsData || []).filter((w) => w.isWorldUnlocked);

  const getUnlockedLevels = (world) =>
    (world.levels || []).filter(
      (lvl) => lvl.user_levels?.[0]?.unlocked || lvl.unlocked,
    );

  const handleNoteChange = (levelId, value) => {
    setNotesState((prev) => ({
      ...prev,
      [levelId]: value,
    }));
    setNotesChanged((prev) => ({
      ...prev,
      [levelId]: true,
    }));
  };

  const handleNoteBlur = async (levelId) => {
    if (notesChanged[levelId]) {
      const prevNote =
        (worldsData || [])
          .flatMap((world) => world.levels || [])
          .find((level) => level.id === levelId)?.user_levels?.[0]?.notes ?? "";
      if (!savingNotes) {
        try {
          setSavingNotes(true);
          await saveNote(levelId, notes[levelId]);
          setNotesChanged((prev) => ({
            ...prev,
            [levelId]: false,
          }));
        } catch {
          setNotesState((prev) => ({
            ...prev,
            [levelId]: prevNote,
          }));
          setNotesChanged((prev) => ({
            ...prev,
            [levelId]: false,
          }));
          toast.error("Failed to save note. Please try again.");
        } finally {
          setSavingNotes(false);
        }
      }
    }
  };

  const handleManualClose = async () => {
    for (const levelId of Object.keys(notesChanged)) {
      if (notesChanged[levelId]) {
        const prevNote =
          (worldsData || [])
            .flatMap((world) => world.levels || [])
            .find((level) => level.id === levelId)?.user_levels?.[0]?.notes ??
          "";
        if (!savingNotes) {
          try {
            setSavingNotes(true);
            await saveNote(levelId, notes[levelId]);
          } catch {
            setNotesState((prev) => ({
              ...prev,
              [levelId]: prevNote,
            }));
            toast.error("Failed to save note. Please try again.");
          } finally {
            setSavingNotes(false);
          }
        }
      }
    }
    setNotesChanged({});
    onOpenChange(false);
  };

  if (!open) return null;

  return (
    <article
      id="leetquest-manual-window"
      className={cn(
        "fixed z-[100] transition-transform duration-100 shadow shadow-black/75 border border-[--surface-2] bg-[--surface-1] rounded-xl flex flex-col",
        !isMobile &&
          dragging &&
          "shadow-black/75 shadow-md scale-[1.01] motion-reduce:scale-100",
        isMobile && "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
      )}
      style={
        isMobile
          ? {
              left: "50%",
              top: "50%",
              width: "95vw",
              height: "90vh",
              minWidth: 0,
              minHeight: 0,
              maxWidth: "95vw",
              maxHeight: "90vh",
            }
          : {
              left: position.x,
              top: position.y,
              width: size.width,
              height: size.height,
              minWidth: 320,
              minHeight: 320,
              maxWidth: "90vw",
              maxHeight: "90vh",
            }
      }
    >
      <header
        className={cn(
          "flex items-center justify-between px-4 sm:px-6 py-2 border-b border-[--surface-2] select-none bg-[--surface-1] rounded-t-xl",
          !isMobile && "cursor-grab",
          !isMobile && dragging && "cursor-grabbing",
        )}
        {...(!isMobile && {
          onMouseDown: (e) => {
            setDragging(true);
            dragStart.current = {
              x: e.clientX - positionRef.current.x,
              y: e.clientY - positionRef.current.y,
            };
          },
        })}
      >
        <h2 className="flex gap-2 items-center text-lg font-semibold">
          {!isMobile && (
            <GripVertical className="mr-1 w-4 h-4 text-muted-foreground" />
          )}
          Manual
        </h2>
        <CircleX
          onClick={async (e) => {
            e.preventDefault();
            e.stopPropagation();
            await handleManualClose();
          }}
          className="w-6 h-6 cursor-pointer hover:text-primary"
        />
      </header>
      <main className="overflow-y-auto flex-1 py-4 px-4 space-y-6 sm:px-6">
        {unlockedWorlds.length === 0 && (
          <p className="py-8 text-center text-muted-foreground">
            No unlocked worlds yet.
          </p>
        )}
        <Accordion
          type="single"
          collapsible
          value={openWorld || ""}
          onValueChange={(val) => setOpenWorld(val || null)}
          className="w-full"
        >
          {unlockedWorlds.map((world) => (
            <AccordionItem
              key={world.id}
              value={world.name}
              className="mb-2 rounded-md border-none bg-[--surface-2]"
              ref={(el) => {
                if (el) worldRefs.current[world.name] = el;
              }}
            >
              <AccordionTrigger className="py-2 px-4 text-lg font-bold rounded-lg text-primary">
                <span className="flex gap-2 items-center">
                  <BookOpen className="w-5 h-5" />
                  {world.name}
                </span>
              </AccordionTrigger>
              <AccordionContent className="pb-2">
                <div className="px-2 space-y-4">
                  {getUnlockedLevels(world).length === 0 && (
                    <div className="pl-2 text-sm text-muted-foreground">
                      No unlocked levels yet.
                    </div>
                  )}
                  <Accordion
                    type="single"
                    collapsible
                    value={
                      openWorld === world.name && openLevel ? openLevel : ""
                    }
                    onValueChange={(val) =>
                      setOpenLevel(
                        openWorld === world.name ? val || null : null,
                      )
                    }
                    className="w-full"
                  >
                    {getUnlockedLevels(world).map((level) => (
                      <AccordionItem
                        key={level.id}
                        value={level.name}
                        className="mb-2 rounded border-none bg-[--surface-1]"
                        ref={(el) => {
                          if (el) levelRefs.current[level.name] = el;
                        }}
                      >
                        <AccordionTrigger className="py-1 px-2 font-semibold rounded">
                          <span className="flex gap-2 items-center text-left">
                            <CornerDownRight className="w-4 h-4 text-muted-foreground" />
                            {level.title || level.name}
                          </span>
                        </AccordionTrigger>
                        <AccordionContent>
                          <LevelDescription
                            className="py-4 px-6 text-sm prose"
                            rawHtml={level.description}
                            skipCode
                          />
                          <Textarea
                            className="block mx-6 w-[calc(100%-3rem)] placeholder:text-background placeholder:opacity-70 border-[--surface-2] bg-[--light] text-background"
                            placeholder="Your notes..."
                            value={notes[level.id] || ""}
                            onChange={(e) =>
                              handleNoteChange(level.id, e.target.value)
                            }
                            onBlur={() => handleNoteBlur(level.id)}
                          />
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </main>
      {!isMobile && (
        <div
          className="flex absolute right-0 bottom-0 z-10 justify-center items-center w-6 h-6 cursor-se-resize"
          onMouseDown={(e) => {
            setResizing(true);
            sizeStart.current = {
              width: sizeRef.current.width,
              height: sizeRef.current.height,
              x: e.clientX,
              y: e.clientY,
            };
            e.stopPropagation();
          }}
        >
          <ResizeHandle />
        </div>
      )}
    </article>
  );
};

Manual.propTypes = {
  open: propTypes.bool.isRequired,
  onOpenChange: propTypes.func.isRequired,
};
