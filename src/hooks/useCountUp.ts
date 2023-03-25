import { useEffect, useState } from "react"

const FRAMERATE = 1_000 / 60

/**
 * 가속도 함수
 * 출처 {@link https://easings.net/ko#easeOutExpo}
 * @param x
 */
const easeOutExpo = (x: number): number => (x === 1 ? 1 : 1 - Math.pow(2, -10 * x))

/**
 * 정해진 시간동안 카운트를 0부터 목표까지 증가시키는 훅
 * @param end 목표
 * @param duration 시간 (ms 단위)
 * @return {number} 카운트
 */
const useCountUp = (end: number, duration = 1_000) => {
  const [count, setCount] = useState(0)
  const totalFrame = Math.round(duration / FRAMERATE)

  useEffect(() => {
    if (end <= 0) {
      return
    }

    let currentCount = 0

    const counter = setInterval(() => {
      const progress = easeOutExpo(++currentCount / totalFrame)
      setCount(Math.round(end * progress))
      if (progress === 1) {
        clearInterval(counter)
      }
    }, FRAMERATE)

    return () => {
      clearInterval(counter)
    }
  }, [end, totalFrame])

  return count
}

export default useCountUp
