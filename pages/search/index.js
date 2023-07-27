import Layout from 'components/Layout'
import Head from 'next/head'

export default function index({ query }) {
  return (
    <>
      <Head>
        <title>xkcd - Results for {query}</title>
        <meta name="description" content={`Search results for ${query}`} />
      </Head>
      <Layout>
        <h1>Resultados para {query}</h1>
      </Layout>
    </>
  )
}

export async function getServerSideProps(context) {
  const { query } = context
  const { q = '' } = query

  //Call Algolia api for search results
  return {
    props: {
      query: q
    }
  }
}
