import React, {useEffect, useState} from 'react';
import Translate from '@docusaurus/Translate';
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

export const ExchangeTable = ({}) => {
  const delay = 60 * 60 * 1000;

  const exchangeData = {
      "zh-Hans": {
        "common": {
          "CNY": "人民币",
          "HKD": "港币",
          "TWD": "新台币元",
          "EUR": "欧元",
          "USD": "美元",
          "GBP": "英镑",
          "AUD": "澳大利亚元",
          "KRW": "韩元",
          "JPY": "日元",
          "VND": "越南盾",
          "THB": "泰铢",
          "SGD": "新加坡元",
          "IDR": "印度尼西亚盾／卢比"
        },
      },
      "en-US": {
        "common": {
          "CNY": "RMB",
          "HKD": "Hongkong dollar",
          "TWD": "New Taiwanese Dollar",
          "EUR": "Euro",
          "USD": "Dollar",
          "GBP": "Pound",
          "AUD": "Australian dollar",
          "KRW": "Korean Won",
          "JPY": "Yen",
          "VND": "Vietnamese dong",
          "THB": "Thai Baht",
          "SGD": "Singapore dollar",
          "IDR": "Indonesian rupiah/Rupee"
        },
      },
    };
  const { i18n: { currentLocale } } = useDocusaurusContext();
  const currentExchangeData = exchangeData[currentLocale] || exchangeData['zh-Hans'];
  const commonCurrencyList = Object.keys(currentExchangeData.common);
  let [exchangeMap, setExchangeMap] = useState({});

  const getExchangeRates = () => {
    fetch(`//tapdb.com/api/v1/ga-exchange/exchange-rates`, {mode: 'cors'})
      .then(res => res.json())
      .then(
        (result) => {
          const rawData = result.data;
          const nameIndex = rawData.index.indexOf('exchangeTo');
          const rateIndex = rawData.index.indexOf('currentExchangeRate');
          if (nameIndex !== -1 && rateIndex !== -1) {
            const newExchangeMap = {}
            rawData.data.forEach((item) => {
              newExchangeMap[item[nameIndex]] = item[rateIndex];
            });
            setExchangeMap(newExchangeMap);
          }
        },
        (error) => {}
      )
  }

  useEffect(()=>{
    getExchangeRates();
  },[]);

  useEffect(()=>{
    const id = setInterval(getExchangeRates, delay);
    return () => clearInterval(id);
  },[]);

  return (
    <table>
      <thead>
      <tr>
        <th><Translate id="exchange.currency">币种</Translate></th>
        <th><Translate id="exchange.currencyType">货币类型（currency_type）</Translate></th>
        <th><Translate id="exchange.currentRate">实时汇率（本位币:美元 USD）</Translate></th>
      </tr>
      </thead>
      <tbody>
        <tr>
          <td colSpan={3}><Translate id="exchange.commonCurrent">常用货币</Translate></td>
        </tr>
        { commonCurrencyList.map(currency => <tr key={currency}><td>{currentExchangeData.common[currency]}</td><td>{currency}</td><td>{exchangeMap[currency] || '-'}</td></tr>) }
      </tbody>
    </table>
  )
};
