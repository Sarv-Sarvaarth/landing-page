import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import Layout from '@/components/layout/Layout'
import ErrorBoundary from '@/components/ui/ErrorBoundary'

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()

  // Don't apply main layout to admin pages
  const isAdminPage = router.pathname.startsWith('/admin')

  return (
    <ErrorBoundary>
      {isAdminPage ? (
        <Component {...pageProps} />
      ) : (
        <Layout>
          <Component {...pageProps} />
        </Layout>
      )}
    </ErrorBoundary>
  )
}
