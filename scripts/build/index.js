const path = require('path');
const fs = require('fs');
const util = require('util');
const pug = require('pug');
const marked = require('marked');
const extract = require('extract-md-data');
const slugify = require('slugify');
const config = require('../../config');
const package = require('../../package.json');
const { chopFm, validatePosts, humanizeDate, getExcerpt } = require('./utils');
const {
  mkdirIfNotExistsSync,
  copySync,
  clearDirSync
} = require('../lib/files');
const { genRssFeed } = require('./utils/genRssFeed');

console.log('Starting build...');

const distDir = package.config.distDir;
const contentDir = path.resolve(__dirname, '..', '..', config.contentDir);
const staticDir = path.resolve(__dirname, '..', '..', config.staticDir);

const data = extract(contentDir, contentDir, { omitContent: true });

// Build dirs
console.log('Building blog dirs...');

mkdirIfNotExistsSync(distDir);
clearDirSync(distDir);
// Build nested routes
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

// Get all blog post paths
const postsData = data.filter((d) => d.relativeDir.match(/^blog\//));

// Check published date and title exists on all blog posts frontmatter
validatePosts(postsData);

const postsDataSorted = postsData.sort(
  (a, b) => new Date(b.fm.published) - new Date(a.fm.published)
);

const processedPostsSorted = postsDataSorted.map((p) => {
  const markdown = chopFm(
    fs.readFileSync(path.resolve(contentDir, p.relativePath), 'utf-8')
  );

  return {
    ...p,
    content: markdown,
    slug: slugify(p.fm.title, { lower: true, strict: true }),
    excerpt: getExcerpt(markdown)
  };
});

console.log('Generating RSS feed...');
const rssFeed = genRssFeed(processedPostsSorted);

console.log(
  `Building and writing ${processedPostsSorted.length} blog post pages...`
);
const postPages = processedPostsSorted.map((p) => {
  const { content, excerpt, slug } = p;
  const html = pug.renderFile(
    path.resolve(__dirname, 'templates', 'pages', 'post.pug'),
    {
      post: { ...p, fm: { ...p.fm, published: humanizeDate(p.fm.published) } },
      marked,
      markdown: content,
      excerpt
    }
  );

  const wwwLink = `/blog/p/${p.slug}`; // for intrasite linking
  const outpath = `blog/p/${p.slug}.html`; // for dist Dir

  // write page now to prevent storing tons of html blog pages in memory
  fs.writeFileSync(path.resolve(distDir, outpath), html);

  return {
    slug,
    wwwLink,
    outpath,
    title: p.fm.title,
    published: humanizeDate(p.fm.published)
  };
});

console.log('Building blog home page...');
const blogHtml = pug.renderFile(
  path.resolve(__dirname, 'templates', 'pages', 'blog.pug'),
  {
    postPages
  }
);

console.log('Building shiatsu redirect...');
const shiatsuHtml = pug.renderFile(
  path.resolve(__dirname, 'templates', 'pages', 'shiatsu.pug')
);

// Write non-blog-post files
const notBlogPostsFilemap = {
  'index.html': homeHtml,
  'projects.html': projectsHtml,
  '404.html': notfoundHtml,
  'blog/index.html': blogHtml,
  'shiatsu.html': shiatsuHtml,
  'blog/feed.xml': rssFeed
};

console.log('Writing non-blog-post pages to dist dir...');
Object.entries(notBlogPostsFilemap).forEach(([filename, html]) => {
  fs.writeFileSync(path.resolve(distDir, filename), html);
});

const builtPages = [
  ...Object.keys(notBlogPostsFilemap),
  ...postPages.map((p) => p.outpath)
];

console.log(
  `Built ${builtPages.length} pages: `,
  util.inspect(builtPages, { maxArrayLength: 20 })
);

/** Copy over static files */
copySync(staticDir, distDir);
console.log('Done.');
