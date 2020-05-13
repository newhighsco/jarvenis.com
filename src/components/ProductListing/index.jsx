import React from 'react'
import { array } from 'prop-types'
import {
  Button,
  ButtonGroup,
  Grid,
  GridItem,
  SmartLink,
  ResponsiveMedia
} from '@newhighsco/chipset'
import { socialLinks } from '../../../site.config'

import styles from './styles.module.scss'

const ProductListing = ({ products = [] }) => {
  if (!products?.length) return null

  return (
    <>
      <Grid className={styles.wrapper}>
        {products.map(({ id, href, heading, kicker, image, price }) => (
          <GridItem
            key={id}
            sizes={['one-half', 'tablet-one-quarter']}
            className={styles.item}
          >
            <SmartLink href={href} target="_blank">
              <ResponsiveMedia className={styles.image}>
                <img src={image} alt="" />
              </ResponsiveMedia>
              <div className={styles.content}>
                <div className={styles.heading}>{heading}</div>
                <div className={styles.kicker}>{kicker}</div>
                <div className={styles.price}>{price}</div>
              </div>
            </SmartLink>
          </GridItem>
        ))}
      </Grid>
      <ButtonGroup className={styles.buttons}>
        <Button href={socialLinks.teespring} target="_blank">
          Shop all
        </Button>
      </ButtonGroup>
    </>
  )
}

ProductListing.propTypes = {
  products: array
}

export default ProductListing
export { ProductListing }
