import React from 'react'
import { bool, node, string } from 'prop-types'
import classNames from 'classnames'
import { ContentContainer } from '@newhighsco/chipset'

import theme from './theme.module.scss'
import styles from './styles.module.scss'

const Section = ({ alternate, size = 'desktopLarge', children }) => {
  if (!children) return null

  return (
    <ContentContainer
      gutter
      className={classNames(alternate && styles.alternate)}
    >
      <ContentContainer size={size} theme={theme} className={styles.inner}>
        {children}
      </ContentContainer>
    </ContentContainer>
  )
}

Section.propTypes = {
  alternate: bool,
  size: string,
  children: node
}

export default Section
export { Section }
