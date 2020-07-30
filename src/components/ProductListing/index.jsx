import React from 'react'
import { array, bool } from 'prop-types'
import { Button, ButtonGroup, Grid, GridItem } from '@newhighsco/chipset'
import { Card } from '..'
import { socialLinks } from '../../../site.config'

import styles from './styles.module.scss'

const ProductListing = ({ products = [], summary }) => {
  if (!products?.length) return null

  return (
    <>
      <Grid className={styles.wrapper} flex>
        {products.map(({ id, price, ...rest }) => (
          <GridItem
            key={id}
            sizes={['one-half', 'tablet-one-quarter']}
            className={styles.item}
          >
            <Card target="_blank" meta={price} {...rest} />
          </GridItem>
        ))}
      </Grid>
      {summary && (
        <ButtonGroup className={styles.buttons}>
          <Button href={socialLinks.teespring} target="_blank">
            Shop all
          </Button>
        </ButtonGroup>
      )}
    </>
  )
}

ProductListing.propTypes = {
  products: array,
  summary: bool
}

export default ProductListing
export { ProductListing }
