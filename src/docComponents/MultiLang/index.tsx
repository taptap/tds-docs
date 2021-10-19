import React from 'react';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

function MultiLang({children, kind}) {
  // hide swift (not available under TapSDK)
  if (kind === 'ios') {
    const [swift, objc] = children;
    return <>{objc}</>
  } else if (kind === 'engine') {
    const [js, python, php, java, cs, go] = children;
    return <Tabs
      groupId="tap-platform"
      defaultValue="javascript"
      values={[
        {label: 'JavaScript', value: 'javascript'},
        {label: 'Python', value: 'python'},
        {label: 'PHP', value: 'php'},
        {label: 'Java', value: 'java'},
        {label: 'C#', value: 'csharp'},
        {label: 'Go', value: 'go'},
      ]}>
        <TabItem value="javascript">{js}</TabItem>
        <TabItem value="python">{python}</TabItem>
        <TabItem value="php">{php}</TabItem>
        <TabItem value="java">{java}</TabItem>
        <TabItem value="csharp">{cs}</TabItem>
        <TabItem value="go">{go}</TabItem>
      </Tabs>
  } else {
    const [cs, java, objc] = children;
    return <Tabs
        groupId="tap-platform"
          defaultValue="unity"
          values={[
            {label: 'Unity', value: 'unity'},
            {label: 'Android', value: 'android'},
            {label: 'iOS', value: 'ios'},
          ]}>
            <TabItem value="unity">{cs}</TabItem>
            <TabItem value="android">{java}</TabItem>
            <TabItem value="ios">{objc}</TabItem>
            </Tabs>;
  }
}

export default MultiLang;
