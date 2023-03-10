import { useEffect, useState } from 'react'

const DURATION = 60

function Countdown({ onComplete } : any) {  
  const [timeLeft, setTimeLeft] = useState(DURATION)

  useEffect(() => {
    if (timeLeft === 0) {
      onComplete()
      setTimeLeft(DURATION)
    }

    const interval = setInterval(() => {
      setTimeLeft(timeLeft - 1)
    }, 1000)

    return () => clearInterval(interval)
  }, [timeLeft, onComplete])

  const calculateTimeFraction = () => {
    const rawTimeFraction = timeLeft / DURATION
    return rawTimeFraction - (1 / DURATION) * (1 - rawTimeFraction)
  }

  const dashArray = `${(
    calculateTimeFraction() * 283
  ).toFixed(0)} 283`

  return (
    <div className="countdown w-[45px] h-[45px]">
      <svg className="countdown-svg" viewBox="0 0 100 100">
        <circle
          className="countdown-path-elapsed ease-in-out"
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="text-light dark:text-dark"
          strokeWidth="7"
        />
        <circle
          className="countdown-path-remaining ease-in-out
          duration-300"
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="#F9423A"
          strokeWidth="7"
          strokeDasharray={dashArray}
          strokeLinecap="round"
          transform="rotate(-90 50 50)"
        />
      </svg>
      <div className="countdown-text text-xs text-dark dark:text-light">{timeLeft}</div>
    </div>
  )
}

export default Countdown