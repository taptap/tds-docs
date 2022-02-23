---
id: test-accounts
title: Manage Testers
sidebar_label: Manage Testers
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import {Conditional} from '/src/docComponents/conditional';

You can manage the tester list for TapTap login, Copyright Verification, and other related services. Users can join the testing of your game with TapTap Login before it passes the review and is officially released.  After your game is released on TapTap, you can make the login available for all users at ‘TapTap Login - Status’.

**Attention**

* **Make sure you already have the permission to manage the testers. The following roles have this permission by default: Super Administrator, Game Administrator, Publisher, and Developer.**
* **Make sure that your game’s configuration has been enabled.**

1. Log into <Conditional region='cn'>[TapTap Developer Center](https://developer.taptap.com/)</Conditional><Conditional region='global'>[TapTap Developer Center](https://developer.taptap.io/)</Conditional>, go to the game page and click on ‘Game Services’.

2. Find ‘Manage Participants’. You can add TapTap users as testers on this page.

    <Conditional region='cn'>
    <img src={useBaseUrl('/img/sdk-test-accounts-1.png')} alt="" />
    </Conditional>
    <Conditional region='global'>
    <img src={useBaseUrl('/img/io/test-account-1.png')} alt="" />
    </Conditional>

3. Search for users with their ID or nickname and submit the information to add to the tester list.

    <Conditional region='cn'>
    <img src={useBaseUrl('/img/sdk-test-accounts-2.png')} alt="" />
    </Conditional>
    <Conditional region='global'>
    <img src={useBaseUrl('/img/io/test-account-2.png')} alt="" />
    </Conditional>