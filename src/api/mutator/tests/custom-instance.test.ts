import { getUserSelf, login } from "@/api/generated/hooks";
import { AuthorizationUtil } from "@/utils/AuthorizationUtil";
import { rest } from "msw";
import { setupServer } from "msw/node";

describe("custom-instance 테스트", () => {
  const server = setupServer();

  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    server.resetHandlers();
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
      server.listen();
      await login({ email: "test", password: "1234" });

      expect(AuthorizationUtil.getToken()).toBe("accessTokenForTest");
    });

    test("토큰이 필요한 api 헤더에 토큰을 주입해야한다", async () => {
      server.use(
        rest.get("/api/users/me", (req, res, ctx) => {
          expect(req.headers.get("Authorization")).toBe("Bearer accessTokenForTest");
          return res(ctx.status(200));
        })
      );
      server.listen();
      await login({ email: "test", password: "1234" });

      await getUserSelf();
    });

    test("주입된 토큰이 만료되어 401을 반환하면 토큰을 재발급 받는다", async () => {
      server.use(
        rest.get("/api/users/me", (req, res, ctx) => {
          const isValidToken = req.headers.get("Authorization") === "Bearer refreshedAccessTokenForTest";
          return isValidToken ? res(ctx.status(200)) : res(ctx.status(401));
        }),
        // TODO: 임시용, 백엔드 작업 필요
        rest.get("/api/users/refresh", (req, res, ctx) => {
          return res(ctx.status(200), ctx.set("access-token", "refreshedAccessTokenForTest"));
        })
      );
      server.listen();
      await login({ email: "test", password: "1234" });

      await expect(getUserSelf()).rejects.toThrow();
      await expect(getUserSelf()).resolves;
    });
  });
});
