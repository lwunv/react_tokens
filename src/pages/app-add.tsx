import { observer } from 'mobx-react'
import { useEffect } from 'react'

import { useStore } from '../stores'
import { TaskInput } from '../components/task-input'
import { TaskList } from '../components/task-list'

export const AppAdd = observer(() => {
  const store = useStore()

  useEffect(() => {
    store.theme.setPageTitle('Create new token')
    document.body.setAttribute('data-mode', store.theme.themeMode)
  }, [store.theme.themeMode])

  return (
    <div className="add-add">
      <TaskInput/>
    </div>
  )
})
