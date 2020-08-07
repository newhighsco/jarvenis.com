import React from 'react'
import Link from 'next/link'
import {
  ContentContainer,
  Grid,
  GridItem,
  Icon,
  Landmark,
  SmartLink
} from '@newhighsco/chipset'
import { LogoLockup } from '..'
import icons from '../../images/icons'

import theme from './theme.module.scss'
import styles from './styles.module.scss'

const MenuSvg = icons('menu')

const Header = () => (
  <>
    <Landmark id="top">Top of page</Landmark>
    <ContentContainer as="header" role="banner" gutter theme={theme}>
      <ContentContainer size="desktopLarge">
        <Grid flex valign="middle">
          <GridItem className={styles.logo}>
            <Link href="/" passHref>
              <SmartLink>
                <LogoLockup showText={false} />
              </SmartLink>
            </Link>
          </GridItem>
          <GridItem className={styles.navigation}>
            <SmartLink>
              <Icon theme={{ wrapper: styles.icon }} alt="Open menu">
                <MenuSvg />
              </Icon>
            </SmartLink>
          </GridItem>
        </Grid>
      </ContentContainer>
    </ContentContainer>
  </>
)

Header.propTypes = {}

export default Header
export { Header }
