/** Remove frontmatter from markdown */
function chopFm(rawMd) {
  return rawMd.replace(/^\s*---[\s\S]*?---/, '');
}

module.exports = { chopFm };
