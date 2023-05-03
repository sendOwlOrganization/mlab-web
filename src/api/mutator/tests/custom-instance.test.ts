import { getAllBalance, getUserSelf, login } from "@/api/generated/hooks";
import { customInstance } from "@/api/mutator/custom-instance";
import { AuthorizationUtil } from "@/utils/AuthorizationUtil";
import { rest } from "msw";
import { SetupServer, setupServer } from "msw/node";

const flushPromise = async () => {
  jest.useRealTimers();
  await new Promise((resolve) => setTimeout(resolve, 0));
  jest.useFakeTimers();
};

describe("custom-instance 테스트", () => {
  let server: SetupServer;

  beforeEach(() => {
    server = setupServer();
    AuthorizationUtil.saveToken("");
  });

  afterEach(() => {
    server.resetHandlers();
    server.close();
  });

  describe("로그인 성공 시", () => {
    beforeEach(() => {
      server.use(
        rest.post("/api/users/login", (req, res, ctx) => {
          return res(ctx.status(200), ctx.set("access-token", "accessTokenForTest"));
        })
      );
    });

    test("토큰을 저장한다", async () => {
      // arrange
      server.listen();
      const saveTokenSpy = jest.spyOn(AuthorizationUtil, "saveToken");

      // act
      await login({ email: "test", password: "1234" });

      // assert
      expect(saveTokenSpy).toHaveBeenCalledWith("accessTokenForTest");
    });

    test("토큰이 필요한 api 헤더에 토큰을 주입해야한다", async () => {
      // arrange
      server.use(
        rest.get("/api/users/me", (req, res, ctx) => {
          // assert
          expect(req.headers.get("Authorization")).toBe("Bearer accessTokenForTest");
          return res(ctx.status(200));
        })
      );
      server.listen();
      await login({ email: "test", password: "1234" });

      // act
      await getUserSelf();
    });

    test("29분마다 토큰 재발급 요청을 보낸다", async () => {
      // arrange
      const requestAccessTokenSpy = jest.fn();
      server.use(
        rest.get("/api/users/access-token", (req, res, ctx) => {
          requestAccessTokenSpy();
          return res(ctx.status(200), ctx.set("access-token", "refreshedAccessTokenForTest"));
        })
      );
      server.listen();
      jest.useFakeTimers();
      await login({ email: "test", password: "1234" });
      const saveTokenSpy = jest.spyOn(AuthorizationUtil, "saveToken");

      // act
      jest.advanceTimersByTime(29 * 60 * 1_000);

      // assert
      await flushPromise();
      expect(requestAccessTokenSpy).toHaveBeenCalledTimes(1);
      expect(saveTokenSpy).toHaveBeenCalledWith("refreshedAccessTokenForTest");
      jest.useRealTimers();
    });

    describe("토큰이 만료되어 401을 반환했을 때", () => {
      test("토큰을 재발급 받는다", async () => {
        // arrange
        server.use(
          rest.get("/api/users/me", (req, res, ctx) => {
            const isValidToken = req.headers.get("Authorization") === "Bearer refreshedAccessTokenForTest";
            return isValidToken ? res(ctx.status(200)) : res(ctx.status(401));
          }),
          rest.get("/api/users/access-token", (req, res, ctx) => {
            return res(ctx.status(200), ctx.set("access-token", "refreshedAccessTokenForTest"));
          })
        );
        server.listen();
        await login({ email: "test", password: "1234" });

        // assert
        await expect(getUserSelf()).rejects.toThrowError(/401/);
        await expect(getUserSelf()).resolves;
      });

      test("토큰이 필요하지 않은 api면 재발급 요청을 하지 않는다", async () => {
        // arrange
        server.use(
          rest.get("/api/balances", (req, res, ctx) => res(ctx.status(200))),
          rest.get("/api/users/access-token", () => {
            throw new Error("요청되면 안됨");
          })
        );
        server.listen();
        await login({ email: "test", password: "1234" });

        // assert
        await getAllBalance();
      });

      test("토큰 재발급마저 401을 반환 하면 로그아웃 처리된다", async () => {
        // arrange
        server.use(
          rest.get("/api/users/me", (req, res, ctx) => res(ctx.status(401))),
          rest.get("/api/users/access-token", (req, res, ctx) => res(ctx.status(401)))
        );
        server.listen();
        const saveTokenSpy = jest.spyOn(AuthorizationUtil, "saveToken");
        await login({ email: "test", password: "1234" });

        // assert
        await expect(getUserSelf()).rejects.toThrowError(/401/);
        expect(saveTokenSpy).toHaveBeenCalledWith("");
      });
    });

    describe.each(AuthorizationUtil.accessTokenApiUrls)("`%s`을 여러번 요청했을 때", (accessTokenApiUrl) => {
      const getAccessTokenSpy = jest.fn();
      const getAccessToken = () => {
        getAccessTokenSpy();
        return customInstance({ url: accessTokenApiUrl, method: "get" });
      };

      test("이미 실행중인 request가 있으면 동시에 요청해도 request가 1개만 날라간다", async () => {
        // arrange
        const accessTokenRequestSpy = jest.fn();
        server.use(
          rest.get(accessTokenApiUrl, async (req, res, ctx) => {
            accessTokenRequestSpy();
            return res(ctx.status(200));
          })
        );
        server.listen();

        // act
        void getAccessToken();
        void getAccessToken();
        await Promise.all([getAccessToken(), getAccessToken(), getAccessToken()]);

        // assert
        expect(getAccessTokenSpy).toHaveBeenCalledTimes(5);
        expect(accessTokenRequestSpy).toHaveBeenCalledTimes(1);
      });

      test("실행중인 request가 없으면 request들을 모두 호출 한다", async () => {
        // arrange
        const accessTokenRequestSpy = jest.fn();
        server.use(
          rest.get(accessTokenApiUrl, async (req, res, ctx) => {
            // await new Promise((resolve) => setTimeout(resolve, 0));
            accessTokenRequestSpy();
            return res(ctx.status(200));
          })
        );
        server.listen();
        await getAccessToken();

        // act
        await getAccessToken();

        // assert
        expect(getAccessTokenSpy).toHaveBeenCalledTimes(2);
        expect(accessTokenRequestSpy).toHaveBeenCalledTimes(2);
      });
    });
  });
});
