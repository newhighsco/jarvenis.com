import React from 'react'
import { bool, node } from 'prop-types'
import classNames from 'classnames'
import { ContentContainer } from '@newhighsco/chipset'

import theme from './theme.module.scss'
import styles from './styles.module.scss'

const Section = ({ alternate, children }) => {
  if (!children) return null

  return (
    <ContentContainer
      gutter
      theme={theme}
      className={classNames(alternate && styles.alternate)}
    >
      <ContentContainer size="desktopMedium">{children}</ContentContainer>
    </ContentContainer>
  )
}

Section.propTypes = {
  alternate: bool,
  children: node
}

export default Section
export { Section }
