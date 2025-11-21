function parseLLMOutput(rawOutput) {
  try {
    // Assume LLM sometimes returns extra text; extract JSON part
    const jsonStart = rawOutput.indexOf('{');
    const jsonEnd = rawOutput.lastIndexOf('}') + 1;
    const jsonString = rawOutput.substring(jsonStart, jsonEnd);
    const parsed = JSON.parse(jsonString);
    return parsed;
  } catch (error) {
    throw new Error('Failed to parse LLM output as JSON');
  }
}

module.exports = { parseLLMOutput };
