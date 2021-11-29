import React from 'react'
import Tabs from '@theme/Tabs'

const runtimes = [
  {label: 'Web App', value: 'webapp'},
  {label: 'Node.js', value: 'nodejs'},
  {label: 'Python', value: 'python'},
  {label: 'PHP', value: 'php'},
  {label: 'Java', value: 'java'},
  {label: '.Net (C#)', value: 'dotnet'},
  {label: 'Go', value: 'go'}
]

interface EngineRuntimesProps {
  group?: string
  only?: string
  children: React.ReactElement[] | React.ReactElement
}

export default function EngineRuntimes({only, group, children}: EngineRuntimesProps): JSX.Element | null {
  const values: typeof runtimes = []
  const tabItems: JSX.Element[] = []

  if (only) {
    if (children instanceof Array) {
      return children.find( child => child.props.value === only) || null
    } else {
      return children.props.value === only ? children : null
    }
  }

  for (const runtime of runtimes) {
    if (children instanceof Array) {
      const matchedChild = children.find( child => child.props.value === runtime.value)

      if (matchedChild) {
        values.push(runtime)
        tabItems.push(matchedChild)
      }
    } else {
      if (children.props.value === runtime.value ? children : undefined) {
        values.push(runtime)
        tabItems.push(children)
      }
    }
  }

  return <Tabs
    groupId={group ?? 'engine-runtimes'}
    defaultValue={values[0].value}
    values={values}>
    {tabItems}
  </Tabs>
}
