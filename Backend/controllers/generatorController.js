import ollama from "ollama";

export const generateMRE = async (req, res) => {
    try {
        const { code, errorMessage } = req.body;

        const prompt = `
You are a Minimal Reproducible Example (MRE) generator.

User will provide:
1. Original buggy code
2. Error message
3. Optional stack trace

Your job:
- Read the code
- Understand the error
- Create the SMALLEST POSSIBLE code that reproduces the SAME error
- Do NOT fix the error
- Do NOT add explanations
- Output ONLY the final code snippet.

---INPUT CODE---
${code}

---ERROR MESSAGE---
${errorMessage}
`;

        const response = await ollama.generate({
            model: "codellama:7b",
            prompt,
            stream: false
        });

        return res.json({
            success: true,
            mre: response.response
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: "Model error" });
    }
};
