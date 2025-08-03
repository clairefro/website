const path = require('path');
const pug = require('pug');
const fs = require('fs');
const { chopFm } = require('../utils');

function buildNonBlogPages({ contentDir, templatesDir, distDir, marked }) {
  console.log('Building non-blog pages...');

  const pages = {
    'index.html': pug.renderFile(
      path.resolve(templatesDir, 'pages', 'home.pug')
    ),
    'projects.html': pug.renderFile(
      path.resolve(templatesDir, 'pages', 'projects.pug'),
      {
        markdown: chopFm(
          fs.readFileSync(
            path.resolve(contentDir, 'projects', 'index.md'),
            'utf-8'
          )
        ),
        marked
      }
    ),
    '404.html': pug.renderFile(path.resolve(templatesDir, 'pages', '404.pug'))
  };

  // write pages to disk
  Object.entries(pages).forEach(([filename, html]) => {
    fs.writeFileSync(path.resolve(distDir, filename), html);
  });

  return Object.keys(pages);
}

module.exports = { buildNonBlogPages };
