import algoliasearch from 'algoliasearch/lite'

const client = algoliasearch('KZKG6NS4QT', process.env.NEXT_PUBLIC_ALGOLIA_KEY)
const index = client.initIndex('prod_comics')

export const search = async ({ query }) => {
  const { hits } = await index.search(query, {
    hitsPerPage: 10,
    attributesToRetrieve: ['id', 'title', 'img', 'alt']
  })

  return { results: hits }
}
