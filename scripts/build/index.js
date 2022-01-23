const path = require('path');
const fs = require('fs');
const util = require('util');
const pug = require('pug');
const extract = require('extract-md-data');
const config = require('../../config');
const package = require('../../package.json');
const {
  mkdirIfNotExistsSync,
  copySync,
  clearDirSync
} = require('../lib/files');

console.log('Starting build...');

const distDir = package.config.distDir;
const contentDir = path.resolve(__dirname, '..', '..', config.contentDir);
const staticDir = path.resolve(__dirname, '..', '..', config.staticDir);

const data = extract(contentDir, contentDir, { omitContent: true }); // TODO: update lib to deafult to single path source

// Build dirs
console.log('Building blog dir...');

mkdirIfNotExistsSync(distDir);
clearDirSync(distDir);
mkdirIfNotExistsSync(path.resolve(distDir, 'blog'));
mkdirIfNotExistsSync(path.resolve(distDir, 'blog/p'));

// Build homepage

console.log('Building 404 page...');
const notfoundHtml = pug.renderFile(
  path.resolve(__dirname, 'templates', 'pages', '404.pug')
);

console.log('Building home page...');
const homeHtml = pug.renderFile(
  path.resolve(__dirname, 'templates', 'pages', 'home.pug')
);

// Build blog pages
const postsData = data.filter((d) => d.relativeDir.match(/^blog\//));

// Check for published date and title
const missingPublished = [];
const missingTitle = [];
postsData.forEach((p) => {
  if (!p.fm.published || isNaN(Date.parse(p.fm.published))) {
    missingPublished.push(p.relativePath);
  }
  if (!p.fm.title) {
    missingTitle.push(p.relativePath);
  }
});

if (missingPublished.length) {
  console.error(
    `Invalid or missing frontmatter 'published' for following blog posts. Add property 'published' with date formatted 'yyyy-mm-dd'\n\n${missingPublished.join(
      '\n'
    )}\n`
  );
  throw new Error(`Aborting build.`);
}
if (missingTitle.length) {
  console.error(
    `Invalid or missing frontmatter 'title' for following blog posts. Add property 'title' to the following blog pages:\n\n${missingTitle.join(
      '\n'
    )}\n`
  );
  throw new Error(`Aborting build.`);
}

const postsDataSorted = postsData.sort(
  (a, b) => new Date(b.fm.published) - new Date(a.fm.published)
);

const postPages = postsDataSorted.map((p) => {
  const html = pug.renderFile(
    path.resolve(__dirname, 'templates', 'pages', 'post.pug'),
    {
      post: p
    }
  );
  const wwwLink = `/blog/p/${p.slug}`;
  const filepath = `blog/p/${p.slug}.html`; // for dist Dir
  return { html, slug: p.slug, wwwLink, filepath, title: p.fm.title };
});

console.log('Building blog home page...');
const blogHtml = pug.renderFile(
  path.resolve(__dirname, 'templates', 'pages', 'blog.pug'),
  {
    postPages
  }
);

console.log('Building projects page...');
const projectsHtml = pug.renderFile(
  path.resolve(__dirname, 'templates', 'pages', 'projects.pug')
);

// Write files
const filemap = {
  'index.html': homeHtml,
  'projects.html': projectsHtml,
  '404.html': notfoundHtml,
  'blog/index.html': blogHtml
};

console.log(`Building ${postPages.length} blog post pages...`);
postPages.forEach((p) => {
  filemap[p.filepath] = p.html;
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
