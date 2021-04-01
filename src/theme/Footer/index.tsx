import React from 'react';
import Link from '@docusaurus/Link';
import Translate from '@docusaurus/Translate';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './styles.module.scss';
import Logo from "@theme/Logo";
import { externalLinkList, toInnerLinkList } from './_config';

function Footer() {
  const { i18n: { currentLocale, defaultLocale } } = useDocusaurusContext();
  const isDefaultLocale = currentLocale === defaultLocale;
  const localePath = isDefaultLocale ? '' : `${currentLocale}/`;
  return (
    <footer className={styles.footerContainer}>
      <div className={styles.footerContent}>
        <div className={styles.logoRow}><Logo noLabel /></div>
        <div className={styles.linkRow}>
          {toInnerLinkList(localePath).map(item => {
            return item.link
              ? <Link
                key={item.label + item.link}
                className={styles.linkItem}
                to={item.link}
              >
                {item.label}
              </Link>
              : <a
                key={item.label + item.url}
                className={styles.linkItem}
                href={item.url}
                rel='noreferrer nofollow noopener'
                target='_blank'
              >
                {item.label}
              </a>;
          })}
        </div>
        <div className={styles.infoRow}>
          <div className={styles.externalItem}>
            <Translate id="tds-footer-易玩（上海）网络科技有限公司" description="from Footer">
              易玩（上海）网络科技有限公司
            </Translate>
          </div>
          <div className={styles.externalItem}>
            <Translate id="tds-footer-公司地址: 上海市静安区万荣路 700 号 A3 202" description="from Footer">
              公司地址: 上海市静安区万荣路 700 号 A3 202
            </Translate>
          </div>
          <div className={styles.externalItem}>
            <Translate id="tds-footer-注册地址: 上海市闵行区紫星路 588 号 2 幢 2122 室" description="from Footer">
              注册地址: 上海市闵行区紫星路 588 号 2 幢 2122 室
            </Translate>
          </div>
          <div className={styles.externalItem}>
            ©2021 TapTap
          </div>
        </div>
        {isDefaultLocale && <div className={styles.recordRow}>
          {externalLinkList.map(item => <a
            key={item.label + item.link}
            className={styles.externalItem}
            href={item.link}
            rel='noreferrer nofollow noopener'
            target='_blank'
          >
            {item.icon && <img src={item.icon} alt={item.label} />}
            {item.label}
          </a>)}
        </div>}
      </div>
    </footer>
  );
}

export default Footer;