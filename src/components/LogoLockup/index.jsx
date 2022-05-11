import React from 'react'
import { bool, string } from 'prop-types'
import classNames from 'classnames'
import { Icon, VisuallyHidden } from '@newhighsco/chipset'
import config from '../../../site.config'

import styles from './LogoLockup.module.scss'
import { ReactComponent as LogoSvg } from '../../images/logo.svg'

const { name } = config

const LogoLockup = ({ showIcon = true, showText = true, className }) => (
  <div className={classNames(styles.root, className)}>
    {showIcon && (
      <Icon theme={{ root: styles.icon }}>
        <LogoSvg />
        {!showText && <VisuallyHidden>{name}</VisuallyHidden>}
      </Icon>
    )}
    {showText && <span className={styles.text}>{name}</span>}
  </div>
)

LogoLockup.propTypes = {
  showIcon: bool,
  showText: bool,
  className: string
}

export default LogoLockup
export { LogoLockup }
