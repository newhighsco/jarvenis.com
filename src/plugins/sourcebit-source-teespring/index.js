const path = require('path')
const fetch = require('node-fetch')
const urlJoin = require('url-join')
const mimeTypes = require('mime-types')

const BASE_URL = 'https://teespring.com/'
const API_BASE_URL = `${BASE_URL}api/stores/`
const STOREFRONT_BASE_URL = `${BASE_URL}stores/`
const SOURCE = 'sourcebit-source-teespring'

module.exports.name = SOURCE

const CURRENCIES = ['USD', 'GBP', 'EUR', 'CAD', 'AUD']

module.exports.getSetup = ({ currentOptions, inquirer, ora }) => {
  const questions = [
    {
      type: 'input',
      name: 'permaLink',
      message: 'What is your Teespring storefront URL permalink?',
      validate: value =>
        value.length > 0 ? true : 'Permalink cannot be empty',
      default: currentOptions.permaLink
    },
    {
      type: 'list',
      name: 'currency',
      message: 'What currency should prices be displayed in?',
      choices: CURRENCIES,
      validate: value => (value.length > 0 ? true : 'Currency cannot be empty'),
      default: currentOptions.currency
    },
    {
      type: 'number',
      name: 'pageLimit',
      message: 'Option - limit the number of pages of products to retrieve?',
      default: currentOptions.pageLimit
    }
  ]

  return async () => {
    const answers = await inquirer.prompt(questions)
    const spinner = ora(
      `Looking for Teespring storefront ${urlJoin(
        STOREFRONT_BASE_URL,
        answers.permaLink
      )}`
    ).start()

    try {
      await fetch(urlJoin(API_BASE_URL, answers.permaLink))
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
  return {
    permaLink: answers.permaLink,
    currency: answers.currency,
    pageLimit: answers.pageLimit
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
  const fetchProducts = async (page = 1, accumulator = []) => {
    try {
      const { products, next, page: currentPage } = await fetch(
        urlJoin(
          API_BASE_URL,
          options.permaLink,
          `store_products?currency=${options.currency}&page=${page}`
        )
      ).then(response => response.json())

      accumulator = accumulator.concat(products)

      if (next && currentPage < options.pageLimit) {
        return await fetchProducts(page + 1, accumulator)
      }
    } catch (error) {
      console.error(error)
    }

    return accumulator
  }

  const context = getPluginContext()

  if (context && context.entries) {
    log(`Loaded ${context.entries.length} entries from cache`)
  } else {
    const entries = await fetchProducts()

    setPluginContext({
      assets: entries.map(({ id, image_url: url }) => ({
        id,
        url: url.replace('vangogh.', 'mockup-api.')
      })),
      entries
    })
  }

  if (options.watch) {
    console.error('Watch mode is not supported at this time')
  }
}

module.exports.transform = ({ data, getPluginContext }) => {
  const { assets, entries } = getPluginContext()

  const model = {
    source: SOURCE,
    modelName: 'product',
    modelLabel: 'Teespring Product'
  }

  const normalizedEntries = entries.map(
    ({ id, url: slug, name: title, product_name: type, price }) => ({
      id,
      slug: slug.replace(/([^?]+)\?.*/g, '$1'),
      href: urlJoin(BASE_URL, slug),
      title,
      type,
      image: assets.find(asset => asset.id === id).url,
      price,
      __metadata: {
        ...model,
        id
      }
    })
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
