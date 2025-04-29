import he from "he";

let encodedHtml = `<codejudger defaultpythoncode="a = int(input())&#10;b = int(input())&#10;print(a + b)" testcases="[{"hidden":false,"stdin":"1\n1","expectedStdout":"2"},{"hidden":false,"stdin":"2\n2","expectedStdout":"4"},{"hidden":true,"stdin":"1\n2","expectedStdout":"3"}]"></codejudger>`;

const htmlEncoded = encodedHtml.match(/defaultpythoncode="([^"]*)"/)[1];
const decoded = he.decode(htmlEncoded).replace(/&#10;/g, "\n");

console.log(decoded);
