import { Element, Icon } from '@newhighsco/chipset'
import { node, oneOf } from 'prop-types'
import React from 'react'

import styles from './Heading.module.scss'

const Heading = ({ as = 'h1', kicker, icon, children, ...rest }) => (
  <div className={styles.root} {...rest}>
    {kicker && <div className={styles.kicker}>{kicker}</div>}
    <Element as={as} className={styles.content}>
      {icon && <Icon name={icon} theme={{ root: styles.icon }} />}
      {children}
    </Element>
  </div>
)

Heading.propTypes = {
  as: oneOf(['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p']),
  kicker: node,
  icon: node,
  children: node
}

export default Heading
export { Heading }
