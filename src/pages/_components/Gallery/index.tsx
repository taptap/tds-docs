import React, { useState } from "react";
import Translate from "@docusaurus/Translate";
import useBaseUrl from "@docusaurus/useBaseUrl";
import { Link } from "react-router-dom";
import Logo from "@theme/Logo";
import styles from "./styles.module.scss";

const Gallery = ({ brand, entries, title, cardSize = 'narrow', showFilter = false }) => {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const getTags = (entries) => {
    const tagSet = new Set<string>(entries.map(entry => entry.tag))
    return Array.from(tagSet)
  }

  const updateTag = (tag) => {
    setSelectedTag(selectedTag => selectedTag === tag ? null : (tag || null))
  }

  return <div className={styles.main}>
    <div className={styles.stage}>
      <div className={styles.hero}>
        <div className={styles.title}>
          {/* @ts-ignore */}
          <Logo noLabel noLink size={brand === "leancloud" ? 1.3 : 1.6} />
          <Translate
            id={`tds-home-${title}`}
          >
            {title}
          </Translate>
        </div>

        {brand === "tds" && (
          <Link className={styles.cta} to="store">
            <Translate
              id="tds-home-入门指南"
            >
              入门指南
            </Translate>
          </Link>
        )}

        {showFilter ? <div className={styles.filter}>
          <select onChange={(e) => { updateTag(e.target.value) }}>
            <option value="">全部</option>
            {getTags(entries).map(tag => <option value={tag} key={tag}>{tag}</option>)}
          </select>
        </div> : <></>}
      </div>

      <div className={`${styles.entries} ${styles[cardSize]}`}>
        {entries
          .filter(entry => selectedTag ? entry.tag === selectedTag : true)
          .map((entry) => (
            <div key={entry.tag ? entry.tag + entry.title : entry.title} className={styles.entry}>
              <div className={styles.entryText}>
                <div className={styles.entryTitle}>
                  <Translate
                    id={`tds-home-${entry.title}`}
                  >
                    {entry.title}
                  </Translate>
                  {entry.tag ? <span className={styles.entryTag}>
                    <Translate
                      id={`tds-home-${entry.tag}`}
                    >
                      {entry.tag}
                    </Translate>
                  </span> : <></>}
                </div>
                {entry.description ? <div>
                  <Translate
                    id={`tds-home-${entry.description}`}
                  >
                    {entry.description}
                  </Translate>
                </div> : <></>}
              </div>

              <div className={styles.entryActions}>
                {entry.links.map((link) =>
                  "href" in link ? (
                    <a
                      className={styles.entryAction}
                      href={link.href}
                      rel="nofollow noopener"
                      target="_blank"
                      key={link.label}
                    >
                      <Translate
                        id={`tds-home-link-${link.label}`}
                      >
                        {link.label}
                      </Translate>
                    </a>
                  ) : (
                    <Link
                      className={styles.entryAction}
                      to={useBaseUrl(link.to)}
                      key={link.label}
                    >
                      <Translate
                        id={`tds-home-link-${link.label}`}
                      >
                        {link.label}
                      </Translate>
                    </Link>
                  )
                )}
              </div>
            </div>
          ))}
      </div>
    </div>
  </div>
};

export default Gallery;
