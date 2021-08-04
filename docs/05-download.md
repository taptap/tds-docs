---
title: 下载 SDK
---

import { usePluginData } from "@docusaurus/useGlobalData";
import { DownloadCard } from "/src/components/DownloadCard";

export const DownLoadCards = ({}) => {
  const { sdk: sdkData } = usePluginData("tapdb-plugin-data-file");
  const cards = sdkData.map((cardData) => <DownloadCard {...cardData} />);
  return <div>{cards}</div>;
};

<DownLoadCards />
