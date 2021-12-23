import React, { useState, useEffect, useRef } from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Translate from "@docusaurus/Translate";
import axios from "axios";

import Input from "./components/Input";
import Content from "./components/Content";
import Footer from "./components/Footer";

import styles from "./index.module.scss";

import IconSearchBtn from "./icons/search-btn.svg";

const SEARCH_API_URL = "https://tds-doc-search-api.cn-e1.leanapp.cn/search";

const useRecentHits = () => {
  const getRecentHitsFromLocalStorage = () => {
    const recentHits =
      JSON.parse(localStorage.getItem("tdsDocSearchRecentHits")) || [];
    return recentHits;
  };

  const [recentHits, setRecentHits] = useState(getRecentHitsFromLocalStorage);

  useEffect(() => {
    const saveRecentHitsToLocalStorage = (recentHits) => {
      const recentHitsInString = JSON.stringify(recentHits);
      localStorage.setItem("tdsDocSearchRecentHits", recentHitsInString);
    };

    saveRecentHitsToLocalStorage(recentHits);
  }, [recentHits]);

  return [recentHits, setRecentHits];
};

const getUpdatedRecentHits = (recentHits, hit, addHit) => {
  const updatedRecentHits = [
    ...(addHit ? [hit] : []),
    ...recentHits.filter((recentHit) => recentHit._id !== hit._id),
  ].slice(0, 15);
  return updatedRecentHits;
};

const useSearch = (url) => {
  const groupHits = (hits) => {
    const groupedHits = [];

    hits.forEach((hit) => {
      for (const group of groupedHits) {
        if (group.title === hit._source.title) {
          group.hits.push(hit);
          return;
        }
      }

      groupedHits.push({
        title: hit._source.title,
        hits: [hit],
      });
    });

    groupedHits.sort((a, b) => {
      const getAvgScore = ({ hits }) =>
        hits.reduce((p, c) => p + c._score, 0) / hits.length;
      return getAvgScore(b) - getAvgScore(a);
    });

    return groupedHits;
  };

  const [query, setQuery] = useState("");
  const [groupedHits, setGroupedHits] = useState(null);

  useEffect(() => {
    let ignore = false;

    const fetchHits = async (url, query) => {
      const config = {
        params: { q: query },
      };
      const response = await axios.get(url, config);
      return response.data.hits;
    };

    const search = async () => {
      const hits = await fetchHits(url, query);
      if (!ignore) {
        const groupedHits = groupHits(hits);
        setGroupedHits(groupedHits);
      }
    };

    if (query) {
      search();
    } else {
      setGroupedHits(null);
    }

    return () => {
      ignore = true;
    };
  }, [query]);

  return [query, setQuery, groupedHits];
};

const useToggle = () => {
  const [isOpen, setIsOpen] = useState(false);

  const open = () => {
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
  };

  return [isOpen, open, close];
};

const SearchBar = () => {
  const [isSearchOpen, openSearch, closeSearch] = useToggle();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (((e.metaKey && e.key === "k") || e.key === "/") && !isSearchOpen) {
        openSearch();
      } else {
        return;
      }

      e.preventDefault();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isSearchOpen]);

  return (
    <>
      <button className={styles.searchBar} onClick={openSearch}>
        <IconSearchBtn />
        <span>
          <Translate id="tds.search.search">搜索文档</Translate>
        </span>
      </button>
      {isSearchOpen && <SearchBox closeSearch={closeSearch} />}
    </>
  );
};

const SearchBox = ({ closeSearch }) => {
  const { siteConfig } = useDocusaurusContext();
  const { searchUrl } = siteConfig.customFields;

  const [recentHits, setRecentHits] = useRecentHits();
  const [query, setQuery, groupedHits] = useSearch(searchUrl);
  const searchFormEl = useRef(null);
  const searchInputEl = useRef(null);

  const openHit = (hit) => {
    const updatedRecentHits = getUpdatedRecentHits(recentHits, hit, true);
    setRecentHits(updatedRecentHits);
    const url = hit._source.url;
    window.location.href = url;
  };

  const removeRecentHit = (hit) => {
    const updatedRecentHits = getUpdatedRecentHits(recentHits, hit, false);
    setRecentHits(updatedRecentHits);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey && e.key === "k") || e.key === "Escape") {
        closeSearch();
      } else {
        return;
      }

      e.preventDefault();
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.classList.add(styles.noScroll);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.classList.remove(styles.noScroll);
    };
  }, []);

  useEffect(() => {
    searchInputEl.current.focus();
  }, [recentHits, query]);

  return (
    <div className={styles.searchBox}>
      <div className={styles.scrim} onClick={closeSearch} />
      <div
        className={`${styles.panel} ${
          groupedHits === null && !recentHits.length ? styles.short : ""
        }`}
      >
        <Input
          query={query}
          setQuery={setQuery}
          searchFormEl={searchFormEl}
          searchInputEl={searchInputEl}
          closeSearch={closeSearch}
        />
        <Content
          query={query}
          recentHits={recentHits}
          groupedHits={groupedHits}
          searchFormEl={searchFormEl}
          searchInputEl={searchInputEl}
          openHit={openHit}
          removeRecentHit={removeRecentHit}
        />
        <Footer />
      </div>
    </div>
  );
};

export default SearchBar;
