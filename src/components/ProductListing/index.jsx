import React from 'react'
import { array, bool } from 'prop-types'
import {
  absoluteUrl,
  Button,
  ButtonGroup,
  Card,
  Grid,
  GridItem
} from '@newhighsco/chipset'
import { socialLinks } from '../../../site.config'

import styles from './styles.module.scss'

const ProductListing = ({ products = [], summary }) => {
  if (!products?.length) return null

  return (
    <>
      <Grid className={styles.wrapper} flex>
        {products.map(({ id, href, image, title, kicker }) => {
          var src = image
          const sources = []

          if (!absoluteUrl(image)) {
            src = require(`../../../public${image}?size=320`)
            const {
              srcSet
            } = require(`../../../public${image}?resize&format=webp`)

            sources.push({
              srcSet,
              type: 'image/webp'
            })
          }

          return (
            <GridItem
              key={id}
              sizes={['tablet-one-half', 'tablet-landscape-one-quarter']}
              className={styles.item}
            >
              <Card
                href={href}
                target="_blank"
                heading={<h2>{title}</h2>}
                image={{
                  src,
                  sources
                }}
              >
                <p>{kicker}</p>
              </Card>
            </GridItem>
          )
        })}
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
