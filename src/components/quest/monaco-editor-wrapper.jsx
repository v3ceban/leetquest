import { useRef } from "react";
import PropTypes from "prop-types";
import { Editor } from "@monaco-editor/react";
import { createHighlighter } from "shiki";
import { shikiToMonaco } from "@shikijs/monaco";

const MonacoEditorWrapper = ({ defaultValue, onCodeChange }) => {
  const editorRef = useRef(null);

  const handleEditorDidMount = async (editor, monaco) => {
    editorRef.current = editor;

    // Load Shiki highlighter
    const highlighter = await createHighlighter({
      themes: ["dark-plus"],
      langs: ["python"],
    });

    // Register Python language
    monaco.languages.register({ id: "python" });

    // Apply Shiki highlighter to Monaco
    shikiToMonaco(highlighter, monaco);

    // Set editor options
    editor.updateOptions({
      language: "python",
      theme: "dark-plus",
      automaticLayout: true,
      minimap: { enabled: false },
      lineNumbers: "on",
      stickyScroll: { enabled: false },
      scrollbar: { vertical: "hidden" },
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
      height="300px"
      defaultValue={defaultValue} // Use the passed default value
      defaultLanguage="python"
      theme="dark-plus"
      onMount={handleEditorDidMount}
      onChange={(value) => onCodeChange(value)} // Pass the editor's value to the parent
    />
  );
};
MonacoEditorWrapper.propTypes = {
  defaultValue: PropTypes.string.isRequired,
  onCodeChange: PropTypes.func.isRequired,
};

export default MonacoEditorWrapper;
