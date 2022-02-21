import React from "react";
import Translate from "@docusaurus/Translate";
import useBaseUrl from "@docusaurus/useBaseUrl";
import { Link } from "react-router-dom";
import Layout from "@theme/Layout";
import Logo from "@theme/Logo";
import styles from "./styles.module.scss";
import { getEntries } from "./_config";
import { BRAND, REGION } from "../constants/env";

const HomePage = () => (
  <Layout>
    <div className={styles.main}>
      <div className={styles.stage}>
        <div className={styles.hero}>
          <div className={styles.title}>
            {/* @ts-ignore */}
            <Logo noLabel size={BRAND === "leancloud" ? 1.04 : 1.6} />
            <Translate
              id="tds-home-开发者文档"
              description="from HomePage Title"
            >
              开发者文档
            </Translate>
          </div>

          {BRAND === "tds" && (
            <Link className={styles.cta} to="store/store-register">
              <Translate
                id="tds-home-入门指南"
                description="from HomePage Main Button"
              >
                入门指南
              </Translate>
            </Link>
          )}
        </div>

        <div className={styles.entries}>
          {getEntries(BRAND, REGION).map((entry) => (
            <div key={entry.title} className={styles.entry}>
              <div className={styles.entryText}>
                <div className={styles.entryTitle}>{entry.title}</div>
                <div>{entry.description}</div>
              </div>

              <div className={styles.entryActions}>
                {entry.links.length ? (
                  entry.links.map((link) =>
                    "href" in link ? (
                      <a
                        className={styles.entryAction}
                        href={link.href}
                        rel="nofollow noopener"
                        target="_blank"
                        key={link.label}
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        className={styles.entryAction}
                        to={useBaseUrl(link.to)}
                        key={link.label}
                      >
                        {link.label}
                      </Link>
                    )
                  )
                ) : (
                  <div className={styles.entryAction}>Coming Soon</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </Layout>
);

export default HomePage;
