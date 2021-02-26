import React from 'react'
import { array, bool } from 'prop-types'
import { absoluteUrl, Button, Card, Grid } from '@newhighsco/chipset'
import { socialLinks } from '../../../site.config'

import breakpoints from '../../styles/_breakpoints.module.scss'
import styles from './VideoListing.module.scss'

const VideoListing = ({ videos = [], summary }) => {
  if (!videos.length) return null

  return (
    <>
      <Grid className={styles.root} flex>
        {videos.map(({ id, href, image, title }) => {
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
                }px) 85vw, (max-width: ${
                  breakpoints.tabletLandscape - 1
                }px) 50vw, (min-width: ${breakpoints.tabletLandscape}px) 25vw`,
                type: 'image/webp'
              })
            } catch {}
          }

          return (
            <Grid.Item
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
                  sources,
                  ratio: '16:9',
                  width: 320,
                  height: 180
                }}
              />
            </Grid.Item>
          )
        })}
      </Grid>
      {summary && (
        <Button.Group className={styles.buttons}>
          <Button href={socialLinks.youtube} target="_blank">
            View all videos
          </Button>
        </Button.Group>
      )}
    </>
  )
}

VideoListing.propTypes = {
  videos: array,
  summary: bool
}

export default VideoListing
export { VideoListing }
