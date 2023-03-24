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
      const { result } = renderHook(() => useCountUp(0, 1_000))

      act(() => {
        jest.advanceTimersByTime(1_000)
      })

      expect(result.current).toBe(0)
    })

    test("목표 수치가 5,000이면 카운트도 1초후에 1,000이다", () => {
      const { result } = renderHook(() => useCountUp(5_000, 1_000))

      act(() => {
        jest.advanceTimersByTime(1_000)
      })

      expect(result.current).toBe(5_000)
    })

    test("1초가 되지 않았을 때 카운트가 목표 수치 보다 낮아야한다", () => {
      const { result } = renderHook(() => useCountUp(5_000, 1_000))

      act(() => {
        jest.advanceTimersByTime(500)
      })

      expect(result.current).toBeLessThan(5_000)
    })

    test("1초가 지나도 카운트가 목표 수치와 같아야 한다", () => {
      const { result } = renderHook(() => useCountUp(5_000, 1_000))

      act(() => {
        jest.advanceTimersByTime(1_200)
      })

      expect(result.current).toBe(5_000)
    })
  })
})
