import { observer } from 'mobx-react'
import { useStore } from '../stores'
import { TaskItem } from './task-item'

export const TaskList = observer(() => {
  const store = useStore()

  return (
    <div className="">
      {store.task.tasks.map((task) => (
        <TaskItem key={task.id} task={task}></TaskItem>
      ))}
    </div>
  )
})
