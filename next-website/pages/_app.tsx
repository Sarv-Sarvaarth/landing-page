import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '@/components/layout/Layout'
import ErrorBoundary from '@/components/ui/ErrorBoundary'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ErrorBoundary>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ErrorBoundary>
  )
}
