import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

interface ConditionalProps {
  children: React.ReactElement[];
  brand?: string;
  region?: string;
  if?: boolean;
}

export function Conditional(props: ConditionalProps) {
  const { children, brand, region } = props;

  const { siteConfig } = useDocusaurusContext();
  const BRAND = (siteConfig.customFields?.brand ?? "tds") as string;
  const REGION = (siteConfig.customFields?.region ?? "cn") as string;

  if (
    (!brand || brand === BRAND) &&
    (!region || region === REGION) &&
    (props.if === undefined || props.if)
  ) {
    return children;
  } else {
    return null;
  }
}
