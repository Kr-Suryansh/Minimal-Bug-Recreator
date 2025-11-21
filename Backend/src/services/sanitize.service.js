function sanitizeInput(input) {
    // Remove secrets, credentials, tokens, etc.
    return input.replace(/(apiKey|token|password)\s*=\s*['"].*?['"]/gi, 'REMOVED');
}

module.exports = { sanitizeInput };
