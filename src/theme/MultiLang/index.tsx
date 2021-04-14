import React from 'react';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

function MultiLang({children}) {
    const [java, objc, cs] = children;
    return <Tabs
        groupId="tap-platform"
          defaultValue="Android"
          values={[
            {label: 'Android', value: 'android'},
            {label: 'iOS', value: 'ios'},
            {label: 'unity', value: 'unity'},
          ]}>
            <TabItem value="android">{java}</TabItem>
            <TabItem value="ios">{objc}</TabItem>
            <TabItem value="unity">{cs}</TabItem>
            </Tabs>;
}

export default MultiLang;