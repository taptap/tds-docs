---
id: text-moderation-best-practice
title: Text Moderation Best Practice
sidebar_label: Best Practice
slug: /sdk/text-moderation/best-practice/
---

## Game nickname check-up

According to "Internet Information Service Management Measures", "Network Information Content Ecological Governance Regulations" and other laws and regulations as well as the requirements of relevant authorities such as the State Cyberspace Administration of China, game developers and operators need to ensure that the information released by players also meets content security regulations. Among them, the player’s nickname has the characteristics of long-term holding and frequent appearance, so it is easy to cause obvious risk of violation. Therefore, Text Moderation provides games with the capability to identify incompliant nicknames.

### Prerequisites

 - Already [Enable Text Moderation Service](/sdk/text-moderation/features#enable-text-moderation-service)
 - Already read [Development Guide](/sdk/text-moderation/guide/)

### Application scenarios

When a game creates a role and a player creates a nickname for himself, the server can use the Text Moderation API to identify them. For details about the logic processing, please refer to the following:

1. The player inputs the nickname: "The game is not fun", and then clicks to create a role
2. The server receives the request to create a role and then uses the server-side Text Moderation API to check up the player's nickname. According to the returned result, the following situations can be handled:

1. **Passed**: The nickname is identified as healthy content, so the server allows the creation of the nickname

2. **In Review**: Due to the “In Review” situation, the game can execute the above-mentioned "Passed" logic and then manually decide whether to modify the nickname according to the record

3. **Rejected**: The nickname has risk of violation. It does not meet the requirements and is not allowed to be created 

3. Through the above Text Moderation structure, the identification satisfying the nickname scenario can be achieved


### Code demo

**Golang**

``` golang
rs : = client.Check("The game is not fun")
if rs.result == 1 {
    // todo: reject create user
} else if rs.result == 2 {
    // todo: can create user, log result for auditor review
} else {
    // todo: get pass, can create user
}
```


## Chat check-up 

Most online games have instant messaging, broadcast, chat room and other scenarios. In these scenarios, there may be incompliant, illegal, vulgar and pornographic contents and promotion-inducing information. In order to reduce the burden on developers, Text Moderation can be used to solve a series of problems involving the content ecology under such scenarios, ensure that the content is healthy and active, combat incompliant and illegal information, stop the spread of vulgar and pornographic contents and block the promotion-inducing information.

### Prerequisites

 - Already [Activate Text Moderation Service](/sdk/text-moderation/features#enable-text-moderation-service)
 - Already read [Development Guide](/sdk/text-moderation/guide/)

### Application scenarios

When a player is chatting and disseminating contents, the contents can be identified and filtered through the Text Moderation API. The logic processing can be referred to as follows:

#### Political content filtering
1. The player inputs the chat content: "It’s a horrible game" and sends it to the public screen
2. The server receives the request to send the content to the public screen and then uses the Text Moderation API to check up the content on the server. According to the returned filtered content results, the following situations can be handled:

1. **Passed**: The content is identified as healthy content and is allowed to be sent to the public screen

2. **In Review**: Due to the “In Review” situation, the game can execute the above-mentioned "Passed" logic and then manually decide whether to block the content or close the account according to the record

3. **Rejected**: The chat content has politics-related content and does not meet the requirements. The chat content is not allowed to be sent to the public screen, or it is sent as the filtered text "It’s a * game", which has been filtered by the API

### Code demo

**Golang**

``` golang
rs: = client.Check("It’s a horrible game")
if rs.result == 1 && rs.filtered_text != "" {
    // todo: can send 'rs.filterd_text' in chat room
} else if rs.result == 2 {
    // todo: can send msg, log result for auditor review
} else if rs.result == 0 {
    // todo: get pass, can send msg
} else {
    // todo: warning info send to user
}
```

#### Advertising content

1. The player inputs the chat content: "Game studio, whatsapp number xxxx" and sends it to the public screen
2. The server receives the request to send the content to the public screen and then uses the Text Moderation API to check up the content on the server. According to the returned filtered content results, the following situations can be handled:

1. **Passed**: The content is identified as healthy content and is allowed to be sent to the public screen 

2. **In Review**: Due to the “In Review” situation, the game can execute the above-mentioned "Passed" logic and then manually decide whether to block the content or close the account according to the record
...
3. **Rejected**: The identification type of the content is Adv, so the content needs to be blocked and cannot be sent to the public screen

### Code demo

**Golang**

``` golang
rs : = client.Check("Game studio, whatsapp number xxxx")
if rs.result == 1 && rs.type == "Adv" {
    // todo: reject send to chat room
} else if rs.result == 2 {
    // todo: can send msg, log result for auditor review
} else {
    // todo: get pass, can send msg
}
```
