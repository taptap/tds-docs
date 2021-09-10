---
id: features
title: Text Moderation Features
sidebar_label: Features
---

## Service introduction
### Product profile

[Text Moderation] provides real-time, intelligent and personalized risky text check-up services for Scenes such as nicknames, chats and personalized signatures.
Based on AI and multiple identification strategies, the product can timely, accurately, and efficiently resist the risks of illegal content related to politics, violence, terrorism, pornography, and abuse.

### Application Scenes

- User information check-up: nicknames, union names, profiles, personalized signatures, etc.
- Instant communication check-up: chat rooms, IM messages, etc.
- Non-real-time communication check-up: posts, bulletins, comments, updates, etc.

### Service capabilities

- Identification check-up: identify sensitive and illegal texts related to politics, pornography, violence, terrorism, abuse, contraband, crime, cults, etc.
Console: custom lexicon, Scene identification strategy control, check-up history query, online real-time check-up, etc. For the detailed introduction of the console, please refer to [Console operation](#Console operation)
- Lexicon maintenance: a professional operation team continues to update the default lexicon to keep up with policy requirements.

### Access mode

Provide convenient and flexible API access modes. For details about API, please refer to [Development Guide](/sdk/text-moderation/guide/)

## Enable Text Moderation service
1. Activation: In "Developer Center"-"Support"-"Create", select "Game Services"-"Text Moderation"-"Activate Application", fill in the contact information, and briefly describe the usage Scene. After you submit the application, a dedicated staffer will provide you consultation services about the activation.
2. After obtaining the qualification for activation, you should use the administrator account to enter the game corresponding to the Developer Center.
3. Click the [Game Services] menu at the top.
4. If the Game Services function has not been enabled previously, it will need to be enable first.
5. Find the Text Moderation service and click [Enable] to enable the service.

During subsequent use, you can access the service console through the path in the Developer Center game project: Game Services> Text Moderation.


##  Console operation
Next, we will first introduce the core concepts in the Text Moderation Console. They will help you understand the daily configuration and use of the Console.

### Concepts and their definitions
#### [Scene]
In Text Moderation, [Scene] is the core object which is oriented to businesses and modules and aggregates multiple check-up strategies.

It can be simply understood that the text is checked up through [Scene] and then the system outputs the check-up result.

In business, a [Scene] often corresponds to a type of business Scenes, such as chat Scenes, nickname Scenes, and so on. Similar business Scenes can share a [Scene]. For example, chats, messages, bullet screen and comments can use the [chat check-up] Scene provided by default.

As for the detailed description of [Scene], please refer to [Scene configuration](#Scene configuration )

#### [Lexicon]
[Lexicon] is used to accommodate blacklisted or white-listed keywords that need to be blocked or allowed. The word-related check-up logic in [Scene] depends on the lexicon.

[Lexicon] is divided into default lexicon and custom lexicon:

- Default lexicon: continuously updated by professional operators to keep up with the latest network security requirements.

- Custom lexicon: defined by the game operator itself

For the detailed description of [custom lexicon], please refer to [Custom lexicon configuration](#Custom lexicon configuration)


### Console overview 

In the Text Moderation Console, you can modify the check-up configuration, view the check-up statistics, and query the check-up history.

The top function menu of the Text Moderation Console is as follows:

- [Statistics] page: used to view check-up statistics.
- [Check-up history] page: used to query the recent check-up history.
- [On-line check-up] page: used to input the text online and check if it violates the rules.
- [Scenes] page: used to configure the check-up strategy and get Scene ID for API call.
- [Custom lexicon] page: used to configure user-defined blacklisted and white-listed words.

### Console - Statistics 
![](/img/text-moderation-en-01.png)

On this page, you can view recent check-up core data indicators.

By selecting a Scene and date query, you can view the chart under the corresponding condition.

- [Overall check-up statistics] chart: in the chart, the bar represents the pass rate, and broken lines represent the number of check-ups, the number of passes and the number of rejects.
- [Distribution statistics of identification types of rejects] chart: in the chart, the broken line indicates the number of each identification type.

### Console - Check-up history 
![](/img/text-moderation-en-02.png)

On this page, you can query the details of each recent check-up history, including check-up text, check-up result, identification type, time, etc.

- You can use multi-dimensional filtering conditions to directionally query the records you need.
- When the mouse moves over the text, a complete text bubble will be displayed. If the text fails to pass the check-up, the words and sentences that may violate the rules will be displayed in red in the bubble.

### Console - On-line check-up 
![](/img/text-moderation-en-03.png)

On this page, you can enter the text online, use the selected Scene to check the text and output the check-up result in real time.

- On-line check-up is often used to quickly test the effect of the Scene after adjusting the Scene configuration. It is also used for the self-check of official texts such as the operation announcements of games.
- The text of on-line check-up carries “admin_000000” as user ID in the record by default. You can use this item to distinguish which records are generated via on-line check-up.

### Console - Scene configuration
![](/img/text-moderation-en-04.png)

On this page, you can configure the Scene strategically, including the identification type enabled and the lexicon used. The Scene ID can be obtained here, which can be used to specify the Scene for check-up under API requests. For details regarding Scene parameters, please refer to [Development Guide](/sdk/text-moderation/guide/)

#### 1. Scene introduction
Two Scenes are provided by default once the service is enabled:

- [Nickname user profile] Scene: Recommended for the naming of user nicknames, personalized signatures, team names, union names, union declarations, etc., and used as the text Scene representing roles or groups.
- [Chat check-up] Scene: Recommended for a wide range of UGC text Scenes such as user chats, messages, comments, mails, bullet screen, etc.

> Because the [chat check-up] Scene is extremely versatile, texts other than the nickname user profile can be checked with the [chat check-up] Scene in most cases.

#### 2. Modify and enable the identification type
In the [Modify] pop-up window, select an identification type. This means that this type of sensitive words will be included in the check-up scope. If it is not selected, even if such sensitive words appear in the text, they will not be identified.

> Enable all identification types. This configuration mode is applicable to almost all games.

#### 3. Modify and use the lexicon

- In the [Modify] pop-up window, all available lexicons are displayed on the left, including the default lexicon provided by the system as well as custom lexicons. After selecting a lexicon, you can use the lexicon.
- All lexicons used are displayed on the right side of the pop-up window, and the order of lexicons can be modified by dragging and dropping them with the cursor. The order determines the priority. Lexicons placed at the front have higher priority.
- The priority determines: when the same word appears in multiple lexicons, its type in the lexicon with the higher priority shall prevail.

> Generally, the priority of the custom lexicon is configured to be higher than that of the default lexicon

### Console - Custom lexicon configuration
![](/img/text-moderation-en-05.png)

Custom lexicons can be managed on this page. After a custom lexicon is used by a Scene, it can play a role in the Scene and identify words in the lexicon.

#### 1. Manage custom lexicons 
Currently, up to 5 custom lexicons can be supported at the same time, and multiple lexicons can be maintained for the use of Scenes based on operational needs.

#### 2. Manage words in the lexicon
![](/img/text-moderation-en-06.png)

In the pop-up window for adding and deleting words, you can add new words, delete words and modify the identification types of words.

- The identification type of a word corresponds to the enabled identification type in the [Scene] configuration. If an identification type is not selected in [Scene], even if words of this type are added to the lexicon, they cannot be identified during check-up.
- If a newly added word already exists, it can also be added successfully and replaces the original identification type of the word.
- When the identification type of a word is [health], it is similar to a whitelist, meaning that the word can pass the check-up unconditionally. Please use it with caution.

Note: A [health] word only serves to let go of a part of the text that contains it in its entirety.

Example: If there are sensitive words such as [weapons] and [rob] in the text, when a [health] word like [drop weapons] is added to the lexicon,

- A sentence like [I drop weapons] can pass the check-up;
- A sentence like [dropped weapons] cannot pass the check-up (because it contains the sensitive word [weapons] but does not completely match the [health] word [drop weapons]);
- A sentence [rob and drop weapons] cannot pass the check-up (the [drop weapon] part is let go, but [rob] is a sensitive word, so the whole sentence is rejected).

[Health] words do not distinguish uppercase and lowercase, and they do not distinguish between simplified Chinese and traditional Chinese. When they are added into the lexicon, they can use lowercase letters and simplified Chinese. The corresponding uppercase letters and traditional Chinese can also be let go.

:::caution
To ensure that a [health] word takes effect in the Scene, please ensure the lexicon contains the [health] word. In the [Use lexicon] configuration of the Scene, the order takes precedence over the lexicon defaulted by the system.
:::

## Configuration scheme recommended by the console
The following configuration schemes are suitable for most games. It is recommended to follow the configuration schemes initially. If you need refined operations at a later time, you can gradually adjust them after you are fully familiar with the system.

### Lexicon configuration

> General, common and critical shielded words are included in the default lexicon. Generally, there is no need to maintain a large number of shielded words in custom lexicons. It is recommended that custom shielded words be added in custom lexicons selectively according to the actual use effect.

#### 1. A new lexicon [whitelist]

All the words that you want to let go should be added to the lexicon. When you add a word to the lexicon, please select [Health] as its identification type.

#### 2. A new lexicon [general shielded words]
All words to be additionally blocked should be added to the lexicon. When you add a word to the lexicon, please select the corresponding identification type for the word according to the expected classification of the word. A reasonable identification type can help subsequent operation management and tracking of data.


:::caution
After creating a new lexicon, you need to select [Use lexicon] in the corresponding Scene in order for it to take effect.
:::

### Scene configuration  
#### 1. Configure the [nickname user profile check-up] Scene 
1. [Enable identification type] select all by default.
2. On the left side of the [Use lexicon] pop-up window, keep the two [default] lexicons selected, and select the custom lexicon [whitelist][general shielded words].
3. On the right side of the [Use lexicon] pop-up window, adjust the order of using lexicons to: whitelist>general shielded words>[default]nickname lexicon>[default]basic general lexicon.
4. Submit the modification to complete the configuration.

#### 2. Configure the [chat check-up] Scene 
1. [Enable identification type] select all by default.
2. On the left side of the [Use lexicon] pop-up window, keep the two [default] lexicons selected, and select the custom lexicon [whitelist][general shielded words].
3. On the right side of the [Use lexicon] pop-up window, adjust the order of using lexicons to: whitelist>general shielded words>[default]chat lexicon>[default]basic general lexicon.
4. Submit the modification to complete the configuration.

### Scene parameter options
-Naming modules, such as nicknames, personalized signatures, team names, union names and union declarations, use the Scene ID of [nickname user profile check-up] as the parameter when calling the service.

-UGC text modules other than the above modules use the Scene ID of [chat check-up] as the parameter when calling the service.

For details about API usage, please refer to [Development Guide](/sdk/text-moderation/guide/)
