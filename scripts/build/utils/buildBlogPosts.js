const path = require('path');
const fs = require('fs');
const pug = require('pug');
const { humanizeDate } = require('../utils');

function buildBlogPosts(processedPosts, { distDir, templatesDir, marked }) {
  console.log(
    `Building and writing ${processedPosts.length} blog post pages...`
  );

  return processedPosts.map((p) => {
    const { content, excerpt, slug } = p;
    const html = pug.renderFile(
      path.resolve(templatesDir, 'pages', 'post.pug'),
      {
        post: {
          ...p,
          fm: { ...p.fm, published: humanizeDate(p.fm.published) }
        },
        marked,
        markdown: content,
        excerpt
      }
    );

    const wwwLink = `/blog/p/${slug}`;
    const outpath = `blog/p/${slug}.html`;

    fs.writeFileSync(path.resolve(distDir, outpath), html);

    return {
      slug,
      wwwLink,
      outpath,
      title: p.fm.title,
      published: humanizeDate(p.fm.published)
    };
  });
}

module.exports = { buildBlogPosts };
