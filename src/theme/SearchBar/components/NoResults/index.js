import React from "react";

import styles from "./index.module.scss";

import IconEmpty from "../../icons/empty.svg";

const NoResults = () => (
  <div className={styles.noResults}>
    <IconEmpty />
    <p>找不到匹配结果</p>
  </div>
);

export default NoResults;
