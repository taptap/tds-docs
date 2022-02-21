import React from "react";
import Link from "@docusaurus/Link";
import Translate from "@docusaurus/Translate";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import styles from "./styles.module.scss";
import Logo from "@theme/Logo";
import { BRAND, REGION } from "../../constants/env";
import { getNavLinks, getLicenceLinks } from "./_config";

function getCopyrightNotice(brand: string): string {
  const year = new Date().getFullYear();
  const company =
    brand === "leancloud" ? "美味书签（北京）信息技术有限公司" : "TapTap";
  return `©${year} ${company}`;
}

function Footer() {
  const {
    i18n: { currentLocale },
  } = useDocusaurusContext();

  return (
    <footer className={styles.footer}>
      <div className={styles.stage}>
        <div>
          <section className={styles.logo}>
            {/* @ts-ignore */}
            <Logo noLabel reversed={BRAND === "leancloud"} />
          </section>

          <section className={styles.nav}>
            {getNavLinks(BRAND, REGION, currentLocale).map((item) =>
              "link" in item ? (
                <Link
                  to={item.link}
                  className={styles.navItem}
                  key={item.label}
                >
                  {item.label}
                </Link>
              ) : (
                <a
                  href={item.url}
                  target="_blank"
                  rel="noreferrer nofollow noopener"
                  className={styles.navItem}
                  key={item.label}
                >
                  {item.label}
                </a>
              )
            )}
          </section>

          <section className={styles.info}>
            {BRAND === "tds" &&
              (REGION === "cn" ? (
                <>
                  <div>
                    <Translate
                      id="tds-footer-易玩（上海）网络科技有限公司"
                      description="from Footer"
                    >
                      易玩（上海）网络科技有限公司
                    </Translate>
                  </div>
                  <div>
                    <Translate
                      id="tds-footer-公司地址: 上海市静安区万荣路 700 号 A3 202"
                      description="from Footer"
                    >
                      公司地址: 上海市静安区万荣路 700 号 A3 202
                    </Translate>
                  </div>
                  <div>
                    <Translate
                      id="tds-footer-注册地址: 上海市闵行区紫星路 588 号 2 幢 2122 室"
                      description="from Footer"
                    >
                      注册地址: 上海市闵行区紫星路 588 号 2 幢 2122 室
                    </Translate>
                  </div>
                </>
              ) : (
                <div>TapTap Pte. Ltd.</div>
              ))}

            <div>{getCopyrightNotice(BRAND)}</div>
          </section>
        </div>

        {getLicenceLinks(BRAND, REGION, currentLocale).length > 0 && (
          <div>
            <section className={styles.licence}>
              {getLicenceLinks(BRAND, REGION, currentLocale).map((item) => (
                <a
                  href={item.link}
                  target="_blank"
                  rel="noreferrer nofollow noopener"
                  className={styles.licenceItem}
                  key={item.label}
                >
                  {item.icon && <img src={item.icon} alt={item.label} />}
                  {item.label}
                </a>
              ))}
            </section>
          </div>
        )}
      </div>
    </footer>
  );
}

export default Footer;
