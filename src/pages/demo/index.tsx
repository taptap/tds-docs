import React , { useState } from "react";
import Translate from "@docusaurus/Translate";
import useBaseUrl from "@docusaurus/useBaseUrl";
import { Link } from "react-router-dom";
import Layout from "@theme/Layout";
import Logo from "@theme/Logo";
import styles from "./styles.module.scss";
import { getEntries ,typeButton} from "./_config";
import { BRAND, REGION } from "../../constants/env";
import { addAbortSignal } from "stream";

const DemoPage = () => {

  const [buttonType, setButtonType] = useState("所有");

  const submitFeedback = (type) => {
    setButtonType(type);
    // getEntries(BRAND, REGION,buttonType).map((entry) => (
    //   console.log(entry.title)
    // ));
  };

  return <Layout>
  <div className={styles.main}>
    <div className={styles.stage}>
      <div className={styles.hero}>
        <div className={styles.title}>
          {/* @ts-ignore */}
          <Logo noLabel noLink size={BRAND === "leancloud" ? 1.3 : 1.6} />
          <Translate
            id="tds-home-开发者文档"
            description="from HomePage Title"
          >
            Demo 下载
          </Translate>
        </div>
      </div>

      
      <div className={styles.buttonLine}>
        {typeButton.map((item) => (
          <button className={styles.button} onClick={()=>{
            submitFeedback(item.value)
          }}>{item.title}</button>
        ))}
      </div>



      <div className={styles.entries} >
        {getEntries(BRAND, REGION,buttonType).map((entry,index) => (
        
          <div key={index} className={styles.entry}>
           
            <div className={styles.entryText}>
              <div className={styles.entryTitle}>
                <div>{entry.title} </div>
                <div className={styles.type}>{entry.type1} </div>
            </div>
              <div>{entry.description}</div>
            </div>
         
            <div className={styles.entryActions}>
              {entry.links.length ? (
                entry.links.map((link) =>
                  "href" in link ? (
                    <a
                      className={styles.entryAction}
                      href={link.href}
                      rel="nofollow noopener"
                      target="_blank"
                      key={link.label}
                    >
                      {link.label}
                    </a>
                    
                  ) : (
                    <Link
                    className={styles.entryAction}
                    to={useBaseUrl(link.to)}
                    key={link.label}
                  >
                    {link.label} 
                  </Link> 
                  )
                )
              ) : (
                <div className={styles.entryAction}>Coming Soon</div>
              )}
            </div>
           
          </div>
        ))}
      </div>
    </div>
  </div>
</Layout>
};

export default DemoPage;
