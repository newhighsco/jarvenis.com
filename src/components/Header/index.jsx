import React from 'react'
import Link from 'next/link'
import {
  ContentContainer,
  Grid,
  GridItem,
  Landmark,
  SmartLink
} from '@newhighsco/chipset'
import { LogoLockup } from '../LogoLockup'

import theme from './theme.module.scss'

const Header = () => (
  <>
    <Landmark id="top">Top of page</Landmark>
    <ContentContainer as="header" role="banner" gutter theme={theme}>
      <ContentContainer size="desktopLarge">
        <Grid valign="middle">
          <GridItem>
            <Link href="/" passHref>
              <SmartLink>
                <LogoLockup />
              </SmartLink>
            </Link>
          </GridItem>
        </Grid>
      </ContentContainer>
    </ContentContainer>
  </>
)

Header.propTypes = {}

export default Header
export { Header }
