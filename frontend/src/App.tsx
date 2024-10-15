import './index.scss'
import './App.scss'
import 'bootstrap/dist/css/bootstrap.min.css'

import { Outlet } from "react-router-dom"
import Header from "./components/Header"

function App() {
  return (
    <>
      <Header/>
      <Outlet/>
    </>
  )
}

export default App
