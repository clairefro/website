---
title: Look ma, no React! Why I recoded my portfolio site with vanilla everything
published: '2022-02-07'
tags:
  - js
  - html
  - css
---

> Static websites are simple, but we insist on making them complicated.
>
> _\- Confucius if he were a web dev_

Welcome to my new site, brought to you by vanilla everything. No Javascript frameworks, CSS libraries or flashy animations. Just markdown, html templating with `pug`, and plain old Javascript and CSS.

This replaces my [old portfolio site](https://github.com/clairefro/portfolio), which was built with Gatsby/React. For reference, this is what it looked like.

![Screencapture GIF of clairefro's old portfolio site. Includes unnecessary animation of... everything](https://user-images.githubusercontent.com/9841162/152890936-65a242dc-52d2-4611-8b4e-fae906aea11e.gif)

## Modern frameworks are a false flex

A developer needs a website to prove they can build a website. A new dev might feel tempted to "flex" their bleeding edge skills to the market by showing they can make websites with modern tools like React, Gatsby, Next, SCSS and Tailwind. In reality it is more of a flex in this SPA era to show you know how to make a website the old-fashioned way.

The old portfolio was one of the first websites I built after learning React. Note the unecessary animations that serve little more than to make you nauseous. Clearly I was trying hard to justify having used React in the first place. The flashiness was also overcompensating for the fact that as a new dev I had barely any projects to show yet.

I became a dev in a time React was on every hiring manager's lips, so React is what I taught myself immediately after bootcamp while scrambling for a job. The reality is, React and Gatsby were bandaids over the fact that I didn't know how to code basic things back then, like my own file-based routing in Node or traditional HTML templating without JSX. The ease of deployment from Gatsby to Netlify was a bandaid over not being familiar with how to deploy any other way.

## Static problems only _need_ static solutions

Another actual flex is chosing the right tools for the job. My portfolio needs to be nothing more than the HTTP equivalent of a tri-fold brochure. It does not need the dynamism of an SPA.

As an analogy, let's look to my hero [Manu Prakash](https://en.wikipedia.org/wiki/Manu_Prakash)'s frugal [paperfuge](https://www.youtube.com/watch?v=pPePaKnYh2I) - a centrifuge modeled after a whirligig children's toy. Because the tool is light weight and hand-powered, it can be used for diagnostics in areas without electricity in order to detect diseases like as malaria or to separate blood plasma. The paperfuge gets the job done using old school technology. Did I mention it only costs 20 cents to make?

![$14,000 electric blood centrifuge compared to Manu Prakash's non-electric $0.20 paper centrifuge](https://user-images.githubusercontent.com/9841162/152917681-331b6f46-dab5-4506-9a80-7266d14c00be.png)

Over-engineering a basic static website as an SPA makes as much sense as hauling a generator out to areas with limited infrastructure to power an expensive electric centrifuge. You could get pretty much the same job done with a paper toy for a fraction of the overhead.

The paperfuge's use of old tech boosts frugality and accessibility. Coding a basic vanilla multi-page application (MPA) saves time in development (goodbye babel/postcss/SSR config) and builds are fast (this site builds in less than 1.2 seconds). The pages load fast because I'm not fetching any fancy webfonts, and I'm only using 2 lines of Javascript to add the current year in the footer copyright tag:

```js
const copyright = document.getElementById('copyright-goes-here');

copyright.innerText = `© ${new Date().getFullYear()}`;
```

## Content-first

Then there is aesthetics. Most useful sites I love have barely any style or dynamism. Think Wikipedia, HackerNews, Craigslist, and other forums that look like a timewarp to the 90's. Why are these so popular? Answer: What they lack in glitz they make up for in practical content.

Aiming for similar aesthetic, I opted for no hamburger nav, native webfonts, and a two-color theme inspired by a baked Japanese sweet potato. The simple layout makes this entire site responsive on all devices with this single media query:

```css
@media (max-width: 650px) {
  .page {
    margin: 0 auto;
    font-size: 0.85rem;
  }
}
```

Now I won't distract myself or visitors with glitz, so I can focus on content.

## Therefore

Switching from an SPA to MPA was the right choice for this static "brochure" style website. Hopefully the ease of content editing and lack of distracting style elements will have me updating this site more than once every two years, with more meaningful content.

This was also a chance for me to prove to myself I can indeed code a vanilla static MPA with all the bells and whistles I want, using my own build logic. Shoutout to [cannikin](https://github.com/cannikin) who piqued my interest in static site generators a while back when he showed me his own custom generator: [cameronjs](https://github.com/cannikin/cameronjs).

To see how simple it is to generate your own vanilla static site, check out the [code for this site](https://github.com/clairefro/website), namely the `build` script. Confucius might argue it could be even simpler.
