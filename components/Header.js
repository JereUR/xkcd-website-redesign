import Link from 'next/link'
import { useRouter } from 'next/router'
import { useRef, useState } from 'react'

export function Header() {
  const [results, setResults] = useState([])
  const searchRef = useRef()
  const { locale, locales } = useRouter()

  const getValue = () => searchRef.current?.value

  const handleChange = () => {
    const q = getValue()
    if (!q) {
      setResults([])
      return
    }

    fetch(`/api/search?q=${q}`)
      .then((res) => res.json())
      .then((results) => {
        setResults(results)
      })
  }

  const restOfLocales = locales.filter((l) => l !== locale)

  return (
    <header className="flex justify-between items-center p-4 max-w-xl m-auto">
      <h1 className="font-bold text-3xl">
        <Link href="/">
          <a className="text-black transition hover:opacity-80">
            new<span className="font-light text-2xl">xkcd</span>
          </a>
        </Link>
      </h1>
      <nav>
        <ul className="flex flex-row gap-2">
          <li>
            <Link href="/">
              <a className="text-sm font-bold text-black">Home</a>
            </Link>
          </li>
          <li>
            <Link href="/" locale={restOfLocales[0]}>
              <a className="text-sm font-bold text-black">{restOfLocales[0]}</a>
            </Link>
          </li>
          <li>
            <input
              className="text-sm rounded-3xl border-gray-400 border-2 px-4 py-1"
              ref={searchRef}
              type="search"
              onChange={handleChange}
            />
            <div className="relative z-10">
              {Boolean(results.length) && (
                <div className="absolute top-0 left-0">
                  <ul className="w-full border border-gray-50 rounded-lg shadow-xl bg-white overflow-hidden">
                    <li className="m-0" key="all-results">
                      <Link href={`/search?q=${getValue()}`} passHref>
                        <a className="italic px-2 py-1 text-sm font-semibold hover:bg-slate-200 w-full text-ellipsis whitespace-nowrap text-gray-400">
                          Ver {results.length} resultados
                        </a>
                      </Link>
                    </li>
                    {results.map((result) => {
                      return (
                        <li className="m-0" key={result.id}>
                          <Link href={`/comic/${result.id}`} passHref>
                            <a className="px-2 py-1 text-sm font-semibold text-black hover:bg-slate-200 w-full text-ellipsis whitespace-nowrap">
                              {result.title}
                            </a>
                          </Link>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              )}
            </div>
          </li>
        </ul>
      </nav>
    </header>
  )
}
