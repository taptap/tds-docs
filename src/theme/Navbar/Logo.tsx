import React from 'react';
import styles from './logo.module.scss';
import { DC_DOMAIN_HOST, MAIN_DOMAIN_HOST } from "../../constants/env";

type LogoProp = {
  onClick?: () => any;
};

const Logo = ({onClick}: LogoProp) => {
  return <div className={styles.logoContainer} onClick={onClick}>
    <a className={styles.logoImage} target="_blank" href={MAIN_DOMAIN_HOST}>
      <img src='/img/logo.svg' alt="TapTap"/>
    </a>
    <div className={styles.divider}/>
    <a className={styles.label} target="_blank" href={DC_DOMAIN_HOST}> Developer Center </a>
  </div>;
};

export default Logo;
