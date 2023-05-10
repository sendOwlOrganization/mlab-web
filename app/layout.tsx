import "@/mds/style.linaria.global";
import { ReactNode } from "react";
import Providers from "./providers";
import { ThemeSwitcher } from "./ThemeSwitcher";

export const metadata = {
  title: "Create Next App"
};

// pages/_app.tsx와 pages/_document.tsx 파일 대체
const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="ko" className={"light"}>
      <body>
        <ThemeSwitcher />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
};

export default RootLayout;
