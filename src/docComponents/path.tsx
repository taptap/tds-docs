import { BRAND } from "../constants/env";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

const PRODUCT_NAMES: {
  [brand: string]: { [locale: string]: { [product: string]: string } };
} = {
  tds: {
    "zh-Hans": {
      storage: "数据存储",
      engine: "云引擎",
      im: "即时通讯",
    },
    en: {
      storage: "Data Storage",
      engine: "Cloud Engine",
      im: "Instant Messaging",
    },
  },
  leancloud: {
    "zh-Hans": {
      storage: "数据存储",
      engine: "云引擎",
      im: "即时通讯",
    },
  },
};

const PATH_TO_CLOUD_SERVICES: {
  [brand: string]: { [locale: string]: string[] };
} = {
  tds: {
    "zh-Hans": ["开发者中心", "你的游戏", "游戏服务", "云服务"],
    en: ["Developer Center", "Your game", "Game Services", "Cloud Services"],
  },
  leancloud: {
    "zh-Hans": ["云服务控制台"],
  },
};

const getPathToCloudService = (
  brand: string,
  locale: string,
  product: string
): string[] => [
  ...PATH_TO_CLOUD_SERVICES[brand][locale],
  PRODUCT_NAMES[brand][locale][product],
];

interface PathProps {
  to: string;
}

const Path = ({ to }: PathProps) => {
  const {
    i18n: { currentLocale },
  } = useDocusaurusContext();
  const path: string = getPathToCloudService(BRAND, currentLocale, to).join(
    " > "
  );
  return path;
};

export default Path;
