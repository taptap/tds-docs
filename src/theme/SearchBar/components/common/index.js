import React, { useState, useEffect, useRef } from "react";

import styles from "./index.module.scss";

const useSelection = (groupedHits, searchFormEl, searchInputEl, openHit) => {
  const scrollTo = (el) => {
    el.scrollIntoView({ block: "nearest" });
  };

  const getHit = (groupedHits, selection) => {
    const [selectedGroup, selectedHit] = selection;
    const hit = groupedHits[selectedGroup].hits[selectedHit];
    return hit;
  };

  const getNewSelection = (groupedHits, selection, delta) => {
    const modulo = (a, n) => ((a % n) + n) % n;
    const getGroupLength = (group) => groupedHits[group].hits.length;

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

  const [selection, setSelection] = useState([0, 0]);
  const selectionEl = useRef(null);

  useEffect(() => {
    const handleSubmit = () => {
      const hit = getHit(groupedHits, selection);
      openHit(hit);
    };

    searchFormEl.current.addEventListener("submit", handleSubmit);
    return () => {
      searchFormEl.current?.removeEventListener("submit", handleSubmit);
    };
  }, [groupedHits, selection]);

  const moveSelection = (delta) => {
    const newSelection = getNewSelection(groupedHits, selection, delta);
    setSelection(newSelection);
    scrollTo(selectionEl.current);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      switch (e.key) {
        case "ArrowUp":
          moveSelection(-1);
          break;
        case "ArrowDown":
          moveSelection(1);
          break;
      }
    };

    searchInputEl.current.addEventListener("keydown", handleKeyDown);
    return () => {
      searchInputEl.current?.removeEventListener("keydown", handleKeyDown);
    };
  }, [groupedHits, selection]);

  useEffect(() => {
    scrollTo(selectionEl.current);
  }, []);

  return [selection, setSelection, selectionEl];
};

const List = ({ children }) => <div className={styles.list}>{children}</div>;

const Group = ({ title, zIndex, children }) => (
  <div className={styles.group} style={{ zIndex }}>
    <div className={styles.title}>
      <h2 className={styles.excerpt}>{title}</h2>
    </div>
    <ul>{children}</ul>
  </div>
);

const Card = ({ hit, selected, onSelect, selectionEl, openHit, children }) => (
  <li
    className={`${styles.card} ${selected ? styles.selected : ""}`}
    aria-selected={selected}
    onMouseMove={onSelect}
    ref={selected ? selectionEl : null}
  >
    <a
      href={hit._source.url}
      onClick={(e) => {
        openHit(hit);
        e.preventDefault();
      }}
    >
      {children}
    </a>
  </li>
);

export { useSelection, List, Group, Card };
