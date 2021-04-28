---
id: login-design
title: TapTap Login Button Design Guidelines
sidebar_label: Login Specifications
---

import {Highlight} from '../component';
import useBaseUrl from '@docusaurus/useBaseUrl';

## 1. Information Displayed on TapTap Login Button

The TapTap login button should be composed of the TapTap logo and the `Log in with TapTap` text.
​

✅ Right |- | ❌ Wrong | -|
| ------ | ------ |------ |------ |
| <Highlight color="#15c5ce">Tap logo + the ‘Log in with TapTap’ text</Highlight>   |![](/img/design-1.1-en.png) |<Highlight color='#f00'>Do not use the TapTap logo following the ‘Log in with TapTap’ text</Highlight> | ![](/img/design-1.2-en.png)

## 2. Design Guidelines for TapTap Logo
​
### 2.1 Colors

When adding colors to the TapTap logo, you will have to use the designated Blue-Green. Minor adjustments are allowed. You could also use the TapTap logo in reverse white.

**The color of TapTap must be either the designated color or white.**

✅ Right |- | ❌ Wrong | -|
| ------ | ------ |------ |------ |
| <Highlight color="#15c5ce">1. Minor adjustments are allowed but they have to be based on the designated Blue-Green brand color of TapTap.<br/>2. In dark background, you can use TapTap Logo in reverse white. </Highlight> |![](/img/design-2.1.1-en.png)<br/> ![](/img/design-2.1.2-en.png)| <Highlight color='#f00'>You must not change the designated brand color of TapTap when the logo needs a fill color.</Highlight> | ![](/img/design-2.1.3-en.png)

### 2.2 Guidelines for Customizing TapTap Logo
When the Login SDK is integrated into different games, the TapTap login button will need to fit in the UI of the game. Therefore, developers are allowed to make some minor customization of the TapTap Logo. But such adjustments cannot affect TapTap’s brand recognition. **No restrictions on frame, background, font of the login text, but ‘TapTap’ can only be based on the svg provided.**



✅ Right |- | ❌ Wrong | -|
| ------ | ------ |------ |------ |
| <Highlight color="#15c5ce">1.Keep the design of TapTap’s Logo.<br/>2. Shades are allowed.<br/>3. Texture effect is allowed.<br/>4. Outline effect is allowed.  </Highlight> |![](/img/design-2.2.1-en.png)<br/> ![](/img/design-2.2.2-en.png)| <Highlight color='#f00'>1.The design of TapTap Logo cannot be changed.<br/>2\. TapTap Logo cannot be blurred.<br/>3\. TapTap Logo cannot be replaced by other content.</Highlight> | ![](/img/design-2.2.3-en.png)<br/>![](/img/design-2.2.4-en.png)<br/>![](/img/design-2.2.5-en.png)

<!-- <table>
<tbody>
	<tr>
	<th colSpan={2}>✅ Right </th>
	<th colSpan={2}>❌ Wrong </th>
	</tr>
	<tr >
	<td><Highlight color="#15c5ce">1.Minor adjustments are allowed but they have to be based on the designated Blue-Green brand color of TapTap.  </Highlight></td>
	<td><img src={useBaseUrl('/img/design-2.1.1.png')} alt="" /></td>
	<td><Highlight color='#f00'> In dark background, you can use TapTap Logo in reverse white. </Highlight> </td>
	<td><img src={useBaseUrl('/img/design-2.1.3.png')} alt="" /></td>
	</tr>
</tbody>
</table> -->
