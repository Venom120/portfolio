const { inlineSource } = require('inline-source');
const path = require('path');
const fs = require('fs');

const buildPath = path.resolve(__dirname, '../build');
const indexPath = path.join(buildPath, 'index.html');

async function inlineAssets() {
  try {
    const html = fs.readFileSync(indexPath, 'utf-8');
    const inlinedHtml = await inlineSource(html, {
      compress: true,
      rootpath: buildPath,
      // Ensure that relative paths are correctly resolved
      // This might be needed if assets are referenced with relative paths in the HTML
      // and inline-source needs to find them in the build directory.
      // basepath: buildPath, 
    });
    fs.writeFileSync(indexPath, inlinedHtml);
    console.log('Successfully inlined assets into index.html');
  } catch (error) {
    console.error('Error inlining assets:', error);
    process.exit(1);
  }
}

inlineAssets();