---
title: What I learned from accepting I suck at design
published: '2022-02-20'
tags:
  - css
  - accessibility
---

Two weeks ago I launched this personal website with an air of pride that everything was built to be simple. You can read about it [here](/blog/p/look-ma-no-react-why-i-recoded-my-portfolio-site-with-vanilla-everything).

In the spirit of 'keeping it simple' I took a low-touch approach to styling: white background, native webfonts, a two color theme inspired by a potato, everything left-aligned, and one little media query that made the site responsive on all devices. It would have a deliberate grungy 90's feel.

Several people reached out to me with feedback about the new website. One was [Sanket Pathak](https://twitter.com/sanketpath), the Design Ops Lead at [Postman](https://www.postman.com/company/about) where I also work. In polite terms he suggested something I already knew deep down: the design had room for improvement.

## Accepting help

I was hesitant at first to accept help with a redesign of the website. First and foremost, I'm lazy. But also I was stubbornly clinging to the next-to-no-style aesthetic as some kind of statement. Then there was the fact that this is my personal website and I felt the style should be "my own".

But Sanket did have a point about some accessibility issues so it was worth exploring.

He asked me what look I was going for, to which I answered "potato" and left him to do his thing. Quickly he came back with a stunning Figma design that made me lose any and all attachment to my old design. See the before and after:

**Home page**

![A before and after screenshot showing styling updates of the Homepage of clairefro's website. The old style had a basic white background, with some questionable color combonations. The new style has a purple sweet potato background with light text and yellow headers](https://user-images.githubusercontent.com/9841162/155022202-2fd25248-3df6-412e-ad8c-dd280af21ee3.png)

**Projects page**

![A before and after screenshot showing styling updates of the Projects page of clairefro's website. The old style had a basic white background, with some questionable color combonations. The new style has a purple sweet potato background with light text and yellow headers](https://user-images.githubusercontent.com/9841162/155022212-64c2c342-e75e-4993-b1fc-37245d57e55a.png)

**Blog post**

![A before and after screenshot showing styling updates of a sample blog post page of clairefro's website. The old style had a basic white background, with some questionable color combonations. The new style has a purple sweet potato background with light text and yellow headers](https://user-images.githubusercontent.com/9841162/155022222-2bf951a8-b487-420d-9ca1-a3255b4ba905.png)

Sanket's design (right) not only made the site look much more like a potato, it also solved the accessibility woes that stemmed from my strange attachment to using a gold accent on a white background. I absolutely loved it and implemented the majority of the changes right away.

## Letting go is gaining

As someone who constantly battles their own micro-managey tendencies, I saw Sanket's offer to put together a Figma design as a chance for me to practice letting go of the wheel.

Sanket went a totally different direction with a dark background, enlightened me to the power of subtle contrasts and generally busted down a lot of questionable practices that had become my habits.

For whatever reason I had been way too attached to the pop of the yellow-gold color on white even though I knew it didn't conform to accessiblity standards. The redeisgn boosted the website's Lighthouse score to all-green.

![Comparison of this website's Lighthouse scores before and after the redesign. The redesign boosted Accessibility score to 100%, and Best Practices score to 92 percent. All green baby!](https://user-images.githubusercontent.com/9841162/154866804-bb293154-5ec0-4bbf-993c-34762da148d1.png)

By giving Sanket the minimal constraint of "potato" and letting go, I unlearned my own bad practices, started thinking outside of my self-imposed box, and picked up new style tricks and motifs I'll use in the future.

## Try before you deny

I'll admit that a lot of Sanket's ideas that I came to love actually started with me being opposed to them.

One thing he insisted on was using system fonts instead of web safe fonts. I didn't see why it really mattered since web safe fonts already boost performance for not requiring any font download. Researching for my rebuttle led me to [articles like this](https://css-tricks.com/snippets/css/system-font-stack/) and [this](https://responsivedesign.is/articles/should-i-use-system-fonts-or-web-fonts/), which taught me the value of system fonts and why they are used by major sites like GitHub: they provide a more more seemless look and feel for users of various operating systems and devices. So if you're reading this on Ubuntu, thank Sanket for the familiar Ubuntu feel.

I also felt a knee-jerk repulsion to some of the new color choices, like adding salmon orange into the mix for links. I humored him and tried it out anyway, and must admit I quite like it now and can't imagine a color to replace it.

## Learning in public is The Way

Being comfortable making public mistakes while you learn out loud is a way to get free advice and grow quickly. No fewer than ten people reached out to me in response to my blog post about relaunching my portfolio, many of them strangers.

One friend pointed out I could use the CSS [`focus-visible`](https://developer.mozilla.org/en-US/docs/Web/CSS/:focus-visible) pseudo-class instead of a hacky JavaScript solution I had been using to only outline elements on tab navigation and not when an element is clicked. I felt a bit silly for not knowing about that basic selector, but I sure know I'll be using it in every website I build from now on so I win.

Sometimes you luck out big and someone volunteers a lot of their time to help you, like Sanket did for me.

The internet is full of unsolicited advice you didn't know you needed - learning in public is a way to farm it for free. You can throw out the rotten apples.

## Thanks Sanket

I'm super happy with the new polished look. Most importantly it's still simple: all vanilla CSS baby!

<<<<<<< HEAD
I'm not sure what I did to deserve Sanket's good vibes, talent and patience as we collaborated outside of work on this design project, but I am certainly grateful for the whole experience that left me armed with better practices and pushed me to think beyond my stubborness. I'm happy that he seems to have enjoyed the challenge of making a cohesive potato theme.
=======
I'm not sure what I did to deserve Sanket's good vibes, talent and patience as we collaborated outside of work on this design project, but I am certainly grateful for the whole experience that left me armed with better practices and pushed my to think beyond my stubborness. I'm happy that he seems to have enjoyed the challenge of making a cohesive potato theme.
>>>>>>> 4660223fa604f283c4e37d8cf0c74d3cb3074c41

If you're curious to know more about Sanket and his goings-on, feel free to keep up with him on [his Twitter](https://twitter.com/sanketpath) and [his blog](https://blog.sanketpathak.com/)!
