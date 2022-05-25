import React from "react";
import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";
import { BRAND } from "../../constants/env";

function MultiLang({ children, kind }) {
  if (kind === "ios") {
    if (BRAND === "leancloud") {
      const [swift, objc] = children;
      return (
        <Tabs
          groupId="tap-platform"
          defaultValue="swift"
          values={[
            { label: "Swift", value: "swift" },
            { label: "Objective-C", value: "objc" },
          ]}
        >
          <TabItem value="swift">{swift}</TabItem>
          <TabItem value="objc">{objc}</TabItem>
        </Tabs>
      );
    } else {
      const [swift, objc] = children;
      // hide swift (not available under TapSDK)
      return <>{objc}</>;
    }
  } else if (kind === "engine") {
    const [js, python, php, java, cs, go] = children;
    return (
      <Tabs
        groupId="tap-platform"
        defaultValue="javascript"
        values={[
          { label: "JavaScript", value: "javascript" },
          { label: "Python", value: "python" },
          { label: "PHP", value: "php" },
          { label: "Java", value: "java" },
          { label: "C#", value: "csharp" },
          { label: "Go", value: "go" },
        ]}
      >
        <TabItem value="javascript">{js}</TabItem>
        <TabItem value="python">{python}</TabItem>
        <TabItem value="php">{php}</TabItem>
        <TabItem value="java">{java}</TabItem>
        <TabItem value="csharp">{cs}</TabItem>
        <TabItem value="go">{go}</TabItem>
      </Tabs>
    );
  } else {
    if (BRAND === "leancloud") {
      const [dotnet, java, objc, swift, flutter, js, python, php, go] =
        children;
      return (
        <Tabs
          groupId="tap-platform"
          defaultValue="dotnet"
          values={[
            { label: ".NET", value: "dotnet" },
            { label: "Java", value: "java" },
            { label: "Objective-C", value: "objc" },
            { label: "Swift", value: "swift" },
            { label: "Flutter", value: "flutter" },
            { label: "JavaScript", value: "js" },
            { label: "Python", value: "python" },
            { label: "PHP", value: "php" },
            { label: "Go", value: "go" },
          ]}
        >
          <TabItem value="dotnet">{dotnet}</TabItem>
          <TabItem value="java">{java}</TabItem>
          <TabItem value="objc">{objc}</TabItem>
          <TabItem value="swift">{swift}</TabItem>
          <TabItem value="flutter">{flutter}</TabItem>
          <TabItem value="js">{js}</TabItem>
          <TabItem value="python">{python}</TabItem>
          <TabItem value="php">{php}</TabItem>
          <TabItem value="go">{go}</TabItem>
        </Tabs>
      );
    } else {
      const [cs, java, objc] = children;
      return (
        <Tabs
          groupId="tap-platform"
          defaultValue="unity"
          values={[
            { label: "Unity", value: "unity" },
            { label: "Android", value: "android" },
            { label: "iOS", value: "ios" },
          ]}
        >
          <TabItem value="unity">{cs}</TabItem>
          <TabItem value="android">{java}</TabItem>
          <TabItem value="ios">{objc}</TabItem>
        </Tabs>
      );
    }
  }
}

export default MultiLang;
