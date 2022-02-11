import React from "react";
import { DateTime } from "luxon";
import Link from "@docusaurus/Link";
import Translate from "@docusaurus/Translate";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import styles from "./styles.module.scss";
import Logo from "@theme/Logo";
import { externalLinkList, toInnerLinkList } from "./_config";
import { REGION } from "../../constants/env";

function copyRightNotice(region) {
  // taptap.com is operated by YiWan (Shanghai), and taptap.io is operated by TapTap Inc (in singapore).
  // 'Asia/Shanghai' and 'Asia/Singapore' are both UTC+8 currently, but this might change in future.
  const timezone = region === "cn" ? "Asia/Shanghai" : "Asia/Singapore";
  const currentYear = DateTime.now().setZone(timezone).year;
  const year = currentYear > 2021 ? `2021–${currentYear}` : "2021";
  return `©${year} TapTap`;
}

function Footer() {
  const {
    i18n: { currentLocale, defaultLocale },
  } = useDocusaurusContext();
  const isDefaultLocale = currentLocale === defaultLocale;
  const localePath = isDefaultLocale ? "" : `${currentLocale}/`;

  return (
    <footer className={styles.footerContainer}>
      <div className={styles.footerContent}>
        <div className={styles.logoRow}>
          {/* @ts-ignore */}
          <Logo noLabel />
        </div>
        <div className={styles.linkRow}>
          {toInnerLinkList(localePath, REGION).map((item) => {
            return item.link ? (
              <Link
                key={item.label + item.link}
                className={styles.linkItem}
                to={item.link}
              >
                {item.label}
              </Link>
            ) : (
              <a
                key={item.label + item.url}
                className={styles.linkItem}
                href={item.url}
                rel="noreferrer nofollow noopener"
                target="_blank"
              >
                {item.label}
              </a>
            );
          })}
        </div>
        <div className={styles.infoRow}>
          {REGION === "cn" ? (
            <>
              <div className={styles.externalItem}>
                <Translate
                  id="tds-footer-易玩（上海）网络科技有限公司"
                  description="from Footer"
                >
                  易玩（上海）网络科技有限公司
                </Translate>
              </div>
              <div className={styles.externalItem}>
                <Translate
                  id="tds-footer-公司地址: 上海市静安区万荣路 700 号 A3 202"
                  description="from Footer"
                >
                  公司地址: 上海市静安区万荣路 700 号 A3 202
                </Translate>
              </div>
              <div className={styles.externalItem}>
                <Translate
                  id="tds-footer-注册地址: 上海市闵行区紫星路 588 号 2 幢 2122 室"
                  description="from Footer"
                >
                  注册地址: 上海市闵行区紫星路 588 号 2 幢 2122 室
                </Translate>
              </div>
            </>
          ) : (
            <div className={styles.externalItem}>TapTap Pte. Ltd.</div>
          )}
          <div className={styles.externalItem}>{copyRightNotice(REGION)}</div>
        </div>
        {REGION === "cn" && isDefaultLocale && (
          <div className={styles.recordRow}>
            {externalLinkList.map((item) => (
              <a
                key={item.label + item.link}
                className={styles.externalItem}
                href={item.link}
                rel="noreferrer nofollow noopener"
                target="_blank"
              >
                {item.icon && <img src={item.icon} alt={item.label} />}
                {item.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </footer>
  );
}

export default Footer;
