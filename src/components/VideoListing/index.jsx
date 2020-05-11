import React from 'react'
import { array } from 'prop-types'
import { Grid, GridItem, SmartLink, ResponsiveMedia } from '@newhighsco/chipset'

import styles from './styles.module.scss'

const VideoListing = ({ videos }) => {
  if (!videos.length) return null

  return (
    <Grid className={styles.wrapper}>
      {videos.map(({ id, href, heading, image }) => (
        <GridItem key={id} sizes={['one-half', 'tablet-one-quarter']}>
          <SmartLink className={styles.link} href={href} target="_blank">
            <ResponsiveMedia ratio="16:9" className={styles.image}>
              <img src={image} alt="" />
            </ResponsiveMedia>
            <div className={styles.content}>
              <div className={styles.heading}>{heading}</div>
            </div>
          </SmartLink>
        </GridItem>
      ))}
    </Grid>
  )
}

VideoListing.propTypes = {
  videos: array
}

export default VideoListing
export { VideoListing }
