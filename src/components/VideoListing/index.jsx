import React from 'react'
import { array, bool } from 'prop-types'
import Image from 'next/image'
import { Button, Card, Grid } from '@newhighsco/chipset'
import { socialLinks } from '../../../site.config'

import styles from './VideoListing.module.scss'

const VideoListing = ({ videos = [], summary }) => {
  if (!videos.length) return null

  return (
    <>
      <Grid className={styles.root} flex>
        {videos.map(({ id, href, image, title }) => {
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
                  render: () => (
                    <Image
                      src={image}
                      alt=""
                      width={320}
                      height={180}
                      layout="responsive"
                    />
                  ),
                  ratio: '16:9'
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
