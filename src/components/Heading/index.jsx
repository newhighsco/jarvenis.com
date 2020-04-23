import React from 'react'
import { bool, node, oneOf } from 'prop-types'
import classNames from 'classnames'
import { Element } from '@newhighsco/chipset'

import styles from './styles.module.scss'

const Heading = ({ alternate, size, as = 'h1', children, ...rest }) => (
  <Element
    as={as}
    className={classNames(
      styles.wrapper,
      alternate && styles.alternate,
      size && styles[size]
    )}
    {...rest}
  >
    <span className={styles.content}>{children}</span>
  </Element>
)

Heading.propTypes = {
  alternate: bool,
  size: oneOf(['small']),
  as: oneOf(['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p']),
  children: node
}

export default Heading
export { Heading }
