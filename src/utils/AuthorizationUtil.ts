export type AccessTokenApiUrl = (typeof AuthorizationUtil.accessTokenApiUrls)[number];

export class AuthorizationUtil {
  private static localStorageKey = "mlabToken";

  static readonly accessTokenApiUrls = ["/api/users/login", "/api/users/access-token"] as const;

  /**
   * 인증이 필요한 API URL, Method 목록
   */
  static readonly authRequiredApiUrls: Record<string, string[]> = {
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

    return Object.entries(AuthorizationUtil.authRequiredApiUrls).some(
      ([authRequiredUrl, methods]) => url.includes(authRequiredUrl) && methods.includes(method.toUpperCase())
    );
  };

  static isAccessTokenUrl = (url?: string): url is AccessTokenApiUrl => {
    return AuthorizationUtil.accessTokenApiUrls.some((accessTokenUrl) => url?.includes(accessTokenUrl));
  };

  static saveToken = (token: string) => {
    if (typeof window === "undefined") {
      return;
    }
    localStorage.setItem(AuthorizationUtil.localStorageKey, token);
  };

  /**
   * 저장된 토큰이 있으면 반환
   */
  static getToken = () => {
    if (typeof window === "undefined") {
      return "";
    }
    return localStorage.getItem(AuthorizationUtil.localStorageKey) || "";
  };
}
