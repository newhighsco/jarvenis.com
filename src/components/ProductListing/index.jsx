import React from 'react'
import { array } from 'prop-types'
import { Grid, GridItem, SmartLink, ResponsiveMedia } from '@newhighsco/chipset'

import styles from './styles.module.scss'

const ProductListing = ({ products = [] }) => {
  if (!products?.length) return null

  return (
    <Grid className={styles.wrapper}>
      {products.map(({ id, href, heading, kicker, image, price }) => (
        <GridItem key={id} sizes={['one-half', 'tablet-one-quarter']}>
          <SmartLink className={styles.link} href={href} target="_blank">
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
  )
}

ProductListing.propTypes = {
  products: array
}

export default ProductListing
export { ProductListing }
