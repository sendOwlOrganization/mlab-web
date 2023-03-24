import useCountUp from "@/hooks/useCountUp"
import { act, renderHook } from "@testing-library/react"

const NOW = new Date("2023-03-25T00:00:00")

describe("useCountUp 테스트", () => {
  beforeEach(() => {
    jest.useFakeTimers().setSystemTime(NOW)
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  describe("duration이 1초 일 때", () => {
    test("목표 수치가 0이면 카운트도 1초후에 0이다", () => {
      const { result } = renderHook(() => useCountUp(0))

      act(() => {
        jest.advanceTimersByTime(1_000)
      })

      expect(result.current).toBe(0)
    })
  })
})
