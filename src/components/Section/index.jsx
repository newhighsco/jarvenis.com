import React from 'react'
import { bool, node, string } from 'prop-types'
import classNames from 'classnames'
import { ContentContainer } from '@newhighsco/chipset'

import styles from './Section.module.scss'

const Section = ({ alternate, size = 'desktopLarge', children }) => {
  if (!children) return null

  return (
    <ContentContainer
      theme={{ content: styles.outer }}
      className={classNames(alternate && styles.alternate)}
    >
      <ContentContainer
        gutter
        size={size}
        theme={{ root: styles.inner, content: styles.content }}
      >
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
