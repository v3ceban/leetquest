import { useState } from "react";
import PropTypes from "prop-types";
import MonacoEditorWrapper from "./monaco-editor-wrapper";
import executeCode from "./execution-api";
import { Button } from "@/components/ui/button";
import { Loading } from "@/components/ui/spinner";
import TestCase from "./test-case";

const lineHeight = 18;
const defaultLineCount = 15;

const CodeJudger = ({ defaultPythonCode, testCases }) => {
  const [code, setCode] = useState(defaultPythonCode);
  const [testCaseStates, setTestCaseStates] = useState(testCases);
  const [loading, setLoading] = useState(false);
  const editorHeight = lineHeight * defaultLineCount;
  // const [editorHeight, setEditorHeight] = useState(lineHeight * defaultLineCount);

  // update if there's race condition issues
  const handleJudge = async () => {
    // Reset test cases by removing stdout, stderr, and setting isJudging to true
    setTestCaseStates((prevStates) =>
      prevStates.map((tc) => ({
        ...tc,
        stdout: undefined,
        stderr: undefined,
        isJudging: true, // Mark as being judged
      }))
    );
  
    setLoading(true);
  
    for (let index = 0; index < testCaseStates.length; index++) {
      const testCase = testCaseStates[index];
      try {
        const result = await executeCode(code, testCase.stdin);
        setTestCaseStates((prevStates) =>
          prevStates.map((tc, i) =>
            i === index
              ? {
                  ...tc,
                  stdout: result.run?.stdout || "", // Fallback to empty string
                  stderr: result.run?.stderr || "", // Fallback to empty string
                  isJudging: false, // Mark as judged
                }
              : tc
          )
        );
      } catch (error) {
        setTestCaseStates((prevStates) =>
          prevStates.map((tc, i) =>
            i === index
              ? {
                  ...tc,
                  stderr: error.message,
                  isJudging: false, // Mark as judged
                }
              : tc
          )
        );
      }
  
      // Add a 200 ms delay (with a little buffer) before moving to the next test case
      await new Promise((resolve) => setTimeout(resolve, 220));
    }
  
    setLoading(false);
  };

  return (
    <div className="flex flex-col gap-2 mx-auto w-full">
      <div className="flex justify-center">
        <Button
          onClick={handleJudge}
          className="bg-foreground text-background"
          variant="outline"
          disabled={loading}
        >
          {loading ? <Loading /> : "Judge"}
        </Button>
      </div>
      <div className="flex flex-wrap justify-center items-center w-full">
        <div className="basis-1/2 min-w-[400px]">
          <MonacoEditorWrapper
            defaultValue={defaultPythonCode}
            onCodeChange={setCode}
            editorHeight={editorHeight}
            fixedHeight={true}
          />
        </div>
        <div
          className="basis-1/2 min-w-[400px] flex flex-col gap-2 overflow-y-auto"
          style={{ height: `${editorHeight}px` }}
        >
          {testCaseStates.map((testCase, i) => (
            <TestCase
              key={i}
              number={i + 1}
              testCase={testCase}
            />
          ))}
        </div>
      </div>
    </div>
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
    })
  ).isRequired,
};

export default CodeJudger;