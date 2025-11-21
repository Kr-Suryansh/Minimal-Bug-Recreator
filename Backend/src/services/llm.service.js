const axios = require('axios');

/* Example: Send prompt to Ollama LLM */
async function generateMinimalCode(userInput) {
    const response = await axios.post(`${process.env.OLLAMA_URL}/generate`, {
        prompt: buildPrompt(userInput)
    });
    // Suppose LLM returns { files: [{name: ..., content: ...}] }
    return response.data.files;
}

module.exports = { generateMinimalCode };
