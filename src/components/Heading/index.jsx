import React from 'react'
import { node, oneOf } from 'prop-types'
import { Element } from '@newhighsco/chipset'

import styles from './styles.module.scss'

const Heading = ({ as = 'h1', kicker, children, ...rest }) => (
  <div className={styles.wrapper} {...rest}>
    {kicker && <div className={styles.kicker}>{kicker}</div>}
    <Element as={as} className={styles.content}>
      {children}
    </Element>
  </div>
)

Heading.propTypes = {
  as: oneOf(['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p']),
  kicker: node,
  children: node
}

export default Heading
export { Heading }
