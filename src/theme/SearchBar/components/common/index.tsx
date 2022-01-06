import React, { useState, useEffect, useRef } from "react";
import Link from "@docusaurus/Link";

import styles from "./index.module.scss";

import type { HitItem, HitGroup } from "../../common";

const useSelection = (
  groupedHits: HitGroup[],
  searchFormEl: React.RefObject<HTMLFormElement>,
  searchInputEl: React.RefObject<HTMLInputElement>,
  openHit: (hit: HitItem) => void
) => {
  type Selection = [number, number];

  const scrollTo = (el: HTMLLIElement) => {
    el.scrollIntoView({ block: "nearest" });
  };

  const getHit = (groupedHits: HitGroup[], selection: Selection): HitItem => {
    const [selectedGroup, selectedHit] = selection;
    const hit: HitItem = groupedHits[selectedGroup].hits[selectedHit];
    return hit;
  };

  const getNewSelection = (
    groupedHits: HitGroup[],
    selection: Selection,
    delta: number
  ): Selection => {
    const modulo = (a: number, n: number): number => ((a % n) + n) % n;
    const getGroupLength = (group: number): number =>
      groupedHits[group].hits.length;

    let [selectedGroup, selectedHit] = selection;
    selectedHit += delta;

    while (selectedHit >= getGroupLength(selectedGroup)) {
      selectedHit -= getGroupLength(selectedGroup);
      selectedGroup = modulo(selectedGroup + 1, groupedHits.length);
    }

    while (selectedHit < 0) {
      selectedGroup = modulo(selectedGroup - 1, groupedHits.length);
      selectedHit += getGroupLength(selectedGroup);
    }

    return [selectedGroup, selectedHit];
  };

  const [selection, setSelection] = useState<Selection>([0, 0]);
  const selectionEl = useRef<HTMLLIElement>(null);

  useEffect(() => {
    const handleSubmit = () => {
      const hit: HitItem = getHit(groupedHits, selection);
      openHit(hit);
    };

    searchFormEl.current?.addEventListener("submit", handleSubmit);
    return () => {
      searchFormEl.current?.removeEventListener("submit", handleSubmit);
    };
  }, [groupedHits, selection]);

  const moveSelection = (delta: number) => {
    const newSelection: Selection = getNewSelection(
      groupedHits,
      selection,
      delta
    );
    setSelection(newSelection);
    if (selectionEl.current) scrollTo(selectionEl.current);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowUp":
          moveSelection(-1);
          break;
        case "ArrowDown":
          moveSelection(1);
          break;
      }
    };

    searchInputEl.current?.addEventListener("keydown", handleKeyDown);
    return () => {
      searchInputEl.current?.removeEventListener("keydown", handleKeyDown);
    };
  }, [groupedHits, selection]);

  useEffect(() => {
    if (selectionEl.current) scrollTo(selectionEl.current);
  }, []);

  return [selection, setSelection, selectionEl] as const;
};

interface ListProps {
  children: React.ReactNode;
}

const List = ({ children }: ListProps) => (
  <div className={styles.list}>{children}</div>
);

interface GroupProps {
  title: string;
  zIndex: number;
  children: React.ReactNode;
}

const Group = ({ title, zIndex, children }: GroupProps) => (
  <div className={styles.group} style={{ zIndex }}>
    <div className={styles.title}>
      <h2 className={styles.excerpt}>{title}</h2>
    </div>
    <ul>{children}</ul>
  </div>
);

interface CardProps {
  hit: HitItem;
  selected: boolean;
  onSelect: () => void;
  selectionEl: React.RefObject<HTMLLIElement>;
  openHit: (hit: HitItem) => void;
  children: React.ReactNode;
}

const Card = ({
  hit,
  selected,
  onSelect,
  selectionEl,
  openHit,
  children,
}: CardProps) => (
  <li
    className={`${styles.card} ${selected ? styles.selected : ""}`}
    aria-selected={selected}
    onMouseMove={onSelect}
    ref={selected ? selectionEl : null}
  >
    <Link
      to={`/${hit._source.url}`}
      onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
        openHit(hit);
        e.preventDefault();
      }}
    >
      {children}
    </Link>
  </li>
);

export { useSelection, List, Group, Card };
