import React from 'react';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

function MultiLang({children}) {
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

export default MultiLang;