const { generateMinimalCode } = require('../services/llm.service');
const { createZip } = require('../services/zip.service');

async function generateMRE(req, res) {
    try {
        const userInput = req.body;
        // Call LLM service to get minimal reproducible code
        const files = await generateMinimalCode(userInput);
        // Create ZIP of those files
        const zipBuffer = await createZip(files);
        res.set('Content-Type', 'application/zip');
        res.send(zipBuffer);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = { generateMRE };

