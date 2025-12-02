const path = require('path');
const fs = require('fs');
const util = require('util');
const marked = require('marked');
const extract = require('extract-md-data');
const slugify = require('slugify');
const config = require('../../config');
const package = require('../../package.json');
const { chopFm, validatePosts, getExcerpt } = require('./utils');
const {
  mkdirIfNotExistsSync,
  copySync,
  clearDirSync
} = require('../lib/files');
const { genRssFeed } = require('./utils/genRssFeed');
const { buildBlogPosts } = require('./utils/buildBlogPosts');
const { buildNonBlogPages } = require('./utils/buildNonBlogPages');
const pug = require('pug');

// add server-side highlighting (highlight.js)
const hljs = require('highlight.js');
marked.setOptions({
  highlight: (code, lang) => {
    try {
      if (lang && hljs.getLanguage(lang)) {
        return hljs.highlight(code, { language: lang }).value;
      }
      return hljs.highlightAuto(code).value;
    } catch (e) {
      return code;
    }
  }
});

//------

console.log('Starting build...');

const dirs = {
  dist: package.config.distDir,
  content: path.resolve(__dirname, '..', '..', config.contentDir),
  static: path.resolve(__dirname, '..', '..', config.staticDir),
  templates: path.resolve(__dirname, 'templates')
};

// init build directory
mkdirIfNotExistsSync(dirs.dist);
clearDirSync(dirs.dist);
mkdirIfNotExistsSync(path.resolve(dirs.dist, 'blog'));
mkdirIfNotExistsSync(path.resolve(dirs.dist, 'blog/p'));

// process blog posts
const data = extract(dirs.content, dirs.content, { omitContent: true });
const postsData = data.filter((d) => d.relativeDir.match(/^blog\//));
validatePosts(postsData);

const processedPosts = postsData
  .sort((a, b) => new Date(b.fm.published) - new Date(a.fm.published))
  .map((p) => {
    // First read and chop the content
    const content = chopFm(
      fs.readFileSync(path.resolve(dirs.content, p.relativePath), 'utf-8')
    );
    return {
      ...p,
      content,
      slug: slugify(p.fm.title, { lower: true, strict: true }),
      excerpt: getExcerpt(content)
    };
  });

// build all pages
const rssFeed = genRssFeed(processedPosts);
const postPages = buildBlogPosts(processedPosts, {
  distDir: dirs.dist,
  templatesDir: dirs.templates,
  marked
});
const nonBlogPages = buildNonBlogPages({
  contentDir: dirs.content,
  templatesDir: dirs.templates,
  distDir: dirs.dist,
  marked
});

// write pages to disk
const pagesToWrite = {
  'index.html': nonBlogPages.home,
  'projects.html': nonBlogPages.projects,
  '404.html': nonBlogPages.notfound,
  'blog/index.html': pug.renderFile(
    path.resolve(dirs.templates, 'pages', 'blog.pug'),
    { postPages }
  ),
  'shiatsu.html': nonBlogPages.shiatsu,
  'blog/feed.xml': rssFeed
};

console.log('Building blog home page...');
const blogHtml = pug.renderFile(
  path.resolve(__dirname, 'templates', 'pages', 'blog.pug'),
  {
    postPages
  }
);
fs.writeFileSync(path.resolve(dirs.dist, 'blog/index.html'), blogHtml);

console.log('Generating RSS feed...');
fs.writeFileSync(path.resolve(dirs.dist, 'blog/feed.xml'), rssFeed);

// copy static assets
copySync(dirs.static, dirs.dist);

// create static "sidecar" page /shiatsu
fs.copyFileSync(
  path.resolve(__dirname, 'sidecar', 'shiatsu.html'),
  path.resolve(dirs.dist, 'shiatsu.html')
);
fs.copyFileSync(
  path.resolve(__dirname, 'sidecar', 'shiatsu.css'),
  path.resolve(dirs.dist, 'styles', 'shiatsu.css')
);

const builtPages = [
  ...Object.keys(pagesToWrite),
  'blog/feed.xml',
  ...postPages.map((p) => p.outpath)
];

console.log(
  `Built ${builtPages.length} pages: `,
  util.inspect(builtPages, { maxArrayLength: 20 })
);

console.log('Done.');
