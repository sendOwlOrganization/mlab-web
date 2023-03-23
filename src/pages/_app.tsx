import "@/styles/globals.css"
import type { AppProps } from "next/app"
import { useState } from "react"
import { Hydrate, QueryCache, QueryClient, QueryClientProvider } from "react-query"
import { ReactQueryDevtools } from "react-query/devtools"

export default function App({ Component, pageProps }: AppProps) {
  const queryCache = new QueryCache()

  const [queryClient] = useState(
    () =>
      new QueryClient({
        queryCache,
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: true,
            staleTime: 0
          }
        }
      })
  )
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps && pageProps.dehydratedState}>
        <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
      </Hydrate>
      <Component {...pageProps} />
    </QueryClientProvider>
  )
}
