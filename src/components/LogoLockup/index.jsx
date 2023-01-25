import { Icon, VisuallyHidden } from '@newhighsco/chipset'
import classNames from 'classnames'
import { bool, string } from 'prop-types'
import React from 'react'

import config from '../../../site.config'
import { ReactComponent as LogoSvg } from '../../images/logo.svg'
import { ReactComponent as TextSvg } from '../../images/logo-text.svg'
import styles from './LogoLockup.module.scss'

const { name } = config

const LogoLockup = ({ showIcon = true, showText = true, className }) => (
  <div className={classNames(styles.root, className)}>
    {showIcon && (
      <Icon theme={{ root: styles.icon }}>
        <LogoSvg />
      </Icon>
    )}
    {showText ? (
      <Icon theme={{ root: styles.text }} alt={name}>
        <TextSvg />
      </Icon>
    ) : (
      <VisuallyHidden>{name}</VisuallyHidden>
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
