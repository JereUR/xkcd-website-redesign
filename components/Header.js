import { Link } from '@nextui-org/react'

export function Header() {
  return (
    <header className="flex justify-between items-center p-4 max-w-xl m-auto">
      <h1 className="font-bold text-3xl">
        new<span className="font-light text-2xl">xkcd</span>
      </h1>
      <nav>
        <ul className="flex flex-row gap-2">
          <li>
            <Link href="/" className="text-sm font-bold text-black">
              Home
            </Link>
          </li>
          <li>
            <Link href="/about" className="text-sm font-bold text-black">
              About
            </Link>
          </li>
          <li>
            <Link href="/search" className="text-sm font-bold text-black">
              Search
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}
