"use client";

import PropTypes from "prop-types";
import executeCode from "./execution-api";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";
import { Editor } from "@monaco-editor/react";
import { Loading } from "@/components/ui/spinner";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { createHighlighter } from "shiki";
import { shikiToMonaco } from "@shikijs/monaco";
import { useContext, useState } from "react";
import { cn } from "@/lib/utils";
import { QuestContext } from "./context";

const CodeTabs = ({
  defaultPythonCode,
  code,
  setCode,
  loading,
  onSubmit,
  outputTabLabel,
  activeTab,
  setActiveTab,
  children,
}) => {
  const handleEditorDidMount = async (editor, monaco) => {
    const highlighter = await createHighlighter({
      themes: ["dark-plus"],
      langs: ["python"],
    });

    monaco.languages.register({ id: "python" });

    shikiToMonaco(highlighter, monaco);

    editor.updateOptions({
      language: "python",
      theme: "dark-plus",
      minimap: { enabled: false },
      lineNumbers: "on",
      automaticLayout: true,
      stickyScroll: { enabled: false },
      scrollbar: { vertical: "hidden", horizontal: "hidden" },
      overviewRulerBorder: false,
      overviewRulerLanes: 0,
      folding: false,
      lineNumbersMinChars: 3,
      selectOnLineNumbers: false,
      "bracketPairColorization.enabled": false,
      scrollBeyondLastLine: true,
    });
  };

  return (
    <Tabs
      value={activeTab}
      onValueChange={setActiveTab}
      className="w-full flex flex-col h-[calc(100%-96px)]"
    >
      <TabsList className="grid grid-cols-2 mb-4">
        <TabsTrigger value="code">Code</TabsTrigger>
        <TabsTrigger value="output">{outputTabLabel}</TabsTrigger>
      </TabsList>
      <TabsContent
        className="p-4 h-[calc(100%-64px)] rounded-md bg-[#1e1e1e]"
        value="code"
      >
        <Editor
          defaultValue={defaultPythonCode}
          value={code}
          defaultLanguage="python"
          theme="dark-plus"
          onMount={handleEditorDidMount}
          onChange={setCode}
        />
      </TabsContent>
      <TabsContent className="h-full" value="output">
        {children}
      </TabsContent>
      <footer className="grid gap-4 mt-4 sm:grid-cols-2">
        {activeTab === "output" ? (
          <>
            <DialogClose asChild>
              <Button
                onClick={() => {
                  setCode(defaultPythonCode);
                  setActiveTab("code");
                }}
                variant="outline"
              >
                Reset
              </Button>
            </DialogClose>
            <Button
              className="bg-foreground text-background"
              onClick={() => setActiveTab("code")}
            >
              Back to Code
            </Button>
          </>
        ) : (
          <>
            <Button
              variant="outline"
              onClick={() => {
                setCode(defaultPythonCode);
              }}
            >
              Reset
            </Button>
            <Button
              onClick={onSubmit}
              className="bg-foreground text-background"
              disabled={loading}
            >
              {loading ? <Loading /> : "Run Code"}
            </Button>
          </>
        )}
      </footer>
    </Tabs>
  );
};
CodeTabs.propTypes = {
  defaultPythonCode: PropTypes.string.isRequired,
  code: PropTypes.string.isRequired,
  setCode: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  submitLabel: PropTypes.string.isRequired,
  outputTabLabel: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  activeTab: PropTypes.string.isRequired,
  setActiveTab: PropTypes.func.isRequired,
};

const CodeTrier = ({ defaultPythonCode }) => {
  const [stdout, setStdout] = useState("");
  const [stderr, setStderr] = useState("");
  const [code, setCode] = useState(defaultPythonCode);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("code");

  const handleTry = async () => {
    setLoading(true);
    try {
      const result = await executeCode(code);
      setStdout(result.run.stdout);
      setStderr(result.run.stderr);
      setActiveTab("output");
    } catch (error) {
      setStderr("Error executing code: " + error.message);
      setActiveTab("output");
    } finally {
      setLoading(false);
    }
  };

  return (
    <CodeTabs
      defaultPythonCode={defaultPythonCode}
      code={code}
      setCode={setCode}
      loading={loading}
      onSubmit={handleTry}
      outputTabLabel="Output"
      activeTab={activeTab}
      setActiveTab={setActiveTab}
    >
      <pre className="overflow-scroll p-4 h-full rounded-md bg-[#1e1e1e]">
        {stdout.trim().length > 0 ? (
          stdout
        ) : (
          <span className="text-gray-500">Please run the code first</span>
        )}
        <span className="stderr">{stderr}</span>
      </pre>
    </CodeTabs>
  );
};
CodeTrier.propTypes = {
  defaultPythonCode: PropTypes.string.isRequired,
};

const CodeJudger = ({ defaultPythonCode, testCases }) => {
  const [code, setCode] = useState(defaultPythonCode);
  const [testCaseStates, setTestCaseStates] = useState(testCases);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("code");

  const handleJudge = async () => {
    setTestCaseStates((prevStates) =>
      prevStates.map((tc) => ({
        ...tc,
        stdout: undefined,
        stderr: undefined,
        isJudging: true,
      })),
    );

    setLoading(true);
    setActiveTab("output");

    for (let index = 0; index < testCaseStates.length; index++) {
      const testCase = testCaseStates[index];
      try {
        const result = await executeCode(code, testCase.stdin);
        setTestCaseStates((prevStates) =>
          prevStates.map((tc, i) =>
            i === index
              ? {
                  ...tc,
                  stdout: result.run?.stdout || "",
                  stderr: result.run?.stderr || "",
                  isJudging: false,
                }
              : tc,
          ),
        );
      } catch (error) {
        setTestCaseStates((prevStates) =>
          prevStates.map((tc, i) =>
            i === index
              ? {
                  ...tc,
                  stderr: error.message,
                  isJudging: false,
                }
              : tc,
          ),
        );
      }

      await new Promise((resolve) => setTimeout(resolve, 220));
    }

    setLoading(false);
  };

  return (
    <CodeTabs
      defaultPythonCode={defaultPythonCode}
      code={code}
      setCode={setCode}
      loading={loading}
      onSubmit={handleJudge}
      outputTabLabel="Test Cases"
      activeTab={activeTab}
      setActiveTab={setActiveTab}
    >
      <section className="grid overflow-auto grid-cols-3 gap-4 w-full">
        {testCaseStates.map((testCase, i) => {
          const lastItem = i === testCaseStates.length - 1;
          return (
            <TestCase
              key={i}
              number={i + 1}
              testCase={testCase}
              colPosition={(i % 3) + 1}
              isLast={lastItem}
            />
          );
        })}
      </section>
    </CodeTabs>
  );
};
CodeJudger.propTypes = {
  defaultPythonCode: PropTypes.string.isRequired,
  testCases: PropTypes.arrayOf(
    PropTypes.shape({
      hidden: PropTypes.bool.isRequired,
      input: PropTypes.string.isRequired,
      expectedOutput: PropTypes.string.isRequired,
      output: PropTypes.string,
      error: PropTypes.string,
    }),
  ).isRequired,
};

const TestCase = ({ number, testCase, colPosition, isLast }) => {
  const { hidden, stdin, expectedStdout, stdout, stderr, isJudging } = testCase;
  const attempted = stderr !== undefined || stdout !== undefined;

  const isCorrect = stdout?.trimEnd() === expectedStdout?.trimEnd();

  return (
    <Card
      className={cn(
        "p-4 rounded-md border shadow-md",
        isLast && colPosition === 1
          ? "col-span-3"
          : isLast && colPosition === 2 && "col-span-2",
      )}
    >
      <h3 className="font-bold text-lg flex items-center gap-2 !no-underline">
        Test Case {number}
        {isJudging ? (
          <span className="text-yellow-500">⏳</span>
        ) : attempted ? (
          isCorrect ? (
            <span className="text-green-500">✔</span>
          ) : (
            <span className="text-red-500">✘</span>
          )
        ) : null}
      </h3>
      {hidden ? (
        <p>Secret</p>
      ) : (
        <>
          <div>
            <strong>Input</strong>
            <pre className="inline-terminal">{stdin}</pre>
          </div>
          <div>
            <strong>Expected</strong>
            <pre className="inline-terminal">{expectedStdout}</pre>
          </div>
          <div>
            <strong>Output</strong>
            <pre className="inline-terminal">
              {stdout !== undefined ? stdout : " "}
              <span className="stderr">{stderr}</span>
            </pre>
          </div>
        </>
      )}
    </Card>
  );
};

TestCase.propTypes = {
  number: PropTypes.number.isRequired,
  testCase: PropTypes.shape({
    hidden: PropTypes.bool.isRequired,
    stdin: PropTypes.string.isRequired,
    expectedStdout: PropTypes.string.isRequired,
    stdout: PropTypes.string,
    stderr: PropTypes.string,
    isJudging: PropTypes.bool,
  }).isRequired,
  colPosition: PropTypes.number,
  isLast: PropTypes.bool,
};

export const CodeModal = ({ type, defaultPythonCode, testCases }) => {
  const { selectedWorldData, selectedLevelName } = useContext(QuestContext);
  const selectedLevelTitle =
    selectedWorldData && selectedLevelName
      ? selectedWorldData.find(({ name }) => name === selectedLevelName)?.title
      : null;
  return (
    <Dialog modal={false}>
      <DialogTrigger asChild>
        <Button className="flex mx-auto mt-8 bg-foreground text-background">
          View in Code Editor
        </Button>
      </DialogTrigger>
      <DialogContent
        showBackdrop
        className="flex flex-col w-full max-w-5xl sm:rounded-none lg:rounded-lg h-[90vh]"
      >
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            {selectedLevelTitle ?? "Try Code"}
          </DialogTitle>
        </DialogHeader>
        {type === "codetrier" ? (
          <CodeTrier defaultPythonCode={defaultPythonCode} />
        ) : (
          <CodeJudger
            defaultPythonCode={defaultPythonCode}
            testCases={testCases}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};
CodeModal.propTypes = {
  type: PropTypes.oneOf(["codejudger", "codetrier"]).isRequired,
  defaultPythonCode: PropTypes.string.isRequired,
  testCases: PropTypes.arrayOf(
    PropTypes.shape({
      hidden: PropTypes.bool.isRequired,
      input: PropTypes.string.isRequired,
      expectedOutput: PropTypes.string.isRequired,
      output: PropTypes.string,
      error: PropTypes.string,
    }),
  ),
};
