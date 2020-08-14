import React from 'react'
import { array, bool } from 'prop-types'
import { Button, ButtonGroup, Card, Grid, GridItem } from '@newhighsco/chipset'
import { socialLinks } from '../../../site.config'

import styles from './styles.module.scss'

const VideoListing = ({ videos = [], summary }) => {
  if (!videos.length) return null

  return (
    <>
      <Grid className={styles.wrapper} flex>
        {videos.map(({ id, href, image, images, title }) => (
          <GridItem
            key={id}
            sizes={['tablet-one-half', 'tablet-landscape-one-quarter']}
            className={styles.item}
          >
            <Card
              href={href}
              target="_blank"
              heading={<h2>{title}</h2>}
              image={{ src: image, sources: images, ratio: '16:9' }}
            />
          </GridItem>
        ))}
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
