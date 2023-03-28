import useCountUp from "@/hooks/useCountUp"
import { act, renderHook } from "@testing-library/react"

const NOW = new Date("2023-03-25T00:00:00")

describe("useCountUp 테스트", () => {
  beforeEach(() => {
    jest.useFakeTimers().setSystemTime(NOW)
  })

  afterEach(() => {
    jest.useRealTimers()
    jest.restoreAllMocks()
  })

  describe.each([1_000, 5_000])("duration이 %dms 일 때", (givenDuration) => {
    const seconds = (givenDuration / 1_000).toFixed(2)

    test.each([
      { given: 0, expected: 0 },
      { given: 1_234, expected: 1_234 },
      { given: 50_433, expected: 50_433 },
      { given: 2_403, expected: 2_403 }
    ])(`목표 수치가 $given이면 카운트도 ${seconds}초 후에 $expected이다`, ({ given, expected }) => {
      const { result } = renderHook(() => useCountUp(given, givenDuration))

      act(() => {
        jest.advanceTimersByTime(givenDuration)
      })

      expect(result.current).toBe(expected)
    })

    test.each([52, 492, 2_033])(`${seconds}초가 되지 않았을 때 카운트가 목표 수치(%d)보다 낮아야한다`, (givenEnd) => {
      const { result } = renderHook(() => useCountUp(givenEnd, givenDuration))

      act(() => {
        jest.advanceTimersByTime(givenDuration / 2)
      })

      expect(result.current).toBeLessThan(givenEnd)
    })

    test.each([320, 9_343, 184_495])(`${seconds}초가 지나도 카운트가 목표 수치(%d)와 같아야 한다`, (givenEnd) => {
      const { result } = renderHook(() => useCountUp(givenEnd, givenDuration))

      act(() => {
        jest.advanceTimersByTime(givenDuration + 1_000)
      })

      expect(result.current).toBe(givenEnd)
    })

    test(`목표 수치가 0이하면 ${seconds}초가 지나지 않아도 카운트가 0이다`, () => {
      const { result } = renderHook(() => useCountUp(-500, givenDuration))

      act(() => {
        jest.advanceTimersByTime(givenDuration / 3)
      })

      expect(result.current).toBe(0)
    })

    test(`목표 수치가 0이하면 ${seconds}초가 지나도 카운트가 0이다`, () => {
      const { result } = renderHook(() => useCountUp(-500, givenDuration))

      act(() => {
        jest.advanceTimersByTime(givenDuration)
      })

      expect(result.current).toBe(0)
    })

    test("시간이 지나기전에 언마운트되면 타이머가 클리어된다", () => {
      const clearIntervalSpy = jest.spyOn(window, "clearInterval")
      const { unmount } = renderHook(() => useCountUp(1000, givenDuration))
      act(() => {
        jest.advanceTimersByTime(givenDuration / 2)
      })

      unmount()

      expect(clearIntervalSpy).toHaveBeenCalledTimes(1)
    })
  })
})
