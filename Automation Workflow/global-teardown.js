const { callMCP } = require('./mcpClient');

async function globalTeardown() {
  console.error('🧹 Global Teardown: Ending MCP session...');
  await callMCP('/end', { event: 'Playwright test suite finished' });
}

module.exports = globalTeardown;