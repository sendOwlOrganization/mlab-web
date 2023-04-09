"use client";

import { customInstance } from "@/api/mutator/custom-instance";
import { AuthorizationUtil } from "@/utils/AuthorizationUtil";
import { ReactNode, useState } from "react";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { RecoilRoot } from "recoil";

const CACHE_TIME = 29 * 60 * 1_000;

const LoginProvider = ({ children }: { children: ReactNode }) => {
  useQuery({
    // TODO: 임시용, 백엔드 작업 필요
    queryFn: () => customInstance({ method: "get", url: "/api/users/refresh" }),
    queryKey: ["refresh"],
    cacheTime: CACHE_TIME,
    staleTime: CACHE_TIME,
    refetchInterval: CACHE_TIME,
    refetchIntervalInBackground: true,
    enabled: Boolean(AuthorizationUtil.getToken()),
    onError: () => AuthorizationUtil.saveToken("")
  });

  return <>{children}</>;
};

const Providers = ({ children }: { children: ReactNode }) => {
  const [queryClient] = useState(
    () => new QueryClient({ defaultOptions: { queries: { retry: 3, retryDelay: 1_000 } } })
  );
  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <LoginProvider>{children}</LoginProvider>
        {process.env.NODE_ENV === "development" && (
          <ReactQueryDevtools initialIsOpen={false} position={"bottom-right"} />
        )}
      </QueryClientProvider>
    </RecoilRoot>
  );
};

export default Providers;
