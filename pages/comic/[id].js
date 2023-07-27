import Head from 'next/head'
import fs from 'fs/promises'
import Image from 'next/image'
import { readFile, stat } from 'fs/promises'
import Link from 'next/link'
import { basename } from 'path'
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai'

import Layout from 'components/Layout'

export default function Comic({
  img,
  alt,
  title,
  width,
  height,
  hasPrevious,
  prevId,
  hasNext,
  nextId
}) {
  return (
    <>
      <Head>
        <title>xkcd - Comics for developers</title>
        <meta name="description" content="Comics for developers" />
      </Head>

      <Layout>
        <section className="max-w-lg m-auto">
          <h1 className="font-bold text-xl text-center mb-4">{title}</h1>
          <div className="max-w-xs m-auto">
            <Image
              src={img}
              width={width}
              height={height}
              alt={alt}
              layout="responsive"
            />
          </div>
          <p className="mt-5">{alt}</p>

          <div className="flex justify-between mt-5 font-bold ">
            {hasPrevious && (
              <Link href="/comic/[id]" as={`/comic/${prevId}`}>
                <a className="text-gray-500 flex">
                  <AiOutlineArrowLeft className="mr-1 text-lg" /> Previous
                </a>
              </Link>
            )}
            {hasNext && (
              <Link href="/comic/[id]" as={`/comic/${nextId}`}>
                <a
                  className={`text-gray-500 flex ${!hasPrevious && 'ml-auto'}`}
                >
                  Next <AiOutlineArrowRight className="ml-1 text-lg" />
                </a>
              </Link>
            )}
          </div>
        </section>
      </Layout>
    </>
  )
}

export async function getStaticPaths() {
  const files = await fs.readdir('./comics')
  const paths = files.map((file) => {
    const id = basename(file, '.json')
    return { params: { id } }
  })

  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const { id } = params

  const content = await readFile(`./comics/${id}.json`, 'utf-8')
  const comic = JSON.parse(content)

  const idNumber = +id
  const prevId = idNumber - 1
  const nextId = idNumber + 1

  const [prevResult, nextResult] = await Promise.allSettled([
    stat(`./comics/${prevId}.json`),
    stat(`./comics/${nextId}.json`)
  ])

  const hasPrevious = prevResult.status === 'fulfilled'
  const hasNext = nextResult.status === 'fulfilled'

  /* I don't do this because of possible ban, I prefer to do a general fetch (scrapper) and have all the comics locally.
  
  const res = await fetch(`https://xkcd.com/${id}/info.0.json`)
  const comic = res.json()
  console.log(comic)
  
  */

  return {
    props: {
      ...comic,
      hasPrevious,
      prevId,
      hasNext,
      nextId
    }
  }
}
