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



// -- if wanted, try to disable mouse wheel consumption if no overflow

scrollbar: { vertical: "hidden", alwaysConsumeMouseWheel: false, handleMouseWheel: false },

    // const container = editor.getDomNode();
    // if (container) {
    //   container.addEventListener("wheel", (event) => {
    //     // console.log("event.deltaY:", event.deltaY);
    //     // console.log("container.scrollTop:", container.scrollTop);
    //     // console.log("container.clientHeight:", container.clientHeight);
    //     // console.log("container.scrollHeight:", container.scrollHeight);
    //     // console.log("container.scrollWidth:", container.scrollWidth);
    //     // console.log("container.clientWidth:", container.clientWidth);

    //     // const isScrollable =
    //     //   container.scrollHeight > container.clientHeight || // Vertical overflow
    //     //   container.scrollWidth > container.clientWidth;    // Horizontal overflow
    //     const lineCount = editor.getModel().getLineCount();
    //     const isScrollable = lineCount * lineHeight > container.clientHeight;

    //     if (isScrollable) {
    //       const atTop = container.scrollTop === 0 && event.deltaY < 0;
    //       const atBottom =
    //         container.scrollTop + container.clientHeight >= container.scrollHeight &&
    //         event.deltaY > 0;

    //         console.log("atTop:", atTop, "atBottom:", atBottom);

    //       if (atTop || atBottom) {
    //         console.log("Overflow detected, preventing parent scrolling");

    //         event.preventDefault(); // Prevent scrolling the parent element

    //         // editor.updateOptions({
    //         //   scrollbar: {
    //         //     vertical: "auto",
    //         //     alwaysConsumeMouseWheel: true,
    //         //     handleMouseWheel: true,
    //         //   },
    //         // });
    //       }
    //     } else {
    //       // Allow parent scrolling if no overflow
    //       // console.log("No overflow, allowing parent scrolling");

    //       event.stopPropagation();

    //       console.log("No overflow, allowing parent scrolling");

    //       // editor.updateOptions({
    //       //   scrollbar: {
    //       //     vertical: "hidden",
    //       //     alwaysConsumeMouseWheel: false,
    //       //     handleMouseWheel: false,
    //       //   },
    //       // });
    //     }
    //   });
    // }

    // -- 

    // to see supported languages, uncomment and run this code
// import piston from "piston-client";
// const client = piston({ server: "https://emkc.org" });
// const languages = await client.runtimes();
// console.log(`Languages: ${JSON.stringify(languages, null, 2)}`);
// process.exit();

// -- 

    // await Promise.all(
    //   testCaseStates.map(async (testCase, index) => {
    //     try {
    //       const result = await executeCode(code, testCase.stdin);
    //       console.log("result", result);
    //       setTestCaseStates((prevStates) =>
    //         prevStates.map((tc, i) =>
    //           i === index
    //             ? {
    //                 ...tc,
    //                 stdout: result.run.stdout,
    //                 stderr: result.run.stderr,
    //               }
    //             : tc
    //         )
    //       );
    //     } catch (error) {
    //       setTestCaseStates((prevStates) =>
    //         prevStates.map((tc, i) =>
    //           i === index
    //             ? {
    //                 ...tc,
    //                 stderr: error.message,
    //               }
    //             : tc
    //         )
    //       );
    //     }
    //   })
    // );