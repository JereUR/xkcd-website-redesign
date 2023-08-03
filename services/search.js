import algoliasearch from 'algoliasearch/lite'

const APP_ID = process.env.NEXT_PUBLIC_APP_ID
const API_KEY = process.env.NEXT_PUBLIC_ALGOLIA_KEY

const client = algoliasearch(APP_ID, API_KEY)
const index = client.initIndex('prod_comics')

const CACHE = {}

export const search = async ({ query }) => {
  if (CACHE[query]) return { results: CACHE[query] }

  const { hits } = await index.search(query, {
    hitsPerPage: 10,
    attributesToRetrieve: ['id', 'title', 'img', 'alt']
  })

  CACHE[query] = hits

  return { results: hits }
}
