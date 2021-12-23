import React from "react";

import History from "../History";
import NoHistory from "../NoHistory";
import Results from "../Results";
import NoResults from "../NoResults";

import styles from "./index.module.scss";

const Content = ({ query, recentHits, groupedHits, ...props }) => (
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
