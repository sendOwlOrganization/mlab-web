import { ReactNode } from "react";
import "./globals.css";
import Providers from "./providers";

export const metadata = {
  title: "Create Next App"
};

// pages/_app.tsx와 pages/_document.tsx 파일 대체
const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="ko">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
};

export default RootLayout;
