import "@/styles/globals.css"
import type { AppProps } from "next/app"
import { useState } from "react"
import { QueryCache, QueryClient } from "react-query"

export default function App({ Component, pageProps }: AppProps) {
  const queryCache = new QueryCache()

  const [queryClient] = useState(
    () =>
      new QueryClient({
        queryCache,
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: true,
            staleTime: 1000 * 60
          }
        }
      })
  )
  return <Component {...pageProps} />
}
