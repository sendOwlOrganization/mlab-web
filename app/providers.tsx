"use client";

import { getUserSelf } from "@/api/generated/hooks";
import { customInstance } from "@/api/mutator/custom-instance";
import { useProfile } from "@/store/useProfile";
import { AuthorizationUtil } from "@/utils/AuthorizationUtil";
import { ReactNode, useEffect, useState } from "react";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { RecoilRoot } from "recoil";

const CACHE_TIME = 29 * 60 * 1_000;

const LoginProvider = ({ children }: { children: ReactNode }) => {
  const { profile, updateProfile, logout } = useProfile();
  useQuery({
    // TODO: 임시용, 백엔드 작업 필요
    queryFn: () => customInstance({ method: "get", url: "/api/users/refresh" }),
    queryKey: ["refresh"],
    cacheTime: CACHE_TIME,
    staleTime: CACHE_TIME,
    refetchInterval: CACHE_TIME,
    refetchIntervalInBackground: true,
    enabled: Boolean(profile) || Boolean(AuthorizationUtil.getToken()),
    onError: () => logout()
  });

  useEffect(() => {
    if (AuthorizationUtil.getToken()) {
      getUserSelf()
        .then((user) => updateProfile(user))
        .catch(() => logout());
    }
  }, []);

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
      </QueryClientProvider>
    </RecoilRoot>
  );
};

export default Providers;
