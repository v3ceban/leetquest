"use client";

import propTypes from "prop-types";
import { useContext, useRef, useState, useEffect } from "react";
import { QuestContext } from "./context";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { GripVertical, X, Move, CornerDownRight, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";

const ResizeHandle = ({
  width = "12",
  height = "12",
  fill = "currentColor",
  className,
}) => (
  <svg
    width={width}
    height={height}
    viewBox={`0 0 ${width} ${height}`}
    className="text-gray-400"
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

const getNotes = () => {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem("leetquest_manual_notes") || "{}");
  } catch {
    return {};
  }
};

const setNotes = (notes) => {
  if (typeof window === "undefined") return;
  localStorage.setItem("leetquest_manual_notes", JSON.stringify(notes));
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

  const [notes, setNotesState] = useState(getNotes());

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
    setNotes(notes);
  }, [notes]);

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
  };

  if (!open) return null;

  return (
    <article
      id="leetquest-manual-window"
      className={cn(
        "fixed z-[100] transition-transform duration-100 shadow shadow-black/75 border border-[--surface-2] bg-[--surface-1] rounded-xl flex flex-col",
        dragging &&
          "shadow-black/75 shadow-md scale-[1.01] motion-reduce:scale-100",
      )}
      style={{
        left: position.x,
        top: position.y,
        width: size.width,
        height: size.height,
        minWidth: 320,
        minHeight: 320,
        maxWidth: "90vw",
        maxHeight: "90vh",
      }}
    >
      <header
        className={cn(
          "flex items-center justify-between px-4 py-2 border-b border-[--surface-2] cursor-grab select-none bg-[--surface-1] rounded-t-xl",
          dragging && "cursor-grabbing",
        )}
        onMouseDown={(e) => {
          setDragging(true);
          dragStart.current = {
            x: e.clientX - positionRef.current.x,
            y: e.clientY - positionRef.current.y,
          };
        }}
      >
        <h2 className="flex gap-2 items-center text-lg font-semibold">
          <GripVertical className="mr-1 w-4 h-4 text-muted-foreground" />
          Manual
        </h2>
        <Button
          size="icon"
          variant="ghost"
          className="rounded-full"
          onClick={() => onOpenChange(false)}
        >
          <X className="w-5 h-5" />
        </Button>
      </header>
      <main className="overflow-y-auto flex-1 p-4 space-y-6">
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
              className="mb-2 rounded-lg border-none bg-[--surface-2]"
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
              <AccordionContent>
                <div className="px-2 pb-2 space-y-4">
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
                        <AccordionTrigger className="py-1 px-2 font-medium rounded">
                          <span className="flex gap-2 items-center">
                            <CornerDownRight className="w-4 h-4 text-muted-foreground" />
                            {level.title || level.name}
                          </span>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div
                            dangerouslySetInnerHTML={{
                              __html: level.description,
                            }}
                            className="px-6 pt-4 text-sm text-muted-foreground"
                          ></div>
                          <Textarea
                            className="block mx-6 w-[calc(100%-3rem)]"
                            placeholder="Your notes..."
                            value={notes[level.id] || ""}
                            onChange={(e) =>
                              handleNoteChange(level.id, e.target.value)
                            }
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
      <div
        className="flex absolute right-1 bottom-1 z-10 justify-center items-center w-6 h-6 cursor-se-resize"
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
    </article>
  );
};

Manual.propTypes = {
  open: propTypes.bool.isRequired,
  onOpenChange: propTypes.func.isRequired,
};
