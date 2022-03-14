---
title: Copyright Verification
sidebar_label: Features
sidebar_position: 1
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import {Conditional} from '/src/docComponents/conditional';

## Overview

TapTap offers copyright verification services for pay-to-download games. When a player launches a paid game, the service can verify if the player has purchased the game.

## How to Enable

You will need to submit an application to enable this service. Please follow the instructions on the following screenshot.

<Conditional region='cn'>
<img src={useBaseUrl('/img/license_introduce1.png')} alt="" width="1000" />
</Conditional>
<Conditional region='global'>
<img src={useBaseUrl('/img/io/copyright-verification.png')} alt="" width="1000" />
</Conditional>

## Price Settings

TapTap’s copyright verification service must be configured together with the paid game’s price settings. TapTap helps you manage your paid games and offers multiple payment methods for the players. You can make your game a paid game in the Price Settings at <Conditional region='cn'>[TapTap Developer Center](https://developer.taptap.com/)</Conditional><Conditional region='global'>[TapTap Developer Center](https://developer.taptap.io/)</Conditional> and set up the price. If you want to start a promotion for your game, you can turn on the promotion feature and specify the promotion period and discounted price for your game.

<Conditional region='cn'>
<img src={useBaseUrl('/img/license_introduce2.png')} alt="" width="1000" />
</Conditional>
<Conditional region='global'>
<img src={useBaseUrl('/img/io/sales-settings.png')} alt="" width="1000" />
</Conditional>

## Integrating SDK

After you integrate the copyright verification SDK into your game, the SDK will make a verification query on purchase results when a user launches the game. The user will be able to access the game if it has been purchased normally. Otherwise, a message will remind the player to purchase the game first. Refer to [Developer Guide](/sdk/lisence/guide/) for details about the integration.
