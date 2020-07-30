import React from 'react'
import { bool, node } from 'prop-types'
import classNames from 'classnames'
import { ContentContainer } from '@newhighsco/chipset'

import outer from './outer.module.scss'
import inner from './inner.module.scss'
import styles from './styles.module.scss'

const Section = ({ alternate, children }) => {
  if (!children) return null

  return (
    <ContentContainer
      gutter
      theme={outer}
      className={classNames(alternate && styles.alternate)}
    >
      <ContentContainer size="desktopMedium" theme={inner}>
        {children}
      </ContentContainer>
    </ContentContainer>
  )
}

Section.propTypes = {
  alternate: bool,
  children: node
}

export default Section
export { Section }
