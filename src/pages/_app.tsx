import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { useRouter } from 'next/router'
import { Roboto } from 'next/font/google'
import Navbar from '@/components/Navbar'
import Head from 'next/head'

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const { pathname } = router;
  let showNavBar = true;

  if (pathname === '/login') {
    showNavBar = false;
  }
  return (
    <SessionProvider session={pageProps.session}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />      
      </Head>
      <main>
        {showNavBar && <Navbar />}
        <Component {...pageProps} />
      </main>
    </SessionProvider>
  )
}
