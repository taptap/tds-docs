---
title: Embedded Moments Design Guideline
---

import {Background, Figure} from '/src/docComponents/doc';
import useBaseUrl from '@docusaurus/useBaseUrl';

## Navbar Labels

### Color Schemes and Applications

Navbar labels are the textual elements used for menu items. They can be in both light and dark colors.

<Background title="Navbar labels appearing in the main menu as icon labels and the logotype">

<Figure caption="Dark navbar labels" imgSrc={useBaseUrl('/img/io/design-moment/1.1.1.1.png')} imgAlt="" />

<Figure caption="Light navbar labels" imgSrc={useBaseUrl('/img/io/design-moment/1.1.1.2.png')} imgAlt="" />

</Background>

<Background title="Navbar labels appearing in the tab list as tabs and the “sort” icon">

<Figure caption="Dark navbar labels" imgSrc={useBaseUrl('/img/io/design-moment/1.1.2.1.png')} imgAlt="" />

<Figure caption="Light navbar labels" imgSrc={useBaseUrl('/img/io/design-moment/1.1.2.2.png')} imgAlt="" />

</Background>

<Background title="Navbar labels appearing in the tab list as tabs and the “sort” icon">

<Figure caption="Dark navbar labels" imgSrc={useBaseUrl('/img/io/design-moment/1.1.3.1.png')} imgAlt="" />

<Figure caption="Light navbar labels" imgSrc={useBaseUrl('/img/io/design-moment/1.1.3.2.png')} imgAlt="" />

</Background>

### Contrast Is Important

The more contrast you set between the text and the background, the more legible the text will be. If you pick a light background for your page, you should set your text in a dark color, and vice versa.

<Background>

<Figure caption="Dark navbar labels" isRecommended={true} quote="Do" imgSrc={useBaseUrl('/img/io/design-moment/1.2.1.1.png')} imgAlt="" />

<Figure isRecommended={false} quote="Don’t" imgSrc={useBaseUrl('/img/io/design-moment/1.2.1.2.png')} imgAlt="" />

</Background>

<Background>

<Figure caption="Light navbar labels" isRecommended={true} quote="Do" imgSrc={useBaseUrl('/img/io/design-moment/1.2.2.1.png')} imgAlt="" />

<Figure isRecommended={false} quote="Don’t" imgSrc={useBaseUrl('/img/io/design-moment/1.2.2.2.png')} imgAlt="" />

</Background>

## Backgrounds

### Background Sizes

Embedded Moments can be displayed in both landscape and portrait modes. This means that you need to provide two background images for your game, one for each orientation.

<Background>

<Figure caption="Sizes" imgSrc={useBaseUrl('/img/io/design-moment/2.1.png')} imgAlt="" />

</Background>

### Cropping Backgrounds

When Embedded Moments is opened on a device with a short screen, the background image will be cropped to fit the size of the screen.

<Background>

<Figure imgSrc={useBaseUrl('/img/io/design-moment/2.2.png')} imgAlt="" />

</Background>

### Designing Background Images

#### Style

The background image shall not be too prominent that it takes the user’s attention away from the main content. Therefore, we suggest that you add simple patterns on the background and keep the contrast within the background to a minimum.

<Background>

<Figure isRecommended={true} quote="Do" content={<>A background that doesn’t catch the user’s attention<br/>- Fewer colors<br/>- Low contrast between the foreground and the background</>} imgSrc={useBaseUrl('/img/io/design-moment/2.3.1.1.png')} imgAlt="" />

<Figure isRecommended={false} quote="Don’t" content={<>A background that catches the user’s attention<br/>- Too many colors<br/>- Too much contrast between the foreground and the background</>} imgSrc={useBaseUrl('/img/io/design-moment/2.3.1.2.png')} imgAlt="" />

</Background>

#### What to Place in the Background

You may add patterns or illustrations to the background as long as they don’t get too much attention from the user.

<Background content="Patterns with low saturation">

<Figure isRecommended={true} quote="Do" content="- Simple patterns with low contrast against the background" imgSrc={useBaseUrl('/img/io/design-moment/2.3.2.1.1.png')} imgAlt="" />

<Figure isRecommended={false} quote="Don’t" content="- The contrast is too strong" imgSrc={useBaseUrl('/img/io/design-moment/2.3.2.1.2.png')} imgAlt="" />

</Background>

<Background content="Illustrations with low saturation">

<Figure isRecommended={true} quote="Do" content="- Illustrations with low saturation give the user a feeling of tranquility" imgSrc={useBaseUrl('/img/io/design-moment/2.3.2.2.1.png')} imgAlt="" />

<Figure isRecommended={false} quote="Don’t" content={<>- The contrast is too strong<br/>- The illustration is too complex</>} imgSrc={useBaseUrl('/img/io/design-moment/2.3.2.2.2.png')} imgAlt="" />

</Background>

<Background content="Simple background with limited decorations">

<Figure isRecommended={true} quote="Do" content="- Limited use of decorations" imgSrc={useBaseUrl('/img/io/design-moment/2.3.2.3.1.png')} imgAlt="" />

<Figure isRecommended={false} quote="Don’t" content={<>- Cluttered decorations<br/>- Decorations occupy too much space</>} imgSrc={useBaseUrl('/img/io/design-moment/2.3.2.3.2.png')} imgAlt="" />

</Background>

#### Safe Zones

To ensure that the entirety of the illustrations in the background can be seen by the user, please keep the illustrations within the safe zones defined below.

<Background content="Patterns with low saturation">

<Figure caption="Rules" imgSrc={useBaseUrl('/img/io/design-moment/2.3.3.1.1.png')} imgAlt="" />

<Figure caption="Examples" imgSrc={useBaseUrl('/img/io/design-moment/2.3.3.1.2.png')} imgAlt="" />

</Background>

<Background content="Illustrations with low saturation">

<Figure caption="Rules" imgSrc={useBaseUrl('/img/io/design-moment/2.3.3.2.1.png')} imgAlt="" />

<Figure caption="Examples" imgSrc={useBaseUrl('/img/io/design-moment/2.3.3.2.2.png')} imgAlt="" />

</Background>

<Background content="Simple background with limited decorations">

<Figure caption="Rules" imgSrc={useBaseUrl('/img/io/design-moment/2.3.3.3.1.png')} imgAlt="" />

<Figure caption="Examples" imgSrc={useBaseUrl('/img/io/design-moment/2.3.3.3.2.png')} imgAlt="" />

</Background>

#### Background Color of the Sticky Tab List

You can set a background color for the sticky tab list. The tab list will fit well with the rest of the UI if you pick the color from the top area of the background image.

<Background>

<Figure caption="Rules" imgSrc={useBaseUrl('/img/io/design-moment/2.3.4.1.png')} imgAlt="" />

<Figure caption="Examples" imgSrc={useBaseUrl('/img/io/design-moment/2.3.4.2.png')} imgAlt="" />

</Background>
