import React, { useState, useEffect, useRef } from "react";
import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Head from "@docusaurus/Head";
import Translate from "@docusaurus/Translate";
import { useHistory } from "@docusaurus/router";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

import Input from "./components/Input";
import Content from "./components/Content";
import Footer from "./components/Footer";

import styles from "./index.module.scss";

import IconSearchBtn from "./icons/search-btn.svg";

import type { HitItem, HitGroupWithTitle } from "./common";
import { upItemListIndexApi } from "./api";
import { Segment, useDefault } from 'segmentit';
import { BRAND } from "../../constants/env";
import { time } from "console";
const segmentit = useDefault(new Segment());
var myTimer ;

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

const useSearch = (url: string,aiUrl:string, locale: string) => {
  interface SearchRequestConfig {
    headers: {
      "X-TDS-Doc-Search-Source": string;
      "X-TDS-Doc-Search-Session": string;
      "X-TDS-Doc-Search-Sequence": number;
    };
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

 

  const groupHits = (hits: HitItem[]): HitGroupWithTitle[] => {
    const groupedHits: HitGroupWithTitle[] = [];
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
    //排序
    groupedHits.sort((a: HitGroupWithTitle, b: HitGroupWithTitle): number => {
      const getAvgScore = ({ hits }: HitGroupWithTitle): number =>
        hits.reduce((p: number, c: HitItem) => p + c._score, 0) / hits.length;
      return getAvgScore(b) - getAvgScore(a);
    });
    //增加下标
    var index = 1
    groupedHits.forEach((group) => {
      group.hits.forEach((hit) => {
        hit._indexItem = index
        index++
      })
    })
    return groupedHits;
  };
  const [session] = useState<string>(uuidv4);
  const [query, setQuery] = useState<string>("");
  const [groupedHits, setGroupedHits] = useState<null | HitGroupWithTitle[]>(
    null
  );
  
  useEffect(() => {
    let ignore: boolean = false;

    const fetchHits = async (
      url: string,
      query: string,
      locale: string
    ): Promise<HitItem[]> => {
      const sequence: number = Date.now();
      const config: SearchRequestConfig = {
        headers: {
          "X-TDS-Doc-Search-Source": "docs",
          "X-TDS-Doc-Search-Session": session,
          "X-TDS-Doc-Search-Sequence": sequence,
        },
        params: { q: query, locale },
      };
      const {
        data: { hits },
      }: SearchResponse = await axios.get(url, config);
      //对返回值进行修改，增加 session 和 sequence
      hits.forEach((hit) => {
        hit._X_Tds_Doc_Search_Session = session;
        hit._X_Tds_Doc_Search_Sequence = sequence;
        hit._locale = locale
      });
      return hits;
    };
    
   
   

    const search = async () => {
      if (myTimer){
        console.log("清除Ai 定时器");
        clearTimeout(myTimer)
      }
      // 当问题只有纯数字也不调用或分词数小于 2 的时候也不调用AI
      if(/^\d+$/.test(query)||segmentit.doSegment(query).length<=2){
        
        const hits: HitItem[] = await fetchHits(url, query, locale);
        if (!ignore) {
          const groupedHits: HitGroupWithTitle[] = groupHits(hits);
          setGroupedHits(groupedHits);
        }
      }else{
        //TODO 计算发送间隔，如果输入后0.5内无输入就发送请求
        myTimer = setTimeout(async function() {
          const hits: HitItem[] = await fetchHits(aiUrl, query, locale);
          if (!ignore) {
            const groupedHits: HitGroupWithTitle[] = groupHits(hits);
            setGroupedHits(groupedHits);
          }
        }, 500)
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
  }, [session, query]);

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
  const upItemListIndexUrl = customFields?.upItemListIndexUrl as string;
  const aiSearchUrl =  currentLocale=="en"? customFields?.aiSearchEnUrl  as string: customFields?.aiSearchUrl  as string;

  const [isSearchOpen, openSearch, closeSearch] = useToggle();
  const [recentHits, setRecentHits] = useRecentHits(currentLocale);

  const history = useHistory();

  const openHit = (hit: HitItem,query:string) => {
    closeSearch();
    const updatedRecentHits: HitItem[] = getUpdatedRecentHits(
      recentHits,
      hit,
      true
    );
    setRecentHits(updatedRecentHits);

    const url: string = hit._source.url;
    history.push(`${baseUrl}${url}`);
    if (query!=""){
      upItemListIndex(hit,query);
    }
   
  };



  function upItemListIndex(hit: HitItem,query:string) {
    var source  =  hit._source
    // TODO 点击条目跳转
    upItemListIndexApi(
      upItemListIndexUrl as string,
      query,
      hit._X_Tds_Doc_Search_Session,
      hit._X_Tds_Doc_Search_Sequence,
      hit._indexItem,
      source,hit._locale)
  }

  


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
          aiSearchUrl={aiSearchUrl}
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
  aiSearchUrl:string;
  locale: string;
  recentHits: HitItem[];
  closeSearch: () => void;
  openHit: (hit: HitItem,query:string) => void;
  removeRecentHit: (hit: HitItem) => void;
}

const SearchBox = ({
  searchUrl,
  aiSearchUrl,
  locale,
  recentHits,
  closeSearch,
  openHit,
  removeRecentHit,
}: SearchBoxProps) => {
  const [query, setQuery, groupedHits] = useSearch(searchUrl, aiSearchUrl,locale);
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
      {/* 这是头部 */}
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
      </Head>

      <div className={styles.searchBox}>
        <div className={styles.scrim} onClick={closeSearch} />
        <div
          className={`${styles.panel} ${groupedHits === null && !recentHits.length ? styles.short : ""
            }`}
        >
          {/* 输入框 */}
          <Input
            query={query}
            setQuery={setQuery}
            searchFormEl={searchFormEl}
            searchInputEl={searchInputEl}
            closeSearch={closeSearch}
          />
          {/* 返回的显示 */}
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