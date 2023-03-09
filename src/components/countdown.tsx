import { useEffect, useState } from 'react'

const DURATION = 60

function Countdown({ onComplete } : any) {  
  const [timeLeft, setTimeLeft] = useState(DURATION)

  useEffect(() => {
    if (timeLeft === 0) {
      onComplete()
    }

    const interval = setInterval(() => {
      setTimeLeft((prev) => prev > 0 ? timeLeft - 1 : DURATION)
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

  const circleColor = timeLeft <= DURATION / 2 ? "red" : "green"

  return (
    <div className="countdown">
      <svg className="countdown-svg" viewBox="0 0 100 100">
        <circle
          className="countdown-path-elapsed"
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="#ddd"
          strokeWidth="7"
        />
        <circle
          className="countdown-path-remaining"
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke={circleColor}
          strokeWidth="7"
          strokeDasharray={dashArray}
          strokeLinecap="round"
          transform="rotate(-90 50 50)"
        />
      </svg>
      <div className="countdown-text">{timeLeft}</div>
    </div>
  )
}

export default Countdown