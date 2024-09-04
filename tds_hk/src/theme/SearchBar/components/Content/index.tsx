import React from "react";

import History from "../History";
import NoHistory from "../NoHistory";
import Results from "../Results";
import NoResults from "../NoResults";

import styles from "./index.module.scss";

import type { HitItem, HitGroupWithTitle } from "../../common";

interface ContentProps {
  query: string;
  recentHits: HitItem[];
  groupedHits: HitGroupWithTitle[] | null;
  searchFormEl: React.RefObject<HTMLFormElement>;
  searchInputEl: React.RefObject<HTMLInputElement>;
  openHit: (hit: HitItem,query: string) => void;
  removeRecentHit: (hit: HitItem) => void;
}

const Content = ({
  query,
  recentHits,
  groupedHits,
  openHit,
  ...props
}: ContentProps) => (
  <div className={styles.content}>
    {groupedHits === null ? (
      recentHits.length ? (
          
        // 历史信息
        <History query={query} recentHits={recentHits} {...props} key={recentHits.length} openHit={openHit}/>
      ) : (
        <NoHistory />
      )
    ) : groupedHits.length ? (
      <Results groupedHits={groupedHits} {...props} key={query} query={query} openHit={openHit}/>
    ) : (
      <NoResults />
    )}
  </div>
);

export default Content;
