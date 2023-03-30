import { AuthorizationUtil } from "@/utils/AuthorizationUtil";
import Axios, { AxiosError, AxiosRequestConfig } from "axios";

export const AXIOS_INSTANCE = Axios.create({ baseURL: process.env.NEXT_PUBLIC_API_URL }); // use your own URL here or environment variable
AXIOS_INSTANCE.interceptors.response.use((response) => {
  if (response.request.responseURL.includes("/api/users/login") && response.headers["access-token"]) {
    AuthorizationUtil.saveToken(response.headers["access-token"]);
  }
  return response;
});

// add a second `options` argument here if you want to pass extra options to each generated query
export const customInstance = <T>(config: AxiosRequestConfig, options?: AxiosRequestConfig): Promise<T> => {
  // eslint-disable-next-line import/no-named-as-default-member
  const source = Axios.CancelToken.source();

  const axiosConfig: AxiosRequestConfig = injectAuthorizationHeader({
    ...config,
    ...options,
    cancelToken: source.token
  });

  return AXIOS_INSTANCE(axiosConfig).then(({ data }) => data);
};

/**
 * Axios config 에 필요시 Authorization 헤더를 추가합니다.
 * @param config
 */
const injectAuthorizationHeader = (config: AxiosRequestConfig) => {
  const accessToken = AuthorizationUtil.getToken();

  if (Boolean(accessToken) && AuthorizationUtil.isAuthorizationRequired(config.url, config.method)) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${accessToken}`
    };
  }

  return config;
};

// In some case with react-query and swr you want to be able to override the return error type so you can also do it here like this
export type ErrorType<Error> = AxiosError<Error>;
// In case you want to wrap the body type (optional)
// (if the custom instance is processing data before sending it, like changing the case for example)
