import Head from 'next/head'
import { Header } from 'components/Header'
import Image from 'next/image'
import { readFile } from 'fs/promises'

export default function Comic({ img, alt, title, width, height }) {
  return (
    <>
      <Head>
        <title>xkcd - Comics for developers</title>
        <meta name="description" content="Comics for developers" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />

      <main>
        <section className="max-w-lg m-auto">
          <h1 className="font-bold ">{title}</h1>
          <Image src={img} width={width} height={height} alt={alt} />
          <p>{alt}</p>
        </section>
      </main>
    </>
  )
}

export async function getStaticPaths() {
  return {
    paths: [{ params: { id: '2500' } }],
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const { id } = params

  const content = await readFile(`./comics/${id}.json`, 'utf-8')
  const comic = JSON.parse(content)
  console.log(comic)

  /* I don't do this because of possible ban, I prefer to do a general fetch (scrapper) and have all the comics locally.
  
  const res = await fetch(`https://xkcd.com/${id}/info.0.json`)
  const comic = res.json()
  console.log(comic)
  
  */

  return {
    props: {
      ...comic
    }
  }
}
