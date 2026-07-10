import '../styles/app.scss'

import { AppPage } from '@newhighsco/press-start'
import { func, object } from 'prop-types'
import React from 'react'

import config from '../../site.config'
import { default as fonts } from '../styles/_font-faces.module.scss'
import theme from '../theme'

const App = props => (
  <AppPage {...props} theme={theme} config={config} fonts={fonts} />
)

App.propTypes = { Component: func, pageProps: object }

export default App
