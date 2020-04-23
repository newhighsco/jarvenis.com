import React from 'react'
import { Icon, VisuallyHidden } from '@newhighsco/chipset'
import { config } from '../../../site.config'

import styles from './styles.module.scss'
import { ReactComponent as LogoSvg } from '../../images/logo.url.svg'

const LogoLockup = () => (
  <div className={styles.wrapper}>
    <Icon theme={{ wrapper: styles.icon }}>
      <LogoSvg />
    </Icon>
    <VisuallyHidden className={styles.text}>{config.name}</VisuallyHidden>
  </div>
)

export { LogoLockup }
