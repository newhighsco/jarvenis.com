import '../styles/app.scss'

import { AppPage } from '@newhighsco/press-start'
import { func, object } from 'prop-types'
import React from 'react'

import config from '../../site.config'
import theme from '../theme'

const App = props => <AppPage {...props} theme={theme} config={config} />

App.propTypes = { Component: func, pageProps: object }

export default App
