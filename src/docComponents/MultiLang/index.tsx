import React from "react";
import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";
import { BRAND } from "../../constants/env";

const CONFIGS: {
  [kind: string]: { [brand: string]: { label: string; value: string }[] };
} = {
  ios: {
    leancloud: [
      { label: "Objective-C", value: "objc" },
      { label: "Swift", value: "swift" },
    ],
    tds: [{ label: "Objective-C", value: "objc" }],
  },
  engine: {
    leancloud: [
      { label: "JavaScript", value: "javascript" },
      { label: "Python", value: "python" },
      { label: "PHP", value: "php" },
      { label: "Java", value: "java" },
      { label: "C#", value: "csharp" },
      { label: "Go", value: "go" },
    ],
    tds: [
      { label: "JavaScript", value: "javascript" },
      { label: "Python", value: "python" },
      { label: "PHP", value: "php" },
      { label: "Java", value: "java" },
      { label: "C#", value: "csharp" },
      { label: "Go", value: "go" },
    ],
  },
  fulltext: {
    leancloud: [
      { label: ".NET", value: "dotnet" },
      { label: "Java", value: "java" },
      { label: "Objective-C", value: "objc" },
      { label: "Flutter", value: "flutter" },
      { label: "JavaScript", value: "js" },
    ],
    tds: [
      { label: "Unity", value: "unity" },
      { label: "Android", value: "android" },
      { label: "iOS", value: "ios" },
    ],
  },
  play: {
    leancloud: [
      { label: "JavaScript", value: "js" },
      { label: "C#", value: "charp" },
    ],
    tds: [
      { label: "JavaScript", value: "js" },
      { label: "C#", value: "charp" },
    ],
  },
  ue: {
    tds: [
      { label: "Unity", value: "unity" },
      { label: "Android", value: "android" },
      { label: "iOS", value: "ios" },
      { label: "UE4", value: "ue4" },
    ],
  },
  adn: {
    tds: [
      { label: "Unity", value: "unity" },
      { label: "Android", value: "android" },
    ],
  },
  im: {
    tds: [
      { label: "Unity", value: "unity" },
      { label: "Android", value: "android" },
      { label: "iOS", value: "ios" },
      { label: "JavaScript", value: "js" },
    ],
    leancloud: [
      { label: "C#", value: "charp" },
      { label: "Java", value: "java" },
      { label: "Objective-C", value: "objc" },
      { label: "JavaScript", value: "js" },
      { label: "Swift", value: "swift" },
      { label: "Flutter", value: "flutter" },
    ]
  },
  sms: {
    leancloud: [
      { label: "C#", value: "charp" },
      { label: "Java", value: "java" },
      { label: "Objective-C", value: "objc" },
      { label: "Swift", value: "swift" },
      { label: "Flutter", value: "flutter" },
      { label: "JavaScript", value: "js" },
      { label: "Python", value: "python" },
      { label: "PHP", value: "php" },
    ],
  },
  cloud_functions_and_hooks_guide:{
    leancloud: [
      { label: "C#", value: "charp" },
      { label: "Java", value: "java" },
      { label: "Objective-C", value: "objc" },
      { label: "Swift", value: "swift" },
      { label: "Flutter", value: "flutter" },
      { label: "JavaScript", value: "js" },
      { label: "Python", value: "python" },
      { label: "PHP", value: "php" },
      { label: "Go", value: "go" },
    ],
  },
  default: {
    leancloud: [
      { label: ".NET", value: "dotnet" },
      { label: "Java", value: "java" },
      { label: "Objective-C", value: "objc" },
      { label: "Swift", value: "swift" },
      { label: "Flutter", value: "flutter" },
      { label: "JavaScript", value: "js" },
      { label: "Python", value: "python" },
      { label: "PHP", value: "php" },
      { label: "Go", value: "go" },
    ],
    tds: [
      { label: "Unity", value: "unity" },
      { label: "Android", value: "android" },
      { label: "iOS", value: "ios" },
    ],
  },
};

const MultiLang = ({ children, kind = "default" }) => {
  const values = CONFIGS[kind][BRAND];
  return (
    <Tabs groupId="tap-platform">
      {values.map(({ label, value }, index) => (
        <TabItem value={value} label={label} default={index === 0} key={value}>
          {children[index]}
        </TabItem>
      ))}
    </Tabs>
  );
};

export default MultiLang;
