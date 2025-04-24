import { useState } from "react";
import PropTypes from "prop-types";
import MonacoEditorWrapper from "./monaco-editor-wrapper";
import { executeCode } from "./execution-api";
import { Button } from "@/components/ui/button";
import { Loading } from "@/components/ui/spinner";

const CodeTrier = ({ defaultEditorValue }) => {
  const [stdout, setStdOut] = useState("");
  const [stderr, setStdErr] = useState("");
  const [code, setCode] = useState(defaultEditorValue);
  const [loading, setLoading] = useState(false);

  const handleExecuteCode = async () => {
    setLoading(true);
    try {
      const result = await executeCode(code);
      setStdOut(result.run.stdout);
      setStdErr(result.run.stderr);
    } catch (error) {
      setStdErr("Error executing code: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 mx-auto w-full">
      {/* <h2 className="text-xl text-center">Try messing with this code!</h2> */}
      <div className="flex flex-wrap justify-center items-center w-full">
        <div className="basis-1/2 min-w-[400px]">
          <MonacoEditorWrapper
            defaultValue={defaultEditorValue}
            onCodeChange={setCode}
          />
        </div>
        <div className="basis-1/2 min-w-[400px]">
          <div className="editor-terminal">
            <pre>
              {stdout}
              <span className="error">
                {stderr}
              </span>
            </pre>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <Button
          onClick={handleExecuteCode}
          className="bg-foreground text-background"
          variant="outline"
          disabled={loading}
        >
          {loading ? (
            <Loading />
          ) : (
            "Run"
          )}
        </Button>
      </div>
    </div>
  );
};

CodeTrier.propTypes = {
  defaultEditorValue: PropTypes.string.isRequired,
};

export default CodeTrier;