/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import DefaultNavbarItem from '@theme/NavbarItem/DefaultNavbarItem';
import type {Props} from '@theme/NavbarItem/LocaleDropdownNavbarItem';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {useAlternatePageUtils} from '@docusaurus/theme-common';
import IconIntl from './IconIntl';

import styles from './styles.module.scss';

export default function LocaleDropdownNavbarItem({
  mobile,
  dropdownItemsBefore,
  dropdownItemsAfter,
  ...props
}: Props): JSX.Element {
  const {
    i18n: {currentLocale, locales, localeConfigs},
  } = useDocusaurusContext();
  const alternatePageUtils = useAlternatePageUtils();

  function getLocaleLabel(locale) {
    return localeConfigs[locale].label;
  }

  const localeItems = locales.map((locale) => {
    const to = `pathname://${alternatePageUtils.createUrl({
      locale,
      fullyQualified: false,
    })}`;
    return {
      isNavLink: true,
      label: getLocaleLabel(locale),
      to,
      target: '_self',
      autoAddBaseUrl: false,
      className: locale === currentLocale ? 'dropdown__link--active' : '',
      style: {textTransform: 'capitalize'},
    };
  });

  const items = [...dropdownItemsBefore, ...localeItems, ...dropdownItemsAfter];

  return (
    <DefaultNavbarItem
      {...props}
      href="#"
      mobile={mobile}
      className={styles.localeDropdown}
      label={<IconIntl className={styles.switchIcon} />}
      items={items}
    />
  );
}
