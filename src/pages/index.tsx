import React, { Fragment } from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import { Link } from 'react-router-dom';
import Layout from "@theme/Layout";
import styles from './styles.module.scss';
import { entryList } from "./_config";

const HomePage = () => {
  return <Layout>
    <div className={styles.container}>
      <div className={styles.containerContent}>
        <div className={styles.topTitle}>
          <img src={useBaseUrl('img/logo.svg')} alt="TapTap" />
          开发者文档中心
        </div>
        <div className={styles.topSubtitle}>
          这里为用户提供游戏开发者相关文档和常见问题，包含游戏商店设置、SDK功能说明及TapTap品牌资源下载。
        </div>
        <Link className={styles.topEntryButton} to="store/store-register">入门指南 </Link>
        <div className={styles.entryContainer}>
          {entryList.map(item =>
            <div key={item.title} className={styles.entryCell}>
              <div>
                <div className={styles.entryCellTitle}>{item.title}</div>
                <div>{item.description}</div>
              </div>
              <div className={styles.entryCellActionContainer}>
                {item.links?.map((link, index, links) =>
                  <Fragment key={link.label}>
                    {
                      link.href
                        ? <a
                          className={styles.entryCellActionButton}
                          href={link.href}
                          rel='noreferrer nofollow noopener'
                          target='_blank'
                        >
                          {link.label}
                        </a>
                        : <Link
                          className={styles.entryCellActionButton}
                          to={useBaseUrl(link.to)}
                        >
                          {link.label}
                        </Link>
                    }
                    {index < links.length - 1 && <div className={styles.entryCellActionDivider} />}
                  </Fragment>,
                )}
              </div>
            </div>)}
        </div>
      </div>
    </div>
  </Layout>;
};

export default HomePage;
