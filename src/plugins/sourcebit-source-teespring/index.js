const path = require('path')
const fetch = require('node-fetch')
const mimeTypes = require('mime-types')

const API_BASE_URL = `https://commerce.teespring.com/v1/stores/`
const SOURCE = 'sourcebit-source-teespring'

module.exports.name = SOURCE

const CURRENCIES = ['USD', 'GBP', 'EUR', 'CAD', 'AUD']

const storefrontUrl = permaLink => `https://${permaLink}.creator-spring.com/`

module.exports.getSetup = ({ currentOptions, inquirer, ora }) => {
  const { permaLink, currency, pageLimit } = currentOptions
  const questions = [
    {
      type: 'input',
      name: 'permaLink',
      message: 'What is your Teespring storefront URL permalink?',
      validate: value =>
        value.length > 0 ? true : 'Permalink cannot be empty',
      default: permaLink
    },
    {
      type: 'list',
      name: 'currency',
      message: 'What currency should prices be displayed in?',
      choices: CURRENCIES,
      validate: value => (value.length > 0 ? true : 'Currency cannot be empty'),
      default: currency
    },
    {
      type: 'number',
      name: 'pageLimit',
      message: 'Option - limit the number of pages of products to retrieve?',
      default: pageLimit
    }
  ]

  return async () => {
    const urlJoin = (await import('url-join')).default
    const answers = await inquirer.prompt(questions)
    const { permaLink } = answers
    const spinner = ora(
      `Looking for Teespring storefront ${storefrontUrl(permaLink)}`
    ).start()

    try {
      await fetch(urlJoin(API_BASE_URL, `?slug=${permaLink}`))
    } catch (error) {
      spinner.fail()

      return module.exports.getSetup({
        currentOptions,
        inquirer,
        ora
      })()
    }

    spinner.succeed()

    return answers
  }
}

module.exports.getOptionsFromSetup = ({ answers }) => {
  const { permaLink, currency, pageLimit } = answers

  return {
    permaLink,
    currency,
    pageLimit
  }
}

module.exports.options = {
  watch: {
    default: false,
    runtimeParameter: 'watch'
  },
  permaLink: {
    default: null
  },
  currency: {
    default: CURRENCIES[0]
  },
  pageLimit: {
    default: Number.MAX_SAFE_INTEGER
  }
}

module.exports.bootstrap = async ({
  getPluginContext,
  options,
  log,
  setPluginContext
}) => {
  const urlJoin = (await import('url-join')).default
  const { permaLink, currency, pageLimit, watch } = options
  const fetchProducts = async (page = 1, accumulator = []) => {
    try {
      let body
      const {
        products,
        next,
        page: currentPage
      } = await fetch(
        urlJoin(
          API_BASE_URL,
          'products',
          `?slug=${permaLink}&currency=${currency}&page=${page}`
        )
      )
        .then(async response => {
          body = await response.text()

          return JSON.parse(body)
        })
        .catch(error => console.error(error, body))

      accumulator = accumulator.concat(products)

      if (!!next?.length && currentPage < pageLimit) {
        return await fetchProducts(page + 1, accumulator)
      }
    } catch (error) {
      console.error(error)
    }

    return accumulator
  }

  const context = getPluginContext()

  if (context?.entries) {
    log(`Loaded ${context.entries.length} entries from cache`)
  } else {
    const entries = await fetchProducts()

    setPluginContext({
      assets: entries.map(({ id, imageUrl: url }) => ({
        id,
        url: url.replace('vangogh.', 'mockup-api.')
      })),
      entries
    })
  }

  if (watch) {
    console.error('Watch mode is not supported at this time')
  }
}

module.exports.transform = async ({ data, getPluginContext, options }) => {
  const urlJoin = (await import('url-join')).default
  const { permaLink } = options
  const { assets, entries } = getPluginContext()

  const model = {
    source: SOURCE,
    modelName: 'product',
    modelLabel: 'Teespring Product'
  }

  const normalizedEntries = entries.map(
    ({ id, url, name: title, productName: type, price }) => {
      const {
        groups: { slug, productId }
      } = url.match(/(?<slug>[^?]+)\?.*pid=(?<productId>\d+).*/)

      return {
        id,
        slug,
        href: urlJoin(
          storefrontUrl(permaLink),
          'listing',
          slug,
          `?product=${productId}`
        ),
        title,
        type,
        image: assets.find(asset => asset.id === id).url,
        price,
        __metadata: {
          ...model,
          id
        }
      }
    }
  )

  const normalizedAssets = assets.map(({ id, url }) => {
    const extension = path.extname(url).split('&')[0]

    return {
      contentType: mimeTypes.lookup(extension),
      fileName: `teespring/${id}${extension}`,
      url,
      __metadata: {
        ...model,
        modelName: '__asset',
        modelLabel: 'Asset',
        id
      }
    }
  })

  return {
    ...data,
    models: data.models.concat(model),
    objects: data.objects.concat(normalizedEntries, normalizedAssets)
  }
}
