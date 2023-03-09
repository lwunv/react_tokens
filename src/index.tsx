import './index.css'

import React from 'react'
import ReactDOM from 'react-dom/client'
import {BrowserRouter} from "react-router-dom"

import { AppContainer } from './pages/app'

const $root = document.getElementById('root') as HTMLElement

$root.className = 'bg-light dark:bg-dark'

ReactDOM.createRoot($root).render(
  <React.StrictMode>
    <BrowserRouter>
      <AppContainer />
    </BrowserRouter>
  </React.StrictMode>
)
