const fs = require('fs');
const path = require('path');
const { invokeLangChainWorkflow } = require('../services/langchain.service'); // your new LangChain service
// Optional: if you keep sanitize.service.js
const { sanitizeInput } = require('../services/sanitize.service.js');

exports.handleGenerate = async (req, res) => {
  const zipFilePath = req.file.path;
  const errorMsg = req.body.errorMessage;
  const codeSnippet = req.body.codeSnippet;

  try {
    // Optional: Sanitize error message or code, if needed
    const cleanErrorMsg = sanitizeInput ? sanitizeInput(errorMsg) : errorMsg;
    const cleanCodeSnippet = sanitizeInput ? sanitizeInput(codeSnippet) : codeSnippet;

    // Hand off to LangChain workflow (handles zip extraction, RAG, LLM, minimal file selection, output zip)
    // You pass the uploaded zip path and the error info; LangChain should process and return a result ZIP buffer
    const resultZipBuffer = await invokeLangChainWorkflow({
      zipFilePath,
      errorMsg: cleanErrorMsg,
      codeSnippet: cleanCodeSnippet
    });

    res.set('Content-Type', 'application/zip');
    res.send(resultZipBuffer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  } finally {
    // Always cleanup the upload, since LangChain uses its own temp storage
    fs.unlink(zipFilePath, () => {});
  }
};


