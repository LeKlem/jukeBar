import './index.scss'
import './App.scss'
import 'bootstrap/dist/css/bootstrap.min.css'

import { Outlet } from "react-router-dom"
import Header from "./components/header/Header"

function App() {
  return (
    <div className='d-flex flex-column w-100'>
      <Header />
      <div className="px-4">
        <Outlet />
      </div>
    </div>
  )
}

export default App
