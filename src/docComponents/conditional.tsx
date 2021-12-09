import {BRAND, REGION} from '../constants/env'

interface ConditionalProps {
  children: React.ReactElement[]
  brand?: typeof BRAND
  region?: typeof REGION
  if?: boolean
}

export function Conditional(props: ConditionalProps) {
  const {children, brand, region} = props

  if ((!brand || brand === BRAND) &&
      (!region || region === REGION) &&
      (props.if === undefined || props.if)) {
    return children
  } else {
    return null
  }
}
