import React from "react";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

import styles from "./index.module.scss";

const Footer = () => {
  const {
    siteConfig: { customFields },
  } = useDocusaurusContext();
  const searchProviderName = customFields?.searchProviderName as string;
  const searchProviderWebsite = customFields?.searchProviderWebsite as string;

  return (
    <footer className={styles.footer}>
      <p>
        Powered by{" "}
        <Link to={searchProviderWebsite}>
          <span>{searchProviderName}</span>
        </Link>
      </p>
    </footer>
  );
};

export default Footer;
