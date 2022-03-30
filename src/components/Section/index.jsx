import React from 'react'
import { bool, node, string } from 'prop-types'
import classNames from 'classnames'
import Image from 'next/image'
import { ContentContainer } from '@newhighsco/chipset'
import backgroundImage from '../../images/background.jpg'

import styles from './Section.module.scss'

const Section = ({ alternate, size = 'desktopLarge', children }) => {
  if (!children) return null

  return (
    <ContentContainer
      theme={{ content: styles.outer }}
      className={classNames(alternate && styles.alternate)}
    >
      {alternate && (
        <Image
          src={backgroundImage}
          alt=""
          placeholder="blur"
          layout="fill"
          objectFit="cover"
          objectPosition="0 50%"
        />
      )}
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
