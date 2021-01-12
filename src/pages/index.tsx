import React from 'react';
import { Link } from 'react-router-dom';
import clsx from "clsx";
import Layout from "@theme/Layout";
import styles from './styles.module.scss';
import { entryList } from "./_config";

const HomePage = () => {
  return <Layout>
    <div className={styles.container}>
      <div className={styles.containerContent}>
        <div className={styles.topTitle}>
          <img src='/img/logo.svg' alt="TapTap" />
          开发者文档中心
        </div>
        <div className={styles.topSubtitle}>
          这里为用户提供游戏开发者相关文档和常见问题，包含游戏商店设置、SDK功能说明及TapTap品牌资源下载。
        </div>
        <Link className={styles.topEntryButton} to="/">入门指南 </Link>
        <div className={styles.entryContainer}>
          {entryList.map(item =>
            <div key={item.title} className={styles.entryCell}>
              <div>
                <div className={styles.entryCellTitle}>{item.title}</div>
                <div>{item.description}</div>
              </div>
              <div>
                {item.links?.map((link, index, links) =>
                  <div key={link.to} className={clsx(styles.entryCellActionButton, {
                    [styles.entryCellActionButtonLarge]: links.length > 1,
                  })}>
                    <Link to={link.to}> {link.label} </Link>
                  </div>)}
              </div>
            </div>)}
        </div>
      </div>
    </div>
  </Layout>;
};

export default HomePage;
