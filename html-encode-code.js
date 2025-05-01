
// set to true if you want a CodeTrier, otherwise it will be a CodeJudger
const codeTrier = false;

// problem description/statement isn't a part of the CodeJudger component, can include
// before it in the level description

// CodeJudger boilerplate input/output examples if wanted:
// line = input()
// n = int(input())
// a, b = map(int, input().split())
// arr = list(map(int, input().split()))
// print("Hello, World")
// print("Arguments", sep=" ", end="\n")
// print("n", n)

const defaultPythonCode =`s = list(map(str, input().split()))`

// for CodeJudger, testCases is an array of objects with the following properties:
// - hidden: boolean, whether the test case is hidden or not
// - stdin: string, the input to the code
// - expectedStdout: string, the expected output of the code. Newlines are ignored before comparison
const testCases = [
  {
    hidden: false,
    stdin: "world Hello",
    expectedStdout: "Hello world",
  },
  {
    hidden: false,
    stdin: "a b c",
    expectedStdout: "c b a",
  },
  {
    hidden: true,
    stdin: "the quick brown fox jumps over the lazy dog",
    expectedStdout: "dog lazy the over jumps fox brown quick the",
  }
];

import he from "he";

function htmlEncode(str) {
  return he.encode(str).replace(/\n/g, "&#10;");
}

if (codeTrier) {
  console.log("<codetrier defaultpythoncode=\"" + htmlEncode(defaultPythonCode) + "\"></codetrier>");
} else {
  const testCasesStr = JSON.stringify(testCases);
  console.log("<codejudger defaultpythoncode=\"" + htmlEncode(defaultPythonCode) + "\" testcases=\"" + htmlEncode(testCasesStr) + "\"></codejudger>");
}
