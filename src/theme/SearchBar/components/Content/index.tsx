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
  openHit: (hit: HitItem) => void;
  removeRecentHit: (hit: HitItem) => void;
}

const Content = ({
  query,
  recentHits,
  groupedHits,
  ...props
}: ContentProps) => (
  <div className={styles.content}>
    {groupedHits === null ? (
      recentHits.length ? (
        <History recentHits={recentHits} {...props} key={recentHits.length} />
      ) : (
        <NoHistory />
      )
    ) : groupedHits.length ? (
      <Results groupedHits={groupedHits} {...props} key={query} />
    ) : (
      <NoResults />
    )}
  </div>
);

export default Content;
