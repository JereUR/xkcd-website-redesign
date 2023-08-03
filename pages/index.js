import fs from 'fs/promises'

import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import Layout from 'components/Layout'
import { UseI18N } from 'context/i18n'

export default function Home({ latestComics }) {
  const { t } = UseI18N()

  return (
    <>
      <Head>
        <title>{t('SEO_DEFAULT_TITLE')}</title>
        <meta name="description" content="Comics for developers" />
      </Head>

      <Layout>
        <h2 className="text-3xl font-bold text-center mb-10">
          {t('LATEST_COMICS')}
        </h2>
        <section className="grid grid-cols-1 gap-10 max-w-md sm:max-w-xl md:max-w-5xl m-auto sm:grid-cols-2 md:grid-cols-4">
          {latestComics.map((comic) => {
            return (
              <Link href={`/comic/${comic.id}`} key={comic.id}>
                <a className="mb-4 pb-4 m-auto hover:scale-105 transition-transform duration-500">
                  <h3 className="font-bold text-md text-center pb-2">
                    {comic.title}
                  </h3>
                  <Image
                    src={comic.img}
                    alt={comic.alt}
                    width={comic.width}
                    height={comic.height}
                    priority
                  />
                </a>
              </Link>
            )
          })}
        </section>
      </Layout>
    </>
  )
}

export async function getStaticProps(context) {
  const files = await fs.readdir('./comics')
  const latestComicsFiles = files.slice(-8, files.length)

  const promisesReadFiles = latestComicsFiles.map(async (file) => {
    const content = await fs.readFile(`./comics/${file}`, 'utf8')
    return JSON.parse(content)
  })

  const latestComics = await Promise.all(promisesReadFiles)

  return {
    props: {
      latestComics
    }
  }
}
