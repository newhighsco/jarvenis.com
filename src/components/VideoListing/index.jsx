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

import breakpoints from '../../styles/_breakpoints.module.scss'
import styles from './styles.module.scss'

const VideoListing = ({ videos = [], summary }) => {
  if (!videos.length) return null

  return (
    <>
      <Grid className={styles.wrapper} flex>
        {videos.map(({ id, href, image, title }) => {
          var src = image
          const sources = []

          if (!absoluteUrl(image)) {
            src = require(`../../../public${image}?size=300`).src
            const {
              srcSet
            } = require(`../../../public${image}?resize&format=webp`)

            sources.push({
              srcSet,
              sizes: `85vw, (min-width: ${breakpoints.tablet}px) 50vw, (min-width: ${breakpoints.tabletLandscape}px) 25vw`,
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
                  sources,
                  ratio: '16:9'
                }}
              />
            </GridItem>
          )
        })}
      </Grid>
      {summary && (
        <ButtonGroup className={styles.buttons}>
          <Button href={socialLinks.youtube} target="_blank">
            View all videos
          </Button>
        </ButtonGroup>
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
