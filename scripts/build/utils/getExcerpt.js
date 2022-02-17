const EXCERPT_CHAR_LENGTH = 150;

function getExcerpt(markdown) {
  return (
    markdown
      .replace(/^>\s.+?\n/gm, '') // remove blockquotes
      .trim()
      .slice(0, EXCERPT_CHAR_LENGTH) + '...'
  );
}

module.exports = { getExcerpt };
