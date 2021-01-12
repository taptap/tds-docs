import React from 'react';
import styles from './styles.module.scss';
import Logo from "@theme/Logo";
import { externalLinkList, innerLinkList } from './_config';

function Footer() {
  return (
    <footer className={styles.footerContainer}>
      <div className={styles.footerContent}>
        <div className={styles.logoRow}><Logo noLabel /></div>
        <div className={styles.linkRow}>
          {innerLinkList.map(item => <a
            key={item.label + item.link}
            className={styles.linkItem}
            href={item.link}
            rel='noreferrer nofollow noopener'
            target='_blank'
          >
            {item.label}
          </a>)}
        </div>
        <div className={styles.infoRow}>
          <div className={styles.externalItem}>易玩（上海）网络科技有限公司</div>
          <div className={styles.externalItem}>公司地址: 上海市静安区万荣路 700 号 A3 202</div>
          <div className={styles.externalItem}>注册地址: 上海市闵行区紫星路 588 号 2 幢 2122 室</div>
          <div className={styles.externalItem}>©2021 TapTap</div>
        </div>
        <div className={styles.recordRow}>
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
        </div>
      </div>
    </footer>
  );
}

export default Footer;