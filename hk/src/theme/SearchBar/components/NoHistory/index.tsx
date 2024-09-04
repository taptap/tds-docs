import React from "react";
import Translate from "@docusaurus/Translate";

import styles from "./index.module.scss";

const NoHistory = () => (
  <div className={styles.noHistory}>
    <p>
      <Translate id="tds.search.noHistory">无搜索记录</Translate>
    </p>
  </div>
);

export default NoHistory;
