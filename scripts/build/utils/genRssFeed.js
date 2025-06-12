const { getExcerpt } = require('./getExcerpt');

const MAX_DESCRIPTION_CHAR_LENGTH = 300;
function genRssFeed(posts, siteUrl = 'https://clairefro.dev') {
  const sortedPosts = posts
    .sort((a, b) => new Date(b.fm.published) - new Date(a.fm.published))
    .slice(0, 100); // keep last 100 posts

  const items = sortedPosts
    .map((post) => {
      let excerpt = getExcerpt(post.content).slice(
        0,
        MAX_DESCRIPTION_CHAR_LENGTH
      );
      // ellipsis if content exceeds description length
      if (post.content.length > MAX_DESCRIPTION_CHAR_LENGTH) excerpt += '...';

      return `
    <item>
      <title><![CDATA[${post.fm.title}]]></title>
      <link>${siteUrl}/blog/p/${post.slug}</link>
      <guid>${siteUrl}/blog/p/${post.slug}</guid>
      <pubDate>${new Date(post.fm.published).toUTCString()}</pubDate>
      <description><![CDATA[${excerpt}]]></description>
    </item>`;
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>clairefro.dev blog</title>
    <description>clairefro's tech diary</description>
    <link>${siteUrl}/blog</link>
    <atom:link href="${siteUrl}/blog/feed.xml" rel="self" type="application/rss+xml"/>
    ${items}
  </channel>
</rss>`;
}

module.exports = { genRssFeed };
