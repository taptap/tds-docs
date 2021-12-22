import React from "react";

import Suggestions from "../Suggestions";
import NoSuggestions from "../NoSuggestions";
import Results from "../Results";
import NoResults from "../NoResults";

import styles from "./index.module.scss";

const Content = ({ query, recentHits, groupedHits, ...props }) => (
  <div className={styles.content}>
    {groupedHits === null ? (
      recentHits.length ? (
        <Suggestions
          recentHits={recentHits}
          {...props}
          key={recentHits.length}
        />
      ) : (
        <NoSuggestions />
      )
    ) : groupedHits.length ? (
      <Results groupedHits={groupedHits} {...props} key={query} />
    ) : (
      <NoResults />
    )}
  </div>
);

export default Content;
