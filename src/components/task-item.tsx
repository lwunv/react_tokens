import { useEffect, useRef, useState } from 'react'

import { TokenInterface } from '../interfaces'
import { useStore } from '../stores'
import { BaseText } from './base-text'
import Countdown from './countdown'

interface Props {
  task: TokenInterface
}

const DISAPPEAR_CLASS = 'scale-75 -mb-[calc(48px+12px)] opacity-0 z-0'
const DISAPEAR_DELAY = 120

export const TaskItem = (props: Props) => {
  const store = useStore()

  const [isDone, setIsDone] = useState(props.task.isDone)
  const [isDisappear, setIsDisappear] = useState(true)

  const taskRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLDivElement>(null)

  const handleCountdown = async () => {
    const min = 100000
    const max = 999999
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min
    
    store.task.updatePrice(props.task.id, randomNumber)
  }

  useEffect(() => {
    setTimeout(() => {
      setIsDisappear(false)
    }, DISAPEAR_DELAY)
  }, [])

  return (
    <div
      ref={taskRef}
      className={`
        relative
        ease-in-out
        duration-300
        ${isDisappear ? DISAPPEAR_CLASS : 'z-10'}
      `}
    >
      <div
        className="
            flex
            items-center
            px-5
            h-[79px]
            bg-component
            dark:bg-component-dark
            gap-3
            border-b
        "
      >
        <div className="w-[50px] h-[50px] mr-5 bg-white rounded-full overflow-hidden cursor-pointer border">
          {props.task.logo ? (
            <img src={props.task.logo} alt={props.task.title} />
          ):('')}
        </div>

        <div className="flex-1 truncate">
          <BaseText
            innerref={labelRef}
            className={`
              truncate
              inline
              relative
              after:content-['']
              after:absolute
              after:left-0
              after:h-[2px]
              after:top-[calc(50%+2px)]
              after:bg-primary
              after:ease-in-out
              after:duration-300
              after:transition-width
              ${isDone ? 'after:w-full' : 'after:w-0'}
            `}
          >
            {props.task.title}
          </BaseText>
          <div className={`text-3xl text-dark dark:text-light relative ease-in-out duration-300 ${isDisappear ? DISAPPEAR_CLASS : 'z-10'}`}>
            {parseFloat(props.task.price.toString()).toLocaleString().toString().replaceAll(',',' ')}
          </div>
        </div>

        <Countdown innerref={labelRef} onComplete={handleCountdown} />
      </div>
    </div>
  )
}
