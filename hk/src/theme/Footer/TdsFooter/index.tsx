import React from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { Footer as SFooter, Language } from './lib/ssr/footer'
import './lib/ssr/style.css';

function TdsFooter() {
  const {
    i18n: { currentLocale },
  } = useDocusaurusContext();
  const { html } = SFooter.render({
    language: currentLocale === 'en' ? Language.en : Language.zh_CN,
    tapUrl: 'https://www.taptap.cn',
    discordUrl: 'https://discord.gg/ZyuM66bAwx',
  })
  return (<div dangerouslySetInnerHTML={{__html: html}}></div>);
};

export default TdsFooter;
