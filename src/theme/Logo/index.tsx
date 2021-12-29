import React from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.scss';
import Translate from '@docusaurus/Translate';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

type LogoProp = {
  noLabel?: boolean;
  onClick?: () => any;
};

const Logo = ({ noLabel, onClick }: LogoProp) => {
  const { siteConfig } = useDocusaurusContext();
  const mainDomainHost = (siteConfig.customFields?.mainDomainHost ?? '') as string;
  const dcDomainHost = (siteConfig.customFields?.dcDomainHost ?? '') as string;
  return <div className={styles.logoContainer} onClick={onClick}>
    <a className={styles.logoImage} href={mainDomainHost}>
      <img src={useBaseUrl('img/logo.svg')} alt="TapTap" />
    </a>
    {!noLabel && <div className={styles.divider} />}
    {!noLabel && <a className={styles.label} href={dcDomainHost}>
      <Translate id="tds-header-开发者中心" description="from Header">
        开发者中心
      </Translate>
    </a>}
  </div>;
};

export default Logo;
