import {DISTRIBUTION} from '../../constants/env'

interface DistributionsProps {
  children: React.ReactElement[]
  brand?: 'leancloud' | 'tds'
  region?: 'cn-mainland' | 'global'
}

export default function Distributions({children}: DistributionsProps) {
  if (DISTRIBUTION === 'leancloud') {
    return children.find( child => child.props.mdxType === 'LeanCloud')
  } else {
    return children.find( child => child.props.mdxType === 'TDS')
  }
}

export function LeanCloud({children}) {
  return children
}

export function TDS({children}) {
  return children
}
