import React from 'react'
import { bool, node, string } from 'prop-types'
import classNames from 'classnames'
import { ContentContainer } from '@newhighsco/chipset'

import styles from './Section.module.scss'

const Section = ({ alternate, highlight, size = 'desktopLarge', children }) => {
  if (!children) return null

  return (
    <ContentContainer
      theme={{ content: styles.outer }}
      className={classNames({
        [styles.alternate]: alternate,
        [styles.highlight]: highlight
      })}
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
  highlight: bool,
  size: string,
  children: node
}

export default Section
export { Section }
