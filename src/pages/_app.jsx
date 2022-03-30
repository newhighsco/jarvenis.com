import React from 'react'
import { func, object } from 'prop-types'
import { AppPage } from '@newhighsco/press-start'
import config from '../../site.config'
import theme from '../theme'

import '../styles/app.scss'

const App = props => <AppPage {...props} theme={theme} config={config} />

App.propTypes = {
  Component: func,
  pageProps: object
}

export default App
