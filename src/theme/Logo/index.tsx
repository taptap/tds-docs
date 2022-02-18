import React from "react";
import useBaseUrl from "@docusaurus/useBaseUrl";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Translate from "@docusaurus/Translate";
import { BRAND } from "../../constants/env";
import styles from "./styles.module.scss";

interface LogoProps {
  noLabel?: boolean;
}

const Logo = ({ noLabel }: LogoProps) => {
  const { siteConfig } = useDocusaurusContext();
  const mainDomainHost = (siteConfig.customFields?.mainDomainHost ??
    "") as string;
  const dcDomainHost = (siteConfig.customFields?.dcDomainHost ?? "") as string;

  return (
    <div className={styles.logoContainer}>
      <a className={styles.logoImage} href={mainDomainHost}>
        <img
          src={
            BRAND === "leancloud"
              ? useBaseUrl("img/leancloud.svg")
              : useBaseUrl("img/logo.svg")
          }
          alt={BRAND === "leancloud" ? "LeanCloud" : "TapTap"}
          style={{
            height: BRAND === "leancloud" ? 20 : 24,
            transform: BRAND === "leancloud" ? "none" : "translateY(1px)",
          }}
        />
      </a>

      {BRAND === "tds" && !noLabel && (
        <>
          <div className={styles.divider} />
          <a className={styles.label} href={dcDomainHost}>
            <Translate id="tds-header-开发者中心" description="from Header">
              开发者中心
            </Translate>
          </a>
        </>
      )}
    </div>
  );
};

export default Logo;
