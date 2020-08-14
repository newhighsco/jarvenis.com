const fetch = require('node-fetch')
const { parseStringPromise } = require('xml2js')

const feedUrl = channelId =>
  `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`

const name = 'sourcebit-source-youtube'

module.exports.name = name

module.exports.getSetup = ({ currentOptions, inquirer, ora }) => {
  const questions = [
    {
      type: 'input',
      name: 'channelId',
      message: 'What is your YouTube channel ID?',
      validate: value =>
        value.length > 0 ? true : 'Channel ID cannot be empty',
      default: currentOptions.channelId
    }
  ]

  return async () => {
    const answers = await inquirer.prompt(questions)
    const url = feedUrl(answers.channelId)
    const spinner = ora(`Looking for YouTube channel feed ${url}`).start()

    try {
      await fetch(url)
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
    channelId: answers.channelId
  }
}

module.exports.options = {
  watch: {
    default: false,
    runtimeParameter: 'watch'
  },
  channelId: {
    default: null
  }
}

module.exports.bootstrap = async ({
  getPluginContext,
  options,
  log,
  setPluginContext
}) => {
  const context = getPluginContext()

  if (context && context.entries) {
    log(`Loaded ${context.entries.length} entries from cache`)
  } else {
    const xml = await fetch(feedUrl(options.channelId)).then(response =>
      response.text()
    )
    const {
      feed: { entry: entries }
    } = await parseStringPromise(xml, {
      explicitArray: false,
      mergeAttrs: true
    }).then(result => result)

    setPluginContext({
      entries
    })
  }

  if (options.watch) {
    console.error('Watch mode is not supported at this time')
  }
}

module.exports.transform = ({ data, getPluginContext, options }) => {
  const { entries } = getPluginContext()

  const model = {
    source: name,
    modelName: 'video',
    modelLabel: 'YouTube Video',
    projectId: options.channelId,
    projectEnvironment: ''
  }

  const imageHost = 'https://i.ytimg.com/'
  const imageFileName = '/maxresdefault'

  const normalizedEntries = entries
    .sort((a, b) => b.published - a.published)
    .map(
      ({
        'yt:videoId': id,
        link: { href },
        title,
        'media:group': { 'media:description': content },
        published: createdAt,
        updated: updatedAt
      }) => {
        const image = `${imageHost}vi/${id}${imageFileName}.jpg`

        return {
          id,
          href,
          title,
          image,
          images: [
            {
              srcSet: `${imageHost}vi_webp/${id}${imageFileName}.webp`,
              type: 'image/webp'
            },
            {
              srcSet: image,
              type: 'image/jpeg'
            }
          ],
          content,
          __metadata: {
            ...model,
            id,
            createdAt,
            updatedAt
          }
        }
      }
    )

  return {
    ...data,
    models: data.models.concat(model),
    objects: data.objects.concat(normalizedEntries)
  }
}
