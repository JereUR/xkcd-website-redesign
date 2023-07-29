import algoliasearch from 'algoliasearch/lite'

const client = algoliasearch('KZKG6NS4QT', process.env.NEXT_PUBLIC_ALGOLIA_KEY)
const index = client.initIndex('prod_comics')

const CACHE = {}

export const search = async ({ query }) => {
  if (CACHE[query]) return CACHE[query]

  const { hits } = await index.search(query, {
    hitsPerPage: 10,
    attributesToRetrieve: ['id', 'title', 'img', 'alt']
  })

  CACHE[query] = hits

  return { results: hits }
}
