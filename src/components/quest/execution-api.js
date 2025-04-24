import piston from "piston-client";

const client = piston({ server: "https://emkc.org" });

export const executeCode = async (code) => {
    const result = await client.execute("python", code);
    return result;
};