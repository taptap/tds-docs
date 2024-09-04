import React from "react";

import { useSelection, List, Group, Card } from "../common";

import styles from "./index.module.scss";

import IconEnter from "../../icons/enter.svg";

import type { HitItem, HitGroupWithTitle } from "../../common";

interface ResultsProps {
  query:string,
  groupedHits: HitGroupWithTitle[];
  searchFormEl: React.RefObject<HTMLFormElement>;
  searchInputEl: React.RefObject<HTMLInputElement>;
  openHit: (hit: HitItem,query:string) => void;
}

const Results = ({
  query,
  groupedHits,
  searchFormEl,
  searchInputEl,
  openHit,
}: ResultsProps) => {
  const [selection, setSelection, selectionEl] = useSelection(
    groupedHits,
    query,
    searchFormEl,
    searchInputEl,
    openHit
  );
  return (
   
    <List>
      {groupedHits.map((group: HitGroupWithTitle, groupIndex: number) => (
        <Group
          title={group.title}
          zIndex={groupedHits.length - groupIndex}
          key={group.title}
        >
          {group.hits.map((hit: HitItem, hitIndex: number) => (
            <Hit
            query={query}
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

interface HitProps {
  hit: HitItem;
  query:string;
  selected: boolean;
  onSelect: () => void;
  selectionEl: React.RefObject<HTMLLIElement>;
  openHit: (hit: HitItem,query:string) => void;
}

const Hit = ({ hit, selected, onSelect, selectionEl, openHit,query }: HitProps) => (
  
  <Card
    hit={hit}
    selected={selected}
    onSelect={onSelect}
    selectionEl={selectionEl}
    openHit={openHit}
    query={query}
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
