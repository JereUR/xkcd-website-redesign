import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

import Layout from 'components/Layout'
import { search } from 'services/search'
import { UseI18N } from 'context/i18n'

export default function index({ query, results }) {
  const { t } = UseI18N()

  return (
    <>
      <Head>
        <title>xkcd - Results for {query}</title>
        <meta name="description" content={`Search results for ${query}`} />
      </Head>
      <Layout>
        <h1>{t('SEARCH_RESULTS_TITLE', results.length, query)}</h1>
        {results.map((result) => {
          return (
            <Link key={result.id} href={`/comic/${result.id}`}>
              <a className="flex flex-row justify-start content-center bg-slate-300 hover:bg-slate-50">
                <Image
                  src={result.img}
                  alt={result.alt}
                  className="rounded-full"
                  width={50}
                  height={50}
                />
                <div>
                  <h2>{result.title}</h2>
                </div>
              </a>
            </Link>
          )
        })}
      </Layout>
    </>
  )
}

export async function getServerSideProps(context) {
  const { query } = context
  const { q = '' } = query

  const { results } = await search({ query: q })

  return {
    props: {
      query: q,
      results
    }
  }
}
