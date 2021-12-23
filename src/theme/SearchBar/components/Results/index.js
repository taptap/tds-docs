import React from "react";

import { useSelection, List, Group, Card } from "../common";

import styles from "./index.module.scss";

import IconEnter from "../../icons/enter.svg";

const Results = ({ groupedHits, searchFormEl, searchInputEl, openHit }) => {
  const [selection, setSelection, selectionEl] = useSelection(
    groupedHits,
    searchFormEl,
    searchInputEl,
    openHit
  );

  return (
    <List>
      {groupedHits.map((group, groupIndex) => (
        <Group
          title={group.title}
          zIndex={groupedHits.length - groupIndex}
          key={group.title}
        >
          {group.hits.map((hit, hitIndex) => (
            <Hit
              hit={hit}
              selected={
                selection[0] === groupIndex && selection[1] === hitIndex
              }
              onSelect={() => {
                setSelection([groupIndex, hitIndex]);
              }}
              selectionEl={selectionEl}
              openHit={openHit}
              key={hit._id}
            />
          ))}
        </Group>
      ))}
    </List>
  );
};

const Hit = ({ hit, selected, onSelect, selectionEl, openHit }) => (
  <Card
    hit={hit}
    selected={selected}
    onSelect={onSelect}
    selectionEl={selectionEl}
    openHit={openHit}
  >
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <h3 className={styles.excerpt}>{hit._source.heading}</h3>
        {hit._source.content.trim() && (
          <p className={styles.excerpt}>{hit._source.content}</p>
        )}
      </div>
      <div className={`${styles.enter} ${selected ? styles.show : ""}`}>
        <IconEnter />
      </div>
    </div>
  </Card>
);

export default Results;
