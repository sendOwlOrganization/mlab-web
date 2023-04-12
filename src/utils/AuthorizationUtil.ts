export type AccessTokenApiUrl = (typeof AuthorizationUtil.ACCESS_TOKEN_API_URLS)[number];

export class AuthorizationUtil {
  private static LOCALSTORAGE_KEY = "mlabToken";

  static readonly ACCESS_TOKEN_API_URLS = ["/api/users/login", "/api/users/access-token"] as const;

  /**
   * 인증이 필요한 API URL, Method 목록
   */
  static readonly AUTH_REQUIRED_API_URLS: Record<string, string[]> = {
    ["/api/comments"]: ["POST", "PUT", "DELETE"],
    ["/api/categories"]: ["POST", "PUT", "DELETE"],
    ["/api/boards"]: ["POST", "PUT", "DELETE"],
    ["/api/blame"]: ["POST"],
    ["/api/users/set-profile"]: ["POST"],
    ["/api/users/me"]: ["GET"],
    ["/api/users/access-token"]: ["GET"],
    ["/api/like/comment"]: ["POST", "DELETE"],
    ["/api/like/board"]: ["POST", "DELETE"],
    ["/api/balances/vote"]: ["POST"]
  };

  static isAuthorizationRequired = (url?: string, method?: string) => {
    if (!url || !method) {
      return false;
    }

    return Object.entries(AuthorizationUtil.AUTH_REQUIRED_API_URLS).some(
      ([authRequiredUrl, methods]) => url.includes(authRequiredUrl) && methods.includes(method.toUpperCase())
    );
  };

  static isAccessTokenUrl = (url?: string): url is AccessTokenApiUrl => {
    return AuthorizationUtil.ACCESS_TOKEN_API_URLS.some((accessTokenUrl) => url?.includes(accessTokenUrl));
  };

  static saveToken = (token: string) => {
    if (typeof window === "undefined") {
      return;
    }
    localStorage.setItem(AuthorizationUtil.LOCALSTORAGE_KEY, token);
  };

  /**
   * 저장된 토큰이 있으면 반환
   */
  static getToken = () => {
    if (typeof window === "undefined") {
      return "";
    }
    return localStorage.getItem(AuthorizationUtil.LOCALSTORAGE_KEY) || "";
  };
}
