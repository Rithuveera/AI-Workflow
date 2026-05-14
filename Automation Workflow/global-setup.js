const { callMCP } = require('./mcpClient');

async function globalSetup() {
  console.error('🔄 Global Setup: Starting MCP session...');
  await callMCP('/start', { event: 'Playwright test suite started' });
}

module.exports = globalSetup;