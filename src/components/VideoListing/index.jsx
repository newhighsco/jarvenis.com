import React from 'react'
import { array, bool } from 'prop-types'
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

const VideoListing = ({ videos = [], summary }) => {
  if (!videos.length) return null

  return (
    <>
      <Grid className={styles.wrapper}>
        {videos.map(({ id, href, title, image }) => (
          <GridItem key={id} sizes={['one-half', 'tablet-one-quarter']}>
            <SmartLink className={styles.link} href={href} target="_blank">
              <ResponsiveMedia ratio="16:9" className={styles.image}>
                <img src={image} alt="" loading="lazy" />
              </ResponsiveMedia>
              <div className={styles.content}>
                <div className={styles.title}>{title}</div>
              </div>
            </SmartLink>
          </GridItem>
        ))}
      </Grid>
      {summary && (
        <ButtonGroup className={styles.buttons}>
          <Button href={socialLinks.youtube} target="_blank">
            View all
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
