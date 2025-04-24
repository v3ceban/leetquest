import CodeTrier from "src/components/quest/code-trier.jsx";
import React from "react";
import ReactDOMServer from "react-dom/server";

const renderCodeTrierToString = (defaultEditorValue) => {
  return ReactDOMServer.renderToString(
    <CodeTrier defaultEditorValue={defaultEditorValue} />
  );
};

const htmlString = renderCodeTrierToString("console.log('Hello, World!');");
console.log(htmlString);




// -----

import parse from "html-react-parser";

const replacePlaceholders = (node) => {
  if (node.type === "tag" && node.name === "CodeTrier") {
    const defaultEditorValue = node.attribs.defaultEditorValue;
    console.log("defaultEditorValue", defaultEditorValue);
    return <CodeTrier defaultEditorValue={defaultEditorValue} />;
  }
};

const LevelDescription = ({ rawHtml }) => {
  return <>{parse(rawHtml, { replace: replacePlaceholders })}</>;
};

// --- 

// import ReactDOMServer from "react-dom/server";

// const renderContentWithComponents = (htmlContent) => {
//   return htmlContent.replace(
//     /<CodeTrier defaultEditorValue="<!\[CDATA\[(.*?)\]\]>"\s*\/?>/gs,
//     (_, defaultEditorValue) => {
//       const componentHtml = ReactDOMServer.renderToString(
//         <CodeTrier defaultEditorValue={defaultEditorValue} />
//       );
//       return componentHtml;
//     }
//   );
// };

// <!-- <CodeTrier defaultEditorValue="hash_set = {1, 2, 3}&#10;print(&quot;hash_set =&quot;, hash_set)&#10;&#10;hash_set.add(4)&#10;print(&quot;after adding 4, hash_set =&quot;, hash_set)&#10;&#10;hash_set.add(2)&#10;print(&quot;after attempting to add 2, hash_set =&quot;, hash_set)&#10;&#10;hash_set.remove(2)&#10;print(&quot;after removing 2, hash_set =&quot;, hash_set)&#10;&#10;print(&quot;3 in hash_set is&quot;, 3 in hash_set)&#10;print(&quot;2 in hash_set is&quot;, 2 in hash_set)"/> -->