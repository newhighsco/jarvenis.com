import React from 'react'
import { array, bool } from 'prop-types'
import Image from 'next/image'
import { Button, Card, Grid } from '@newhighsco/chipset'
import config from '../../../site.config'

import styles from './ProductListing.module.scss'

const ProductListing = ({ products = [], summary }) => {
  if (!products?.length) return null

  return (
    <>
      <Grid className={styles.root} flex>
        {products.map(({ id, href, image, title, type }) => {
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
                  render: () => (
                    <Image
                      src={image}
                      alt=""
                      width={320}
                      height={320}
                      layout="responsive"
                      placeholder="blur"
                      blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8Vg8AAnEBdzTCX3oAAAAASUVORK5CYII="
                    />
                  )
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
          <Button href={config.socialLinks.teespring} target="_blank">
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
