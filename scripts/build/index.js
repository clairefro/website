const path = require('path');
const fs = require('fs');
const util = require('util');
const pug = require('pug');
const marked = require('marked');
const extract = require('extract-md-data');
const { chopFm, validatePosts } = require('./utils');
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

const data = extract(contentDir, contentDir, { omitContent: true });

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

console.log('Building projects page...');
const projectsMarkdown = chopFm(
  fs.readFileSync(path.resolve(contentDir, 'projects', 'index.md'), 'utf-8')
);
const projectsHtml = pug.renderFile(
  path.resolve(__dirname, 'templates', 'pages', 'projects.pug'),
  {
    markdown: projectsMarkdown,
    marked
  }
);

// Build blog pages
const postsData = data.filter((d) => d.relativeDir.match(/^blog\//));

// Check published date and title exists on all blog posts frontmatter
validatePosts(postsData);

const postsDataSorted = postsData.sort(
  (a, b) => new Date(b.fm.published) - new Date(a.fm.published)
);

console.log(
  `Building and writing ${postsDataSorted.length} blog post pages...`
);
const postPages = postsDataSorted.map((p) => {
  // chop off frontmatter
  const markdown = chopFm(
    fs.readFileSync(path.resolve(contentDir, p.relativePath), 'utf-8')
  );
  const excerpt = markdown.trim().slice(0, 150) + '...';
  const html = pug.renderFile(
    path.resolve(__dirname, 'templates', 'pages', 'post.pug'),
    {
      post: p,
      marked,
      markdown,
      excerpt
    }
  );
  const wwwLink = `/blog/p/${p.slug}`; // for intrasite linking
  const outpath = `blog/p/${p.slug}.html`; // for dist Dir

  // write page to prevent storing tons of html blog pages in memory
  fs.writeFileSync(path.resolve(distDir, outpath), html);

  return {
    slug: p.slug,
    wwwLink,
    outpath,
    title: p.fm.title,
    published: p.fm.published
  };
});

console.log('Building blog home page...');
const blogHtml = pug.renderFile(
  path.resolve(__dirname, 'templates', 'pages', 'blog.pug'),
  {
    postPages
  }
);

// Write non-blog-post files
const otherFilemap = {
  'index.html': homeHtml,
  'projects.html': projectsHtml,
  '404.html': notfoundHtml,
  'blog/index.html': blogHtml
};

console.log('Writing other web pages to dist dir...');
Object.entries(otherFilemap).forEach(([filename, html]) => {
  fs.writeFileSync(path.resolve(distDir, filename), html);
});

const builtPages = [
  ...Object.keys(otherFilemap),
  ...postPages.map((p) => p.outpath)
];

console.log(
  `Built ${builtPages.length} pages: `,
  util.inspect(builtPages, { maxArrayLength: 20 })
);

/** Copy over static files */
copySync(staticDir, distDir);
console.log('Done.');
