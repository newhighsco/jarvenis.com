import React from 'react'
import { node, string } from 'prop-types'
import classNames from 'classnames'

import styles from './styles.module.scss'

const Prose = ({ html, children, className, ...rest }) => (
  <div
    className={classNames(styles.wrapper, className)}
    {...(html && { dangerouslySetInnerHTML: { __html: html } })}
    {...rest}
  >
    {children}
  </div>
)

Prose.propTypes = {
  html: string,
  children: node,
  className: string
}

export default Prose
export { Prose }
