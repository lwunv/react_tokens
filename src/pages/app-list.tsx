import { observer } from 'mobx-react'
import { useEffect } from 'react'

import { useStore } from '../stores'
import { TaskList } from '../components/task-list'

export const AppList = observer(() => {
  const store = useStore()
  
  useEffect(() => {
    store.theme.setPageTitle('')
    document.body.setAttribute('data-mode', store.theme.themeMode)
  }, [store.theme.themeMode])

  return (
    <div className="add-list">
      <TaskList></TaskList>
    </div>
  )
})
