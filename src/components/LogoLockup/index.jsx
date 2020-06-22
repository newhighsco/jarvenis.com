import React from 'react'
import { bool, string } from 'prop-types'
import classNames from 'classnames'
import { Icon, VisuallyHidden } from '@newhighsco/chipset'
import { config } from '../../../site.config'

import styles from './styles.module.scss'
import { ReactComponent as LogoSvg } from '../../images/logo.url.svg'
import TextSvg from '../../images/logo-text.svg'

const LogoLockup = ({ showIcon = true, showText = true, className }) => (
  <div className={classNames(styles.wrapper, className)}>
    {showIcon && (
      <Icon theme={{ wrapper: styles.icon }}>
        <LogoSvg />
      </Icon>
    )}
    {showText ? (
      <Icon theme={{ wrapper: styles.text }} alt={config.name}>
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
