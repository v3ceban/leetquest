import { useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { Editor } from "@monaco-editor/react";
import { createHighlighter } from "shiki";
import { shikiToMonaco } from "@shikijs/monaco";

const lineHeight = 18;

const MonacoEditorWrapper = ({ defaultValue, onCodeChange, setEditorHeight, editorHeight, fixedHeight }) => {
  const editorRef = useRef(null);

  if (!fixedHeight) {
    useEffect(() => {
      const lineCount = defaultValue.split("\n").length;
      setEditorHeight(lineCount * lineHeight);
    }, [defaultValue, setEditorHeight]);
  }

  const handleEditorDidMount = async (editor, monaco) => {
    editorRef.current = editor;

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
      scrollBeyondLastLine: false,
    });
    

  };

  return (
    <Editor
      height={`${editorHeight}px`}
      defaultValue={defaultValue}
      defaultLanguage="python"
      theme="dark-plus"
      onMount={handleEditorDidMount}
      onChange={(value) => onCodeChange(value)}
    />
  );
};

MonacoEditorWrapper.propTypes = {
  defaultValue: PropTypes.string.isRequired,
  onCodeChange: PropTypes.func.isRequired,
  setEditorHeight: PropTypes.func,
  editorHeight: PropTypes.number.isRequired,
  fixedHeight: PropTypes.bool,
};

export default MonacoEditorWrapper;