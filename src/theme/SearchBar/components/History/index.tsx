import React from "react";
import { translate } from "@docusaurus/Translate";

import { useSelection, List, Group, Card } from "../common";

import styles from "./index.module.scss";

import IconClear from "../../icons/clear.svg";
import IconRecent from "../../icons/recent.svg";

import type { HitItem, HitGroup } from "../../common";

interface HistoryProps {
  recentHits: HitItem[];
  searchFormEl: React.RefObject<HTMLFormElement>;
  searchInputEl: React.RefObject<HTMLInputElement>;
  openHit: (hit: HitItem) => void;
  removeRecentHit: (hit: HitItem) => void;
}

const History = ({
  recentHits,
  searchFormEl,
  searchInputEl,
  openHit,
  removeRecentHit,
}: HistoryProps) => {
  const groupedHits: HitGroup[] = [{ title: "", hits: recentHits }];
  const [selection, setSelection, selectionEl] = useSelection(
    groupedHits,
    searchFormEl,
    searchInputEl,
    openHit
  );

  return (
    <List>
      <Group
        title={translate({ id: "tds.search.recent", message: "最近看过" })}
        zIndex={1}
      >
        {recentHits.map((hit: HitItem, hitIndex: number) => (
          <Card
            hit={hit}
            selected={selection[0] === 0 && selection[1] === hitIndex}
            onSelect={() => {
              setSelection([0, hitIndex]);
            }}
            selectionEl={selectionEl}
            openHit={openHit}
            key={hit._id}
          >
            <div className={styles.wrapper}>
              <div className={styles.content}>
                <div className={styles.icon}>
                  <IconRecent />
                </div>
                <h3 className={styles.excerpt}>{hit._source.heading}</h3>
              </div>
              <button
                className={styles.clearButton}
                title={translate({
                  id: "tds.search.removeItem",
                  message: "删除该项目",
                })}
                onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                  removeRecentHit(hit);
                  e.preventDefault();
                  e.stopPropagation();
                }}
              >
                <IconClear />
              </button>
            </div>
          </Card>
        ))}
      </Group>
    </List>
  );
};

export default History;
