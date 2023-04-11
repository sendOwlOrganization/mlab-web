import { getAllBalance, getUserSelf, login } from "@/api/generated/hooks";
import { AuthorizationUtil } from "@/utils/AuthorizationUtil";
import { rest } from "msw";
import { setupServer } from "msw/node";

describe("custom-instance 테스트", () => {
  const server = setupServer();

  beforeEach(() => {
    AuthorizationUtil.saveToken("");
  });

  afterEach(() => {
    server.resetHandlers();
    jest.restoreAllMocks();
  });

  afterAll(() => {
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
        await expect(getUserSelf()).rejects.toThrow();
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
    });
  });
});
