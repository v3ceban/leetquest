import piston from "piston-client";

const client = piston({ server: "https://emkc.org" });

export const getLanguages = async() => {
    const result = await client.runtimes();
    return result;
};

export const executeCode = async (language, code) => {
    const result = await client.execute(language, code);
    return result;
};