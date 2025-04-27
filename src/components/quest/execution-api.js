import piston from "piston-client";

const client = piston({ server: "https://emkc.org" });

// AKA runCode
const executeCode = async (code, input="") => {
    const result = await client.execute("python", code, {stdin: input});
    return result;
};

export default executeCode;