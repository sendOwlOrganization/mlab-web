import './globals.css'
import { ReactNode } from 'react'

export const metadata = {
  title: 'Create Next App',
}

// pages/_app.tsx와 pages/_document.tsx 파일 대체
const RootLayout = ({children}: {
  children: ReactNode;
}) => {
  return (
    <html lang="ko">
      <body>
        {children}
      </body>
    </html>
  )
}

export default RootLayout
