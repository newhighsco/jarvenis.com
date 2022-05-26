import React from 'react'
import { Grid, Icon, SmartLink } from '@newhighsco/chipset'
import { ReactComponent as AdvancedLogo } from '../../images/logos/advanced.svg'
import { ReactComponent as ApexLogo } from '../../images/logos/apex.svg'
import { ReactComponent as BouliesLogo } from '../../images/logos/boulies.svg'

import styles from './SponsorListing.module.scss'

const sponsors = [
  {
    href: 'https://apexgamingpcs.com/products/jarv',
    text: 'Apex Gaming PCs - Build your own Gaming PC',
    logo: ApexLogo,
    target: '_blank'
  },
  {
    href: 'https://advanced.gg/',
    text: 'ADVANGED.gg',
    logo: AdvancedLogo,
    target: '_blank'
  },
  {
    href: 'https://boulies.com/',
    text: 'Boulies Gaming Chairs',
    logo: BouliesLogo,
    target: '_blank'
  }
]

const SponsorListing = () => {
  return (
    <>
      <Grid className={styles.root} gutterless>
        {sponsors.map(({ text, logo: LogoSvg, ...rest }, index) => {
          return (
            <Grid.Item key={index} sizes={['tablet-landscape-one-third']}>
              <SmartLink {...rest} className={styles.link}>
                <Icon theme={{ root: styles.logo }} alt={text}>
                  {LogoSvg && <LogoSvg />}
                </Icon>
              </SmartLink>
            </Grid.Item>
          )
        })}
      </Grid>
      <p className={styles.root}>
        Use code <strong>Jarv</strong> at Checkout
      </p>
    </>
  )
}

export default SponsorListing
export { SponsorListing }
