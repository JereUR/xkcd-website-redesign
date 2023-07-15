import { Text, Navbar, useTheme, Container } from '@nextui-org/react'
import { Layout } from './Layout'
import { useRouter } from 'next/router'

export function Header() {
  const { isDark } = useTheme()
  const router = useRouter()

  return (
    <Layout>
      <Navbar isBordered={isDark} variant="sticky" shouldHideOnScroll>
        <Navbar.Brand>
          <Container display="inline-flex">
            <Text component="span" color="inherit" weight={'bold'} size={30}>
              New
            </Text>
            <Text component="span" color="inherit" size={32} weight={'light'}>
              xkcd
            </Text>
          </Container>
        </Navbar.Brand>
        <Navbar.Content activeColor="secondary" hideIn="xs" variant="underline">
          <Navbar.Link isActive={router.pathname === '/'} href="/">
            <Text size={18} weight={'medium'}>
              Home
            </Text>
          </Navbar.Link>
          <Navbar.Link isActive={router.pathname === '/about'} href="/about">
            <Text size={18} weight={'medium'}>
              About
            </Text>
          </Navbar.Link>
          <Navbar.Link isActive={router.pathname === '/search'} href="/search">
            <Text size={18} weight={'medium'}>
              Search
            </Text>
          </Navbar.Link>
        </Navbar.Content>
      </Navbar>
    </Layout>
  )
}
