const fs = require('fs');
const path = require('path');
const workflowsDir = path.join(__dirname, '..', 'workflows');

const files = fs.readdirSync(workflowsDir).filter(f => f.endsWith('.json'));

for (const file of files) {
    const filePath = path.join(workflowsDir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    // Replace patterns like `${cwd}/${screenshot.path}`
    content = content.replace(
        /screenshotPath:\s*screenshot\s*\?\s*`\$\{cwd\}\/\$\{screenshot\.path\}`\.replace\(\/\\\\\\\\\/g,\s*'\/'\)\s*:\s*null/g,
        "screenshotPath: screenshot ? (screenshot.path.includes(':') || screenshot.path.startsWith('/') ? screenshot.path : `${cwd}/${screenshot.path}`).replace(/\\\\\\\\/g, '/') : null"
    );

    // Replace patterns like `${cwd}/${ss.path}`
    content = content.replace(
        /screenshotPath:\s*ss\s*\?\s*`\$\{cwd\}\/\$\{ss\.path\}`\.replace\(\/\\\\\\\\\/g,\s*'\/'\)\s*:\s*null/g,
        "screenshotPath: ss ? (ss.path.includes(':') || ss.path.startsWith('/') ? ss.path : `${cwd}/${ss.path}`).replace(/\\\\\\\\/g, '/') : null"
    );

    // Replace patterns like `${cwd}/${screenshotPath}`
    content = content.replace(
        /screenshotPath:\s*screenshotPath\s*\?\s*`\$\{cwd\}\/\$\{screenshotPath\}`\.replace\(\/\\\\\\\\\/g,\s*'\/'\)\s*:\s*null/g,
        "screenshotPath: screenshotPath ? (screenshotPath.includes(':') || screenshotPath.startsWith('/') ? screenshotPath : `${cwd}/${screenshotPath}`).replace(/\\\\\\\\/g, '/') : null"
    );

    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${file}`);
}
