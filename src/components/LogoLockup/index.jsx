import React from 'react'
import { bool, string } from 'prop-types'
import classNames from 'classnames'
import { Icon, VisuallyHidden } from '@newhighsco/chipset'
import { config } from '../../../site.config'

import styles from './LogoLockup.module.scss'
import { ReactComponent as LogoSvg } from '../../images/logo.svg'
import { ReactComponent as TextSvg } from '../../images/logo-text.svg'

const LogoLockup = ({ showIcon = true, showText = true, className }) => (
  <div className={classNames(styles.root, className)}>
    {showIcon && (
      <Icon theme={{ root: styles.icon }}>
        <LogoSvg />
      </Icon>
    )}
    {showText ? (
      <Icon theme={{ root: styles.text }} alt={config.name}>
        <TextSvg />
      </Icon>
    ) : (
      <VisuallyHidden>{config.name}</VisuallyHidden>
    )}
  </div>
)

LogoLockup.propTypes = {
  showIcon: bool,
  showText: bool,
  className: string
}

export default LogoLockup
export { LogoLockup }
