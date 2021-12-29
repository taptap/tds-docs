import {BRAND, REGION} from '../constants/env'

interface DistributionsProps {
  children: React.ReactElement[]
  brand?: typeof BRAND
  region?: typeof REGION
  if?: boolean
}

export function Distributions(props: DistributionsProps) {
  const {children, brand, region} = props

  if ((!brand || brand === BRAND) &&
      (!region || region === REGION) &&
      (props.if === undefined || props.if)) {
    return children
  } else {
    return null
  }
}
