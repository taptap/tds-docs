import React from "react";
import Translate from "@docusaurus/Translate";

import styles from "./index.module.scss";

import IconEmpty from "../../icons/empty.svg";

const NoResults = () => (
  <div className={styles.noResults}>
    <IconEmpty />
    <p>
      <Translate id="tds.search.noResults">找不到匹配结果</Translate>
    </p>
  </div>
);

export default NoResults;
