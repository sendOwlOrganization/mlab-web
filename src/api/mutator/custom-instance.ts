import { AuthorizationUtil } from "@/utils/AuthorizationUtil";
import Axios, { AxiosError, AxiosRequestConfig } from "axios";

export const AXIOS_INSTANCE = Axios.create({ baseURL: process.env.NEXT_PUBLIC_API_URL }); // use your own URL here or environment variable
/**
 * 로그인 후 access-token이 있으면 저장
 */
AXIOS_INSTANCE.interceptors.response.use((response) => {
  const isAccessTokenUrl =
    response.request.responseURL.includes("/api/users/login") ||
    response.request.responseURL.includes("/api/users/refresh");
  const accessToken = response.headers["access-token"];

  if (isAccessTokenUrl && Boolean(accessToken)) {
    AuthorizationUtil.saveToken(accessToken);
  }
  return response;
});
/**
 * Axios config 에 필요시 Authorization 헤더를 추가합니다.
 */
AXIOS_INSTANCE.interceptors.request.use((config) => {
  const accessToken = AuthorizationUtil.getToken();

  if (Boolean(accessToken) && AuthorizationUtil.isAuthorizationRequired(config.url, config.method)) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

// add a second `options` argument here if you want to pass extra options to each generated query
export const customInstance = async <T>(config: AxiosRequestConfig, options?: AxiosRequestConfig): Promise<T> => {
  // eslint-disable-next-line import/no-named-as-default-member
  const source = Axios.CancelToken.source();

  const axiosConfig: AxiosRequestConfig = {
    ...config,
    ...options,
    cancelToken: source.token
  };

  try {
    const { data } = await AXIOS_INSTANCE(axiosConfig);
    return data;
  } catch (reason) {
    // TODO: 임시용, 백엔드 작업 필요
    if (Boolean(AuthorizationUtil.getToken()) && AuthorizationUtil.isAuthorizationRequired(config.url, config.method)) {
      await customInstance({ url: "/api/users/refresh", method: "get" });
    }
    throw reason;
  }
};

// In some case with react-query and swr you want to be able to override the return error type so you can also do it here like this
export type ErrorType<Error> = AxiosError<Error>;
// In case you want to wrap the body type (optional)
// (if the custom instance is processing data before sending it, like changing the case for example)
