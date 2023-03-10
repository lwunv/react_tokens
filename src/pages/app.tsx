import { observer } from 'mobx-react'
import { useEffect } from 'react'

import { useStore } from '../stores'
import { ThemeToggle } from '../components/theme-toggle'
import {Routes, Route, Link, useLocation } from "react-router-dom"
import {AppList} from "./app-list"
import {AppAdd} from "./app-add"

export const AppContainer = observer(() => {
  const store = useStore()
  const location = useLocation()

  useEffect(() => {
    document.body.setAttribute('data-mode', store.theme.themeMode)
  }, [store.theme.themeMode])

  return (
    <div className="max-w-screen-md mx-auto p-3" id="app">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <ThemeToggle/>
        </div>
        <div className="flex items-center justify-center flex-1">
          <Link to='/' className="block">
            <div className="text-xl text-primary">Tokens</div>
          </Link>
        </div>
        <div className="flex items-center justify-end flex-1">
          {location.pathname === '/add' ? ('') : (<Link to='/add' className={`text-primary text-2xl`}>+</Link>)}
        </div>
      </div>
      <div className="title text-l text-primary mt-3 text-center pb-3">{store.theme.pageTitle}</div>
      <hr />
      <Routes>
        <Route path="/" element={<AppList/>}/>
        <Route path="add" element={<AppAdd/>}/>
      </Routes>
    </div>
  )
})
