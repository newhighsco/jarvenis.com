import React from 'react'
import { string } from 'prop-types'
import classNames from 'classnames'
import { ResponsiveMedia, SmartLink } from '@newhighsco/chipset'

import styles from './styles.module.scss'

const Card = ({ href, target, image, ratio, title, kicker, meta }) => (
  <div className={classNames(styles.wrapper)}>
    {image && (
      <ResponsiveMedia ratio={ratio} className={styles.image}>
        <img src={image} alt="" loading="lazy" />
      </ResponsiveMedia>
    )}
    <div className={styles.content}>
      {title && (
        <h2 className={styles.title}>
          <SmartLink href={href} target={target}>
            {title}
          </SmartLink>
        </h2>
      )}
      {kicker && <p className={styles.kicker}>{kicker}</p>}
      {meta && <p className={styles.meta}>{meta}</p>}
    </div>
  </div>
)

Card.propTypes = {
  href: string,
  target: string,
  image: string,
  ratio: string,
  title: string,
  kicker: string,
  meta: string
}

export default Card
export { Card }
