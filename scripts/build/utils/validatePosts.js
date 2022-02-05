function validatePosts(posts) {
  const missingPublished = [];
  const missingTitle = [];
  posts.forEach((p) => {
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
      `Invalid or missing frontmatter 'title' for following blog posts. Add property 'title' to the following blog pages:\n\n- ${missingTitle.join(
        '\n- '
      )}\n`
    );
    throw new Error(`Aborting build.`);
  }
}

module.exports = { validatePosts };
