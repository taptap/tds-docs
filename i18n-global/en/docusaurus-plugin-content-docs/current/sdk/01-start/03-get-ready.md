---
id: get-ready
title: Work Preparation
sidebar_label: Work Preparation
---

import {Conditional} from '/src/docComponents/conditional';

In order to use TapTap Developer Services (TDS), you must complete preliminary configurations.

## Creating Applications

You must create an app before integrating TDS into your game. See [Store Guide](/store/store-creategame/) for more details.

## Activate App Configurations

Go to **TapTap Developer Center > Your Games > Game Services > App Configurations**, then tap Activate to obtain basic app info.

### Basic Info

`Client ID` is the unique identifier for an app package in the TapTap Developer Center. TapTap uses the `Client ID` to identify applications. Since each app has one `Client ID`, if you need to have a test server besides an official server for the same app, you must create two different apps and activate their configurations separately.

### Applicable Region

<Conditional region='cn'>

TapTap has two service areas: one for Mainland China and one for other countries and regions. Each service area has its own account system and each client you create can only work for one of the two service areas.

![](/img/tap_get_ready.png)

</Conditional>

<Conditional region='global'>

Suitable for countries and regions outside of Mainland China.

![](/img/io/tap_get_ready.png)

</Conditional>

## Domain Names

<Conditional region='global'>

If you are using TDS cloud services, you must input the API domain name in `server_url` to initialize SDK. Developers can use the **Shared Regions** provided by TDS by going to **Developer Center > Your Games > Game Services > App Configurations > Domain Name Configurations**.

</Conditional>

<Conditional region='cn'>

If you are using TDS cloud services, you must bind a custom API domain name to isolate your game's gateway from other developers'. This will avoid interference from other apps in case of a DDoS attack.

If you use file services in Data Storage, including multimedia instant messaging (such as images, audio, and/or video), you must bind the file access domain name.

Below is a guide on how to bind domain names:

#### Binding an API Domain Name

Before binding an API domain name, you must first have **a domain name with an ICP license**. For example, if your domain name is `example.com`, the status and steps to bind the API domain name are as follows:

![domain guide](/img/domain-guide.png)

\* Go to **Developer Center > Your Games > Game Services > App Configurations > Domain Name Configurations**, then tap the **Bind New Domain Name** button. API domain names do not support the direct binding of bare domain names. You must add a custom name before the primary domain name. In other words, you must create a subdomain, such as `api.example.com`.

\* When the console displays **Inspecting ICP license data**, please wait patiently.

\* If the domain name does not have an ICP license, it will display **Binding failed**.

\* If the name clears inspection, it will display **Configure DNS** below the domain name.

\* Next, you must proceed to the service provider console for the domain name and enter the domain name's analytics settings to add an A-record (this can direct the domain name to an IP address). Copy the custom domain name defined in the developer backend and the A-record value under **Recommended DNS Configuration** into the corresponding locations.

\* It will take some time for your DNS records to take effect and for our server to apply for certificates for your domain (if you enabled automatic certificate management), so please wait patiently. Once the record is in effect, the console will display **Bound**.

During SDK initialization, enter the custom domain name (Ex: `https://api.example.com`) into `server_url`. This is for reference only. Please use your corresponding custom API domain name. Note: Must include `https://`.

Each subdomain may only be bound to one game. Additionally, custom API domain names and file domain names cannot use the same subdomain. If you have already defined a subdomain in the TDS Console, then binding a duplicate domain name will return ‘This domain name is already bound to an application in the console’. If this occurs, you may switch to a different subdomain within the primary domain name to proceed with binding.

Configuring a domain name requires some time. TDS provides developers with **Shared Domain Names** for testing. However, the viability of these domain names cannot be guaranteed and may be susceptible to DDoS attacks. Before a game goes online, be sure to confirm that the API access domain name used is the domain name bound by the developer. Do not use shared domain names in a production environment.

#### Binding File access URL

Go to **Developer Center > Your Games > Game Services > Cloud Services > Data Storage > Files > Settings > File Access Domain Name** to bind file domain names. The process is the same for binding custom API domain names, except for the following two aspects:

1. API domain analytics use A-record, whereas file domain names use a CNAME-record. File domain names also do not support the binding of bare domain names. For example, if your primary domain name is `example.com`, you can bind `files.example.com` as a file domain name.

2. Once the binding is complete, you must go to **Files > Settings > File Access Address**, then click Edit to switch.

</Conditional>

## Privacy Policy

In order to integrate Account Services, you must first agree to the [TapTap Platform Developers Agreement](/store/store-devagreement/. By using TDS, you agree to the above agreement. You will hereby bear the corresponding legal liabilities and obligations as per this agreement.
