function buildPrompt(userInput) {
    return `Generate a minimal reproducible example for:\n${userInput.description}`;
}

module.exports = { buildPrompt };
