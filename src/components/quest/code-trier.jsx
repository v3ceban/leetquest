import { useState } from "react";
import PropTypes from "prop-types";
import MonacoEditorWrapper from "./monaco-editor-wrapper";
import executeCode from "./execution-api";
import { Button } from "@/components/ui/button";
import { Loading } from "@/components/ui/spinner";
// import { QuestContext } from "@/components/quest/context";

const lineHeight = 18;

const CodeTrier = ({ defaultPythonCode }) => {
  // const { levelFull } = useContext(QuestContext);

  const [stdout, setStdout] = useState("");
  const [stderr, setStderr] = useState("");
  const [code, setCode] = useState(defaultPythonCode);
  const [loading, setLoading] = useState(false);
  const [editorHeight, setEditorHeight] = useState(lineHeight);

  const handleTry = async () => {
    setLoading(true);
    try {
      const result = await executeCode(code);
      setStdout(result.run.stdout);
      setStderr(result.run.stderr);
    } catch (error) {
      setStderr("Error executing code: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-2 mx-auto w-full">
      <div className="flex justify-center">
        <Button
          onClick={handleTry}
          className="bg-foreground text-background"
          variant="outline"
          disabled={loading}
        >
          {loading ? <Loading /> : "Try"}
        </Button>
      </div>
      <div className="flex flex-wrap justify-center items-center w-full">
        <div className="basis-1/2 min-w-[400px]">
          <MonacoEditorWrapper
            defaultValue={defaultPythonCode}
            onCodeChange={setCode}
            setEditorHeight={setEditorHeight}
            editorHeight={editorHeight}
          />
        </div>
        <div className="basis-1/2 min-w-[400px]">
          <div
            className="editor-terminal"
            style={{ height: `${editorHeight}px` }}
          > {/* If needed, just print output, rather than stdout and stderr, to preserve order e.g. if there's stderr before stdout */}
            <pre>
              {stdout}
              <span className="stderr">{stderr}</span>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

CodeTrier.propTypes = {
  defaultPythonCode: PropTypes.string.isRequired,
};

export default CodeTrier;