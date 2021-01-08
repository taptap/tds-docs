import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import {useThemeConfig} from '@docusaurus/theme-common';
import useBaseUrl from '@docusaurus/useBaseUrl';
import ThemedImage from '@theme/ThemedImage';
import styles from './styles.module.css';

function FooterLink({to, href, label, prependBaseUrlToHref, ...props}: any) {
  const toUrl = useBaseUrl(to);
  const normalizedHref = useBaseUrl(href, {forcePrependBaseUrl: true});

  return (
    <Link
      className="footer__link-item"
      {...(href
        ? {
          target: '_blank',
          rel: 'noopener noreferrer',
          href: prependBaseUrlToHref ? normalizedHref : href,
        }
        : {
          to: toUrl,
        })}
      {...props}>
      {label}
    </Link>
  );
}

const FooterLogo = ({sources, alt}) => (
  <ThemedImage className="footer__logo" alt={alt} sources={sources}/>
);

function Footer(): JSX.Element | null {
  const {footer} = useThemeConfig();

  const {copyright, links = [], logo = {}} = footer || {};
  const sources = {
    light: useBaseUrl(logo.src),
    dark: useBaseUrl(logo.src),
  };

  if (!footer) {
    return null;
  }

  return (
    <footer
      className={clsx('footer', {
        'footer--dark': footer.style === 'dark',
      })}>
      这里是脚
      <div className="container">
        {links && links.length > 0 && (
          <div className="row footer__links">
            {links.map((linkItem, i) => (
              <div key={i} className="col footer__col">
                {linkItem.title != null ? (
                  <h4 className="footer__title">{linkItem.title}</h4>
                ) : null}
                {Array.isArray(linkItem.items) && <ul className="footer__items">
                  {linkItem.items.map((item, key) =>
                    item.html ? (
                      <li
                        key={key}
                        className="footer__item"
                        // Developer provided the HTML, so assume it's safe.
                        // eslint-disable-next-line react/no-danger
                        dangerouslySetInnerHTML={{
                          __html: item.html,
                        }}
                      />
                    ) : (
                      <li key={item.href || item.to} className="footer__item">
                        <FooterLink {...item} />
                      </li>
                    ),
                  )}
                </ul>}
              </div>
            ))}
          </div>
        )}
        {(logo || copyright) && (
          <div className="footer__bottom text--center">
            {logo && (logo.src) && (
              <div className="margin-bottom--sm">
                {logo.href ? (
                  <a
                    href={logo.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.footerLogoLink}>
                    <FooterLogo alt={logo.alt} sources={sources}/>
                  </a>
                ) : (
                  <FooterLogo alt={logo.alt} sources={sources}/>
                )}
              </div>
            )}
            {copyright ? (
              <div
                className="footer__copyright"
                // Developer provided the HTML, so assume it's safe.
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{__html: copyright,}}
              />
            ) : null}
          </div>
        )}
      </div>
    </footer>
  );
}

export default Footer;