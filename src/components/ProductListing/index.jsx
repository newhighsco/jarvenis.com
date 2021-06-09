import React from 'react'
import { array, bool } from 'prop-types'
import { absoluteUrl, Button, Card, Grid } from '@newhighsco/chipset'
import { socialLinks } from '../../../site.config'

import breakpoints from '../../styles/_breakpoints.module.scss'
import styles from './ProductListing.module.scss'

const ProductListing = ({ products = [], summary }) => {
  if (!products?.length) return null

  return (
    <>
      <Grid className={styles.root} flex>
        {products.map(({ id, href, image, title, type }) => {
          let src = image
          const sources = []

          if (!absoluteUrl(image)) {
            try {
              src = require(`../../../public${image}?size=320`).src
              const {
                srcSet
              } = require(`../../../public${image}?resize&format=webp`)

              sources.push({
                srcSet,
                sizes: `(max-width: ${
                  breakpoints.tablet - 1
                }px) 42.5vw, (max-width: ${
                  breakpoints.tabletLandscape - 1
                }px) 50vw, (max-width: ${
                  breakpoints.desktopMedium - 1
                }px) 25vw, (min-width: ${breakpoints.desktopMedium}px) 228w`,
                type: 'image/webp'
              })
            } catch {}
          }

          return (
            <Grid.Item
              key={id}
              sizes={['one-half', 'tablet-landscape-one-quarter']}
              className={styles.item}
            >
              <Card
                href={href}
                target="_blank"
                heading={<h2>{title}</h2>}
                image={{
                  src,
                  sources,
                  width: 320,
                  height: 320
                }}
              >
                <p>{type}</p>
              </Card>
            </Grid.Item>
          )
        })}
      </Grid>
      {summary && (
        <Button.Group className={styles.buttons}>
          <Button href={socialLinks.teespring} target="_blank">
            Shop all
          </Button>
        </Button.Group>
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
