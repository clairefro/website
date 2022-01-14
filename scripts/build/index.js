const path = require('path');
const fs = require('fs');
const util = require('util');
const pug = require('pug');
const extract = require('extract-md-data');
const config = require('../../config');
const package = require('../../package.json');
const { mkdirIfNotExistsSync, copySync } = require('../lib/files');

console.log('Starting build...');

const distDir = package.config.distDir;
const contentDir = path.resolve(__dirname, '..', '..', config.contentDir);
const staticDir = path.resolve(__dirname, '..', '..', config.staticDir);

const data = extract(contentDir, contentDir, { omitContent: true }); // TODO: update lib to deafult to single path source

console.log({ data });

// Build dirs
console.log('Building blog dir...');
mkdirIfNotExistsSync(path.resolve(distDir, 'blog'));

// Build homepage

console.log('Building 404 page...');
const notfoundPageHtml = pug.renderFile(
  path.resolve(__dirname, 'templates', 'pages', '404.pug')
);

console.log('Building home page...');
const homepageHtml = pug.renderFile(
  path.resolve(__dirname, 'templates', 'pages', 'home.pug')
);

// TODO: Build project page
// Build blog pages
const blogPostsData = data.filter((d) => d.relativeDir.match(/^blog\//));

const blogPostPages = blogPostsData.map((bp) => {
  const html = pug.renderFile(
    path.resolve(__dirname, 'templates', 'pages', 'post.pug'),
    {
      post: bp
    }
  );
  return { html, slug: bp.slug };
});

// Write files
const filemap = {
  'index.html': homepageHtml,
  '404.html': notfoundPageHtml
};

blogPostPages.forEach((bp) => {
  const file = `blog/${bp.slug}.html`;
  filemap[file] = bp.html;
});

const builtPages = Object.keys(filemap);
console.log(
  `Built ${builtPages.length} pages: `,
  util.inspect(builtPages, { maxArrayLength: 10 })
);

console.log('Writing web pages to dist dir...');
Object.entries(filemap).forEach(([filename, html]) => {
  fs.writeFileSync(path.resolve(distDir, filename), html);
});

/** Copy over static files */
copySync(staticDir, distDir);
console.log('Done.');
