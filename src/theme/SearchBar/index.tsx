import React, { useState, useEffect, useRef } from "react";
import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Head from "@docusaurus/Head";
import Translate from "@docusaurus/Translate";
import { useHistory } from "@docusaurus/router";
import axios from "axios";

import Input from "./components/Input";
import Content from "./components/Content";
import Footer from "./components/Footer";

import styles from "./index.module.scss";

import IconSearchBtn from "./icons/search-btn.svg";

import type { HitItem, HitGroup } from "./common";

const useRecentHits = (locale: string) => {
  const localStorageItemKey: string = `tds_doc_search_recent_hits_for_${locale}`;

  const getRecentHitsFromLocalStorage = (): HitItem[] => {
    let localStorageItem: string | null = null;
    if (ExecutionEnvironment.canUseDOM) {
      localStorageItem = localStorage.getItem(localStorageItemKey);
    }
    const recentHits: HitItem[] = localStorageItem
      ? JSON.parse(localStorageItem)
      : [];
    return recentHits;
  };

  const [recentHits, setRecentHits] = useState<HitItem[]>(
    getRecentHitsFromLocalStorage
  );

  useEffect(() => {
    const saveRecentHitsToLocalStorage = (recentHits: HitItem[]) => {
      if (ExecutionEnvironment.canUseDOM) {
        const recentHitsInString: string = JSON.stringify(recentHits);
        localStorage.setItem(localStorageItemKey, recentHitsInString);
      }
    };

    saveRecentHitsToLocalStorage(recentHits);
  }, [recentHits]);

  return [recentHits, setRecentHits] as const;
};

const getUpdatedRecentHits = (
  recentHits: HitItem[],
  hit: HitItem,
  addHit: boolean
): HitItem[] => {
  const updatedRecentHits: HitItem[] = [
    ...(addHit ? [hit] : []),
    ...recentHits.filter((recentHit) => recentHit._id !== hit._id),
  ].slice(0, 15);
  return updatedRecentHits;
};

const useSearch = (url: string, locale: string) => {
  interface SearchRequestConfig {
    params: {
      q: string;
      locale: string;
    };
  }

  interface SearchResponse {
    data: {
      hits: HitItem[];
    };
  }

  const groupHits = (hits: HitItem[]): HitGroup[] => {
    const groupedHits: HitGroup[] = [];

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

    groupedHits.sort((a: HitGroup, b: HitGroup): number => {
      const getAvgScore = ({ hits }: HitGroup): number =>
        hits.reduce((p: number, c: HitItem) => p + c._score, 0) / hits.length;
      return getAvgScore(b) - getAvgScore(a);
    });

    return groupedHits;
  };

  const [query, setQuery] = useState<string>("");
  const [groupedHits, setGroupedHits] = useState<null | HitGroup[]>(null);

  useEffect(() => {
    let ignore: boolean = false;

    const fetchHits = async (
      url: string,
      query: string,
      locale: string
    ): Promise<HitItem[]> => {
      const config: SearchRequestConfig = {
        params: { q: query, locale },
      };
      const {
        data: { hits },
      }: SearchResponse = await axios.get(url, config);
      return hits;
    };

    const search = async () => {
      const hits: HitItem[] = await fetchHits(url, query, locale);
      if (!ignore) {
        const groupedHits: HitGroup[] = groupHits(hits);
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

  return [query, setQuery, groupedHits] as const;
};

const useToggle = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const open = () => {
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
  };

  return [isOpen, open, close] as const;
};

const SearchBar = () => {
  const {
    siteConfig: { customFields, baseUrl },
    i18n: { currentLocale },
  } = useDocusaurusContext();
  const searchUrl = customFields?.searchUrl as string;

  const [isSearchOpen, openSearch, closeSearch] = useToggle();
  const [recentHits, setRecentHits] = useRecentHits(currentLocale);

  const history = useHistory();

  const openHit = (hit: HitItem) => {
    closeSearch();

    const updatedRecentHits: HitItem[] = getUpdatedRecentHits(
      recentHits,
      hit,
      true
    );
    setRecentHits(updatedRecentHits);

    const url: string = hit._source.url;
    history.push(`${baseUrl}${url}`);
  };

  const removeRecentHit = (hit: HitItem) => {
    const updatedRecentHits: HitItem[] = getUpdatedRecentHits(
      recentHits,
      hit,
      false
    );
    setRecentHits(updatedRecentHits);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
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
      {isSearchOpen && (
        <SearchBox
          searchUrl={searchUrl}
          locale={currentLocale}
          recentHits={recentHits}
          closeSearch={closeSearch}
          openHit={openHit}
          removeRecentHit={removeRecentHit}
        />
      )}
    </>
  );
};

interface SearchBoxProps {
  searchUrl: string;
  locale: string;
  recentHits: HitItem[];
  closeSearch: () => void;
  openHit: (hit: HitItem) => void;
  removeRecentHit: (hit: HitItem) => void;
}

const SearchBox = ({
  searchUrl,
  locale,
  recentHits,
  closeSearch,
  openHit,
  removeRecentHit,
}: SearchBoxProps) => {
  const [query, setQuery, groupedHits] = useSearch(searchUrl, locale);
  const searchFormEl = useRef<HTMLFormElement>(null);
  const searchInputEl = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
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
    searchInputEl.current?.focus();
  }, [recentHits, query]);

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
      </Head>

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
    </>
  );
};

export default SearchBar;
