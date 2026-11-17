const { execSync } = require('node:child_process');
const fs = require('node:fs');
const http = require('node:http');
const path = require('node:path');

// GitHub Pages serves the site under /<repository>/ (baseHref in angular.json).
const base = '/brigade-example-angular';
const site = path.join(__dirname, 'dist/brigade-example-angular/browser');
// Browsers run module scripts only with a JavaScript content type.
const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css' };
let server;

exports.config = {
  tests: './e2e/*_test.js',
  output: './e2e/output',
  helpers: {
    Playwright: { url: `http://127.0.0.1:4200${base}`, show: false, browser: 'chromium' },
  },
  // CI runs each stage in a fresh job: build the app, then serve it.
  async bootstrap() {
    execSync('npx ng build', { stdio: 'inherit' });
    server = http
      .createServer((req, res) => {
        const url = req.url.startsWith(base) ? req.url.slice(base.length) : req.url;
        const asked = path.join(site, path.normalize(url));
        const found = fs.statSync(asked, { throwIfNoEntry: false })?.isFile();
        const file = asked.startsWith(site) && found ? asked : path.join(site, 'index.html');
        res.setHeader('content-type', types[path.extname(file)] || 'application/octet-stream');
        fs.createReadStream(file).pipe(res);
      })
      .listen(4200, '127.0.0.1');
  },
  async teardown() {
    server.close();
  },
  name: 'brigade-example-angular',
};
