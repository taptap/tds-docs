import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {BRAND} from '../constants/env'

interface ConditionalProps {
  children: React.ReactElement[]
  brand?: typeof BRAND
  region?: 'cn' | 'global'
  if?: boolean
}

export function Conditional(props: ConditionalProps) {
  const { siteConfig } = useDocusaurusContext();
  const REGION = (siteConfig.customFields?.region ?? '') as string;
  const {children, brand, region} = props

  if ((!brand || brand === BRAND) &&
      (!region || region === REGION) &&
      (props.if === undefined || props.if)) {
    return children
  } else {
    return null
  }
}
